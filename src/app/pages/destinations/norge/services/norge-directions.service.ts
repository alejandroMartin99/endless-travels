import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

export type TravelMode = 'driving' | 'boat' | 'bus' | 'train' | 'lodging';

export interface DriveLegStats {
  distanceMeters: number;
  durationSeconds: number;
  distanceKm: number;
  durationMin: number;
  mode: TravelMode;
  /** Punto medio del tramo (para etiqueta en mapa). */
  midLngLat?: [number, number];
  /** Geometría del tramo (para resaltar subtrayecto). */
  coordinates?: [number, number][];
}

export interface DriveRouteResult {
  coordinates: [number, number][];
  legs: DriveLegStats[];
  totalDistanceKm: number;
  totalDurationMin: number;
}

export interface ActivityWaypoint {
  id: string;
  longitude: number;
  latitude: number;
  /** Cómo se llega a ESTE punto desde el anterior. */
  arriveBy?: TravelMode;
  /** Polilínea real (p. ej. barco por el fiordo). */
  pathCoordinates?: Array<[number, number]>;
}

@Injectable({ providedIn: 'root' })
export class NorgeDirectionsService {
  /**
   * Ruta en coche por carreteras reales (Mapbox Directions).
   * coords: [lng, lat] en orden.
   */
  async fetchDrivingRoute(coords: Array<[number, number]>): Promise<DriveRouteResult | null> {
    const token = environment.mapboxAccessToken?.trim();
    if (!token || coords.length < 2) {
      return null;
    }

    const allCoords: [number, number][] = [];
    const legs: DriveLegStats[] = [];
    let totalDistanceM = 0;
    let totalDurationS = 0;

    for (let i = 0; i < coords.length - 1; i++) {
      const leg = await this.fetchRoadLeg(coords[i], coords[i + 1], token, 'driving');
      if (!leg) {
        return null;
      }
      this.appendGeom(allCoords, leg.coordinates ?? []);
      legs.push(leg);
      totalDistanceM += leg.distanceMeters;
      totalDurationS += leg.durationSeconds;
    }

    return {
      coordinates: allCoords,
      legs,
      totalDistanceKm: Math.round((totalDistanceM / 1000) * 10) / 10,
      totalDurationMin: Math.round(totalDurationS / 60),
    };
  }

  /**
   * Cadena de actividades respetando boat/bus/train (no fuerza carretera en el fiordo).
   */
  async fetchActivityChain(points: ActivityWaypoint[]): Promise<DriveRouteResult | null> {
    if (points.length < 2) return null;
    const token = environment.mapboxAccessToken?.trim() ?? '';

    const allCoords: [number, number][] = [];
    const legs: DriveLegStats[] = [];
    let totalDistanceM = 0;
    let totalDurationS = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const from: [number, number] = [points[i].longitude, points[i].latitude];
      const to: [number, number] = [points[i + 1].longitude, points[i + 1].latitude];
      const mode: TravelMode = points[i + 1].arriveBy ?? 'driving';

      let leg: DriveLegStats | null = null;
      const customPath = points[i + 1].pathCoordinates;
      if (customPath && customPath.length >= 2) {
        leg = this.makePathLeg(customPath, mode);
      } else if (mode === 'boat' || mode === 'train') {
        leg = this.makeDirectLeg(from, to, mode);
      } else if (token) {
        // coche, bus y llegada a alojamiento usan carretera
        const roadMode: TravelMode = mode === 'bus' ? 'bus' : 'driving';
        leg = await this.fetchRoadLeg(from, to, token, roadMode);
        if (leg && mode === 'lodging') {
          leg = { ...leg, mode: 'lodging' };
        }
      } else {
        leg = this.makeDirectLeg(from, to, mode);
      }

      if (!leg) {
        leg = this.makeDirectLeg(from, to, mode);
      }

      this.appendGeom(allCoords, leg.coordinates ?? []);
      legs.push(leg);
      totalDistanceM += leg.distanceMeters;
      totalDurationS += leg.durationSeconds;
    }

    return {
      coordinates: allCoords,
      legs,
      totalDistanceKm: Math.round((totalDistanceM / 1000) * 10) / 10,
      totalDurationMin: Math.round(totalDurationS / 60),
    };
  }

  private appendGeom(all: [number, number][], geom: [number, number][]): void {
    if (!geom.length) return;
    if (all.length === 0) {
      all.push(...geom);
    } else {
      all.push(...geom.slice(1));
    }
  }

  private makePathLeg(
    path: Array<[number, number]>,
    mode: TravelMode,
  ): DriveLegStats {
    const coordinates = path.map(p => [p[0], p[1]] as [number, number]);
    let meters = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      meters += this.haversineM(coordinates[i], coordinates[i + 1]);
    }
    const speedMps = mode === 'boat' ? 5.5 : mode === 'train' ? 8 : 13;
    const durationSeconds = Math.round(meters / speedMps);
    const mid = coordinates[Math.floor(coordinates.length / 2)] ?? coordinates[0];
    return {
      distanceMeters: meters,
      durationSeconds,
      distanceKm: Math.round((meters / 1000) * 10) / 10,
      durationMin: Math.max(1, Math.round(durationSeconds / 60)),
      mode,
      midLngLat: mid,
      coordinates,
    };
  }

  private makeDirectLeg(
    from: [number, number],
    to: [number, number],
    mode: TravelMode,
  ): DriveLegStats {
    const coordinates = this.interpolate(from, to, 12);
    const meters = this.haversineM(from, to);
    // barco/tren: velocidad estimada
    const speedMps = mode === 'boat' ? 5.5 : mode === 'train' ? 8 : 13;
    const durationSeconds = Math.round(meters / speedMps);
    const mid = coordinates[Math.floor(coordinates.length / 2)] ?? from;
    return {
      distanceMeters: meters,
      durationSeconds,
      distanceKm: Math.round((meters / 1000) * 10) / 10,
      durationMin: Math.max(1, Math.round(durationSeconds / 60)),
      mode,
      midLngLat: mid,
      coordinates,
    };
  }

  private interpolate(
    from: [number, number],
    to: [number, number],
    steps: number,
  ): [number, number][] {
    const out: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      out.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]);
    }
    return out;
  }

  private haversineM(a: [number, number], b: [number, number]): number {
    const R = 6371000;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(b[1] - a[1]);
    const dLon = toRad(b[0] - a[0]);
    const lat1 = toRad(a[1]);
    const lat2 = toRad(b[1]);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  private async fetchRoadLeg(
    from: [number, number],
    to: [number, number],
    token: string,
    mode: TravelMode,
  ): Promise<DriveLegStats | null> {
    const path = `${from[0]},${from[1]};${to[0]},${to[1]}`;
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/${path}` +
      `?geometries=geojson&overview=full&steps=false&access_token=${encodeURIComponent(token)}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn('[norge-directions] HTTP', res.status);
      return null;
    }

    const data = await res.json();
    const route = data?.routes?.[0];
    if (!route?.geometry?.coordinates?.length) {
      return null;
    }

    const coordinates = route.geometry.coordinates as [number, number][];
    const mid = coordinates[Math.floor(coordinates.length / 2)] ?? from;
    const distanceMeters = Number(route.distance) || 0;
    const durationSeconds = Number(route.duration) || 0;
    return {
      distanceMeters,
      durationSeconds,
      distanceKm: Math.round((distanceMeters / 1000) * 10) / 10,
      durationMin: Math.round(durationSeconds / 60),
      mode,
      midLngLat: mid,
      coordinates,
    };
  }

  formatDuration(totalMin: number): string {
    if (totalMin < 60) return `${totalMin} min`;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return m ? `${h} h ${m} min` : `${h} h`;
  }

  modeLabel(mode: TravelMode): string {
    switch (mode) {
      case 'boat':
        return 'En barco';
      case 'bus':
        return 'En bus';
      case 'train':
        return 'En tren';
      case 'lodging':
        return 'Alojamiento';
      default:
        return 'En coche';
    }
  }
}

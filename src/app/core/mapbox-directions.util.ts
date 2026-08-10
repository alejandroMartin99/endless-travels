import { environment } from '../../environments/environment';

export type ItineraryTravelMode =
  | 'driving'
  | 'ruta'
  | 'walking'
  | 'boat'
  | 'bus'
  | 'train'
  | 'metro'
  | 'lodging'
  | 'plane';

export interface ItineraryRouteLeg {
  mode: ItineraryTravelMode;
  coordinates: [number, number][];
}

/** Perfil Mapbox según modo de llegada (default: walking / a pie). */
export function mapboxProfileForMode(mode: ItineraryTravelMode | undefined): 'walking' | 'driving' | null {
  if (mode === 'plane' || mode === 'boat' || mode === 'train') return null;
  if (mode === 'driving' || mode === 'bus' || mode === 'lodging') return 'driving';
  return 'walking';
}

export function normalizeArriveBy(mode?: ItineraryTravelMode): ItineraryTravelMode {
  if (!mode) return 'ruta';
  if (mode === 'walking') return 'ruta';
  return mode;
}

function straightLine(from: [number, number], to: [number, number]): [number, number][] {
  const steps = 8;
  const out: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    out.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]);
  }
  return out;
}

async function fetchLeg(
  from: [number, number],
  to: [number, number],
  profile: 'walking' | 'driving',
  token: string,
): Promise<[number, number][] | null> {
  const path = `${from[0]},${from[1]};${to[0]},${to[1]}`;
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${path}` +
    `?geometries=geojson&overview=full&steps=false&access_token=${encodeURIComponent(token)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const coords = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;
    return coords?.length ? coords : null;
  } catch {
    return null;
  }
}

/**
 * Rutas consecutivas entre waypoints. Fallback a recta si falla Directions.
 */
export async function fetchItineraryLegs(
  points: Array<{ longitude: number; latitude: number; arriveBy?: ItineraryTravelMode }>,
): Promise<ItineraryRouteLeg[]> {
  if (points.length < 2) return [];
  const token = environment.mapboxAccessToken?.trim() ?? '';
  const legs: ItineraryRouteLeg[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const from: [number, number] = [points[i].longitude, points[i].latitude];
    const to: [number, number] = [points[i + 1].longitude, points[i + 1].latitude];
    const mode = normalizeArriveBy(points[i + 1].arriveBy);
    const profile = mapboxProfileForMode(mode);

    let coordinates: [number, number][] | null = null;
    if (token && profile) {
      coordinates = await fetchLeg(from, to, profile, token);
      if (!coordinates && profile === 'walking') {
        coordinates = await fetchLeg(from, to, 'driving', token);
      }
    }
    legs.push({
      mode,
      coordinates: coordinates?.length ? coordinates : straightLine(from, to),
    });
  }

  return legs;
}

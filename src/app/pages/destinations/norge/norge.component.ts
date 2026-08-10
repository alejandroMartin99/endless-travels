import { Component, OnInit, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { norgeRoute, NorgeStopLegView } from './data/norge-route';
import { norgeDirectionsCache } from './data/norge-directions-cache';
import { NorgeDrawerTab, NorgeDayBreakdown } from './components/norge-drawer.component';
import { NorgeMapComponent } from './components/norge-map.component';
import { NorgeMapDayPoint, NorgeMapLegLabel } from './components/norge-map.types';
import { NorgeDirectionsService, DriveLegStats } from './services/norge-directions.service';

@Component({
  selector: 'app-norge',
  templateUrl: './norge.component.html',
  styleUrl: './norge.component.css',
})
export class NorgeComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly directions = inject(NorgeDirectionsService);

  readonly route = norgeRoute;
  selectedStopId: string | null = norgeRoute.stops[0]?.id ?? null;
  selectedActivityIndex = 0;
  drawerTab: NorgeDrawerTab = 'ruta';
  drawerCollapsed = false;

  routeCoordinates: Array<[number, number]> = [];
  stopLegs: NorgeStopLegView[] = [];
  totalDistanceKm: number | null = null;
  totalDurationLabel = '';
  routeLoading = false;
  routeError = false;

  activityLegs: DriveLegStats[] = [];
  activityLegByFromId: Record<string, DriveLegStats> = {};
  activityLegsLoading = false;
  dayRouteCoordinates: Array<[number, number]> = [];
  dayRouteLegs: Array<{ mode: string; coordinates: Array<[number, number]> }> = [];
  tripRouteLegs: Array<{
    stopId: string;
    mode: string;
    coordinates: Array<[number, number]>;
    active: boolean;
  }> = [];
  private dayCache: Record<
    string,
    { legs: DriveLegStats[]; coordinates: Array<[number, number]>; points: NorgeMapDayPoint[] }
  > = {};
  dayPoints: NorgeMapDayPoint[] = [];
  tripDayPoints: NorgeMapDayPoint[] = [];
  dayLegLabels: NorgeMapLegLabel[] = [];
  dayBreakdowns: NorgeDayBreakdown[] = [];
  activeSegmentCoordinates: Array<[number, number]> = [];
  activeSegmentMode: string = 'driving';
  private pendingActivityIndex: number | null = null;

  @ViewChild(NorgeMapComponent) mapComp?: NorgeMapComponent;

  readonly formatDur = (min: number) => this.directions.formatDuration(min);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      this.hydrateFromStaticCache();
    }
  }

  /** Usa rutas precalculadas (sin llamadas a Mapbox en runtime). */
  private hydrateFromStaticCache(): void {
    const cache = norgeDirectionsCache;
    this.routeLoading = false;
    this.routeError = false;
    this.activityLegsLoading = false;

    this.routeCoordinates = cache.main.coordinates ?? [];
    this.totalDistanceKm = cache.main.totalDistanceKm ?? null;
    this.totalDurationLabel = this.directions.formatDuration(cache.main.totalDurationMin ?? 0);
    this.stopLegs = cache.main.stopLegs ?? [];

    for (const stop of this.route.stops) {
      const day = cache.days[stop.id];
      if (!day) {
        const dayNum = this.route.stops.findIndex(s => s.id === stop.id) + 1;
        const points = stop.activities
          .filter(a => a.longitude != null && a.latitude != null)
          .map((a, i) => ({
            letter: `${dayNum}.${i + 1}`,
            name: a.name,
            longitude: a.longitude!,
            latitude: a.latitude!,
            arriveBy: a.arriveBy,
          }));
        this.dayCache[stop.id] = { legs: [], coordinates: [], points };
        continue;
      }
      this.dayCache[stop.id] = {
        legs: day.legs ?? [],
        coordinates: day.coordinates ?? [],
        points: day.points ?? [],
      };
    }

    this.rebuildTripRouteLegs();
    this.buildDayBreakdowns();
    this.applySelectedDayFromCache();
    setTimeout(() => this.mapComp?.resize(), 80);
  }

  private buildDayBreakdowns(): void {
    const modeLabel: Record<string, string> = {
      driving: 'Coche',
      boat: 'Barco',
      bus: 'Bus',
      train: 'Tren',
      ruta: 'A pie',
      walking: 'A pie',
    };
    const order = ['driving', 'boat', 'bus', 'train', 'ruta', 'walking'];

    this.dayBreakdowns = this.route.stops.map((stop, i) => {
      const legs = this.dayCache[stop.id]?.legs ?? [];
      const agg = new Map<string, { km: number; min: number }>();
      let totalKm = 0;
      let totalMin = 0;
      for (const leg of legs) {
        const mode = leg.mode === 'lodging' ? 'driving' : leg.mode || 'driving';
        const cur = agg.get(mode) ?? { km: 0, min: 0 };
        cur.km += leg.distanceKm || 0;
        cur.min += leg.durationMin || 0;
        agg.set(mode, cur);
        totalKm += leg.distanceKm || 0;
        totalMin += leg.durationMin || 0;
      }
      const modes = order
        .filter(m => agg.has(m))
        .map(m => ({
          mode: m,
          label: modeLabel[m] ?? m,
          km: Math.round((agg.get(m)!.km) * 10) / 10,
          min: Math.round(agg.get(m)!.min),
        }));
      return {
        stopId: stop.id,
        index: i + 1,
        dayLabel: stop.dayLabel,
        name: stop.name,
        modes,
        totalKm: Math.round(totalKm * 10) / 10,
        totalMin: Math.round(totalMin),
      };
    });
  }

  onStopSelected(id: string): void {
    this.selectedStopId = id;
    this.selectedActivityIndex = this.pendingActivityIndex ?? 0;
    this.pendingActivityIndex = null;
    this.drawerTab = 'ruta';
    if (this.drawerCollapsed) {
      this.drawerCollapsed = false;
      setTimeout(() => this.mapComp?.resize(), 280);
    }
    this.applySelectedDayFromCache();
    this.refreshTripActiveFlags();
  }

  /** Clic en marcador de otro día: cambia día + actividad. */
  onTripPointSelected(ev: { stopId: string; activityIndex: number }): void {
    if (ev.stopId !== this.selectedStopId) {
      this.pendingActivityIndex = ev.activityIndex;
      this.onStopSelected(ev.stopId);
      return;
    }
    this.onActivityIndexChange(ev.activityIndex);
  }

  onActivityIndexChange(index: number): void {
    this.selectedActivityIndex = index;
    this.updateActiveSegment();
  }

  /** index 0 = salida (resumen+primera actividad); a partir de 1, tramos con leg. */
  private updateActiveSegment(): void {
    const realIdx = this.selectedActivityIndex;
    if (realIdx <= 0) {
      this.activeSegmentCoordinates = [];
      this.activeSegmentMode = 'driving';
      return;
    }
    const leg = this.activityLegs[realIdx - 1];
    this.activeSegmentCoordinates = leg?.coordinates?.length ? [...leg.coordinates] : [];
    this.activeSegmentMode = leg?.mode ?? 'driving';
  }

  onTabChange(tab: NorgeDrawerTab): void {
    this.drawerTab = tab;
  }

  onCollapsedChange(collapsed: boolean): void {
    this.drawerCollapsed = collapsed;
    setTimeout(() => this.mapComp?.resize(), 280);
  }

  private rebuildTripRouteLegs(): void {
    const legs: typeof this.tripRouteLegs = [];
    const points: NorgeMapDayPoint[] = [];
    for (const stop of this.route.stops) {
      const cached = this.dayCache[stop.id];
      if (!cached) continue;
      const active = stop.id === this.selectedStopId;
      for (const leg of cached.legs) {
        if ((leg.coordinates?.length ?? 0) < 2) continue;
        legs.push({
          stopId: stop.id,
          mode: leg.mode,
          coordinates: leg.coordinates!,
          active,
        });
      }
      cached.points.forEach((p, i) => {
        points.push({
          ...p,
          stopId: stop.id,
          active,
          pointIndex: i,
        });
      });
    }
    this.tripRouteLegs = legs;
    this.tripDayPoints = points;
  }

  private refreshTripActiveFlags(): void {
    this.tripRouteLegs = this.tripRouteLegs.map(leg => ({
      ...leg,
      active: leg.stopId === this.selectedStopId,
    }));
    this.tripDayPoints = this.tripDayPoints.map(p => ({
      ...p,
      active: p.stopId === this.selectedStopId,
    }));
  }

  private applySelectedDayFromCache(): void {
    this.activityLegs = [];
    this.activityLegByFromId = {};
    this.dayRouteCoordinates = [];
    this.dayRouteLegs = [];
    this.dayPoints = [];
    this.dayLegLabels = [];
    this.activeSegmentCoordinates = [];
    this.activeSegmentMode = 'driving';

    const stop = this.route.stops.find(s => s.id === this.selectedStopId);
    if (!stop) return;

    const cached = this.dayCache[stop.id];
    if (!cached) {
      const dayNum = this.route.stops.findIndex(s => s.id === stop.id) + 1;
      this.dayPoints = stop.activities
        .filter(a => a.longitude != null && a.latitude != null)
        .map((a, i) => ({
          letter: `${dayNum}.${i + 1}`,
          name: a.name,
          longitude: a.longitude!,
          latitude: a.latitude!,
          arriveBy: a.arriveBy,
        }));
      return;
    }

    this.dayPoints = cached.points;
    this.activityLegs = cached.legs;
    this.dayRouteCoordinates = cached.coordinates;
    this.dayRouteLegs = cached.legs
      .filter(l => (l.coordinates?.length ?? 0) >= 2)
      .map(l => ({ mode: l.mode, coordinates: l.coordinates! }));

    const withCoords = stop.activities.filter(
      a => a.longitude != null && a.latitude != null,
    );
    const byId: Record<string, DriveLegStats> = {};
    this.activityLegs.forEach((leg, i) => {
      byId[withCoords[i].id] = leg;
    });
    this.activityLegByFromId = byId;
    this.updateActiveSegment();
  }
}

import { Component, OnInit, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { norgeRoute, NorgeStopLegView } from './data/norge-route';
import { NorgeDrawerTab } from './components/norge-drawer.component';
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
  /** Tramos del día con modo (coche/barco/bus/tren) para pintar distinto. */
  dayRouteLegs: Array<{ mode: string; coordinates: Array<[number, number]> }> = [];
  dayPoints: NorgeMapDayPoint[] = [];
  dayLegLabels: NorgeMapLegLabel[] = [];
  activeSegmentCoordinates: Array<[number, number]> = [];
  activeSegmentMode: string = 'driving';

  @ViewChild(NorgeMapComponent) mapComp?: NorgeMapComponent;

  readonly formatDur = (min: number) => this.directions.formatDuration(min);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      void this.loadMainDrivingRoute();
      void this.loadActivityLegsForSelected();
    }
  }

  onStopSelected(id: string): void {
    this.selectedStopId = id;
    this.selectedActivityIndex = 0;
    this.drawerTab = 'ruta';
    if (this.drawerCollapsed) {
      this.drawerCollapsed = false;
      setTimeout(() => this.mapComp?.resize(), 280);
    }
    void this.loadActivityLegsForSelected();
  }

  onActivityIndexChange(index: number): void {
    this.selectedActivityIndex = index;
    this.updateActiveSegment();
  }

  /** index 0 = Resumen; a partir de 1 son actividades reales. */
  private updateActiveSegment(): void {
    const realIdx = this.selectedActivityIndex - 1;
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

  private async loadMainDrivingRoute(): Promise<void> {
    const coords = this.route.stops.map(
      s => [s.longitude, s.latitude] as [number, number],
    );
    this.routeLoading = true;
    this.routeError = false;
    try {
      const result = await this.directions.fetchDrivingRoute(coords);
      if (!result) {
        this.routeError = true;
        return;
      }
      this.routeCoordinates = result.coordinates;
      this.totalDistanceKm = result.totalDistanceKm;
      this.totalDurationLabel = this.directions.formatDuration(result.totalDurationMin);
      this.stopLegs = result.legs.map((leg, i) => ({
        fromStopId: this.route.stops[i].id,
        toStopId: this.route.stops[i + 1].id,
        fromName: this.route.stops[i].name,
        toName: this.route.stops[i + 1].name,
        distanceKm: leg.distanceKm,
        durationMin: leg.durationMin,
        durationLabel: this.directions.formatDuration(leg.durationMin),
      }));
      setTimeout(() => this.mapComp?.resize(), 100);
    } catch {
      this.routeError = true;
    } finally {
      this.routeLoading = false;
    }
  }

  private async loadActivityLegsForSelected(): Promise<void> {
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

    const withCoords = stop.activities.filter(
      a => a.longitude != null && a.latitude != null,
    );

    this.dayPoints = withCoords.map((a, i) => ({
      letter: String(i + 1),
      name: a.name,
      longitude: a.longitude!,
      latitude: a.latitude!,
      arriveBy: a.arriveBy,
    }));

    if (withCoords.length < 2) return;

    this.activityLegsLoading = true;
    try {
      const result = await this.directions.fetchActivityChain(
        withCoords.map(a => ({
          id: a.id,
          longitude: a.longitude!,
          latitude: a.latitude!,
          arriveBy: a.arriveBy,
          pathCoordinates: a.pathCoordinates,
        })),
      );
      this.activityLegs = result?.legs ?? [];
      this.dayRouteCoordinates = result?.coordinates ?? [];
      this.dayRouteLegs = this.activityLegs
        .filter(l => (l.coordinates?.length ?? 0) >= 2)
        .map(l => ({ mode: l.mode, coordinates: l.coordinates! }));
      const byId: Record<string, DriveLegStats> = {};
      this.activityLegs.forEach((leg, i) => {
        byId[withCoords[i].id] = leg;
      });
      this.activityLegByFromId = byId;
      this.updateActiveSegment();
      setTimeout(() => this.mapComp?.resize(), 80);
    } catch {
      this.activityLegs = [];
      this.activityLegByFromId = {};
      this.dayRouteCoordinates = [];
      this.dayRouteLegs = [];
      this.dayLegLabels = [];
      this.activeSegmentCoordinates = [];
    } finally {
      this.activityLegsLoading = false;
    }
  }
}

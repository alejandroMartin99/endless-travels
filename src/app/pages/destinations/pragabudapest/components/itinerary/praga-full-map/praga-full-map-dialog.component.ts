import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import mapboxgl from 'mapbox-gl';
import { applyMapboxPublicToken } from '../../../../../../core/mapbox-token.util';
import {
  fetchItineraryLegs,
  ItineraryRouteLeg,
  ItineraryTravelMode,
  normalizeArriveBy,
} from '../../../../../../core/mapbox-directions.util';
import {
  PRAGA_FULL_MAP_DAYS,
  PragaFullMapDay,
} from './praga-full-map-days';

export type PragaMapRegion = 'praga' | 'bratislava' | 'budapest';

@Component({
  selector: 'app-praga-full-map-dialog',
  templateUrl: './praga-full-map-dialog.component.html',
  styleUrls: ['./praga-full-map-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PragaFullMapDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef<HTMLDivElement>;

  readonly days = PRAGA_FULL_MAP_DAYS;
  selectedDayNumber = this.days[0]?.dayNumber ?? 1;
  focusedActivityIndex = 0;

  private readonly dialogRef = inject(MatDialogRef<PragaFullMapDialogComponent>);
  private readonly cdr = inject(ChangeDetectorRef);
  private map?: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private routeCache = new Map<number, ItineraryRouteLeg[]>();
  private zoneBoundsCache = new Map<string, mapboxgl.LngLatBounds>();
  private static readonly ROUTE_SOURCE = 'praga-full-route';
  private static readonly PRAGA_CITY_DAYS = [2, 3];
  private static readonly BUDAPEST_CITY_DAYS = [5, 6, 7, 9];

  get selectedDay(): PragaFullMapDay | undefined {
    return this.days.find(d => d.dayNumber === this.selectedDayNumber);
  }

  markerCode(dayNumber: number, activityIndex: number): string {
    return `${dayNumber}.${String(activityIndex + 1).padStart(2, '0')}`;
  }

  regionForDay(dayNumber: number): PragaMapRegion {
    if (dayNumber <= 3) return 'praga';
    if (dayNumber === 4) return 'bratislava';
    return 'budapest';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 80);
  }

  ngOnDestroy(): void {
    this.markers.forEach(m => m.remove());
    this.map?.remove();
  }

  close(): void {
    this.dialogRef.close();
  }

  selectDay(dayNumber: number): void {
    if (this.selectedDayNumber === dayNumber) {
      this.focusActivity(this.focusedActivityIndex);
      return;
    }
    this.selectedDayNumber = dayNumber;
    this.focusedActivityIndex = 0;
    void this.refreshOverlay();
  }

  focusActivity(index: number): void {
    const day = this.selectedDay;
    if (!day || index < 0 || index >= day.activities.length) return;
    this.focusedActivityIndex = index;
    const activity = day.activities[index];
    this.map?.easeTo({
      center: [activity.longitude, activity.latitude],
      duration: 450,
    });
    this.renderMarkers();
    this.cdr.markForCheck();
  }

  private initMap(): void {
    if (!applyMapboxPublicToken() || !this.mapEl?.nativeElement) return;

    const first = this.selectedDay?.activities.find(a => a.longitude > 0)
      ?? this.selectedDay?.activities[0];
    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: first ? [first.longitude, first.latitude] : [14.42, 50.08],
      zoom: 6,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    this.map.on('load', () => {
      this.ensureRouteLayer();
      void this.refreshOverlay();
      requestAnimationFrame(() => this.map?.resize());
    });
  }

  private async refreshOverlay(): Promise<void> {
    if (!this.map) return;
    this.renderMarkers();
    await this.renderAllRoutes();
    this.fitZoneForSelectedDay();
  }

  private renderMarkers(): void {
    if (!this.map) return;
    this.markers.forEach(m => m.remove());
    this.markers = [];

    for (const day of this.days) {
      const active = day.dayNumber === this.selectedDayNumber;
      const region = this.regionForDay(day.dayNumber);
      day.activities.forEach((activity, index) => {
        const mode = normalizeArriveBy(activity.arriveBy);
        const code = this.markerCode(day.dayNumber, index);
        const el = document.createElement('div');
        el.className = [
          'praga-full-marker',
          `region-${region}`,
          active ? 'is-active' : 'is-dimmed',
          active && index === this.focusedActivityIndex ? 'is-focus' : '',
          `mode-${mode}`,
        ]
          .filter(Boolean)
          .join(' ');
        el.innerHTML = `<span class="praga-full-marker-code">${code}</span>`;
        el.title = `${code} · ${activity.name}`;

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([activity.longitude, activity.latitude])
          .addTo(this.map!);

        this.markers.push(marker);
      });
    }
  }

  private ensureRouteLayer(): void {
    if (!this.map || this.map.getSource(PragaFullMapDialogComponent.ROUTE_SOURCE)) return;
    this.map.addSource(PragaFullMapDialogComponent.ROUTE_SOURCE, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
    this.map.addLayer({
      id: 'praga-full-route-casing',
      type: 'line',
      source: PragaFullMapDialogComponent.ROUTE_SOURCE,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': [
          'case',
          ['to-boolean', ['get', 'active']],
          '#ffffff',
          '#ECEFF1',
        ],
        'line-width': ['case', ['to-boolean', ['get', 'active']], 7, 5],
        'line-opacity': ['case', ['to-boolean', ['get', 'active']], 0.9, 0.55],
      },
    });
    this.map.addLayer({
      id: 'praga-full-route-line',
      type: 'line',
      source: PragaFullMapDialogComponent.ROUTE_SOURCE,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': [
          'case',
          ['to-boolean', ['get', 'active']],
          [
            'match',
            ['get', 'region'],
            'budapest',
            '#C62828',
            'bratislava',
            '#F9A825',
            '#6A1B9A',
          ],
          [
            'match',
            ['get', 'region'],
            'budapest',
            '#EF9A9A',
            'bratislava',
            '#FFE082',
            '#CE93D8',
          ],
        ],
        'line-width': ['case', ['to-boolean', ['get', 'active']], 4.5, 2.5],
        'line-opacity': ['case', ['to-boolean', ['get', 'active']], 0.95, 0.55],
      },
    });
  }

  private async renderAllRoutes(): Promise<void> {
    if (!this.map) return;
    const source = this.map.getSource(PragaFullMapDialogComponent.ROUTE_SOURCE) as
      | mapboxgl.GeoJSONSource
      | undefined;
    if (!source) return;

    await Promise.all(
      this.days.map(async day => {
        if (this.routeCache.has(day.dayNumber)) return;
        const legs = await fetchItineraryLegs(day.activities);
        this.routeCache.set(day.dayNumber, legs);
      }),
    );

    const features: GeoJSON.Feature[] = [];
    for (const day of this.days) {
      const legs = this.routeCache.get(day.dayNumber) ?? [];
      const active = day.dayNumber === this.selectedDayNumber;
      const region = this.regionForDay(day.dayNumber);
      for (const leg of legs) {
        features.push({
          type: 'Feature',
          properties: {
            mode: leg.mode as ItineraryTravelMode,
            active,
            region,
            dayNumber: day.dayNumber,
          },
          geometry: { type: 'LineString', coordinates: leg.coordinates },
        });
      }
    }

    features.sort((a, b) => {
      const aa = a.properties?.['active'] ? 1 : 0;
      const ba = b.properties?.['active'] ? 1 : 0;
      return aa - ba;
    });

    source.setData({ type: 'FeatureCollection', features });
  }

  private fitZoneForSelectedDay(): void {
    if (!this.map) return;
    const n = this.selectedDayNumber;
    const { PRAGA_CITY_DAYS, BUDAPEST_CITY_DAYS } = PragaFullMapDialogComponent;

    if (PRAGA_CITY_DAYS.includes(n)) {
      this.fitDayNumbers(PRAGA_CITY_DAYS, 'praga-city', 12.2);
      return;
    }
    if (BUDAPEST_CITY_DAYS.includes(n)) {
      this.fitDayNumbers(BUDAPEST_CITY_DAYS, 'budapest-city', 12);
      return;
    }
    // Día 1 (Kutná) o Día 4 (Bratislava): zoom más ajustado
    this.fitDayNumbers([n], `day-${n}`, 13.5, 56);
  }

  private fitDayNumbers(
    dayNumbers: number[],
    cacheKey: string,
    maxZoom: number,
    padding = 80,
  ): void {
    if (!this.map) return;
    let bounds = this.zoneBoundsCache.get(cacheKey);
    if (!bounds) {
      bounds = new mapboxgl.LngLatBounds();
      let hasPoint = false;
      for (const day of this.days) {
        if (!dayNumbers.includes(day.dayNumber)) continue;
        for (const a of day.activities) {
          // Evitar que Madrid rompa el zoom
          if (a.longitude < 5) continue;
          bounds.extend([a.longitude, a.latitude]);
          hasPoint = true;
        }
      }
      if (!hasPoint) return;
      this.zoneBoundsCache.set(cacheKey, bounds);
    }
    this.map.fitBounds(bounds, { padding, maxZoom, duration: 650 });
  }
}

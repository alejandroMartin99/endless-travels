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
  JAPAN_FULL_MAP_DAYS,
  JapanFullMapDay,
} from './japan-full-map-days';

@Component({
  selector: 'app-japan-full-map-dialog',
  templateUrl: './japan-full-map-dialog.component.html',
  styleUrls: ['./japan-full-map-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class JapanFullMapDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef<HTMLDivElement>;

  readonly days = JAPAN_FULL_MAP_DAYS;
  selectedDayNumber = this.days[0]?.dayNumber ?? 2;
  focusedActivityIndex = 0;

  private readonly dialogRef = inject(MatDialogRef<JapanFullMapDialogComponent>);
  private readonly cdr = inject(ChangeDetectorRef);
  private map?: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private popup?: mapboxgl.Popup;
  private routeCache = new Map<number, ItineraryRouteLeg[]>();
  private zoneBoundsCache = new Map<string, mapboxgl.LngLatBounds>();
  private static readonly ROUTE_SOURCE = 'japan-full-route';
  /** Kyoto ciudad (sin Osaka/Nara/Hiroshima). */
  private static readonly KYOTO_CITY_DAYS = [2, 3, 4, 5];
  /** Tokyo ciudad (sin Nikko/Kamakura). */
  private static readonly TOKYO_CITY_DAYS = [9, 12, 13, 14, 15];
  private static readonly KYOTO_EXCURSION_DAYS = [6, 7, 8];
  private static readonly TOKYO_EXCURSION_DAYS = [10, 11];

  get selectedDay(): JapanFullMapDay | undefined {
    return this.days.find(d => d.dayNumber === this.selectedDayNumber);
  }

  markerCode(dayNumber: number, activityIndex: number): string {
    return `${dayNumber}.${String(activityIndex + 1).padStart(2, '0')}`;
  }

  regionForDay(dayNumber: number): 'kyoto' | 'tokyo' {
    return dayNumber <= 8 ? 'kyoto' : 'tokyo';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 80);
  }

  ngOnDestroy(): void {
    this.popup?.remove();
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
    // Solo pan suave, sin subir zoom (zoom de zona fijo).
    this.map?.easeTo({
      center: [activity.longitude, activity.latitude],
      duration: 450,
    });
    this.renderMarkers();
    this.cdr.markForCheck();
  }

  private initMap(): void {
    if (!applyMapboxPublicToken() || !this.mapEl?.nativeElement) return;

    const first = this.selectedDay?.activities[0];
    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: first ? [first.longitude, first.latitude] : [135.76, 35.01],
      zoom: 5,
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
    this.popup?.remove();
    this.popup = undefined;
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
          'japan-full-marker',
          `region-${region}`,
          active ? 'is-active' : 'is-dimmed',
          active && index === this.focusedActivityIndex ? 'is-focus' : '',
          `mode-${mode}`,
        ]
          .filter(Boolean)
          .join(' ');
        el.innerHTML = `<span class="japan-full-marker-code">${code}</span>`;
        el.title = `${code} · ${activity.name}`;

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([activity.longitude, activity.latitude])
          .addTo(this.map!);

        this.markers.push(marker);
      });
    }
  }

  private ensureRouteLayer(): void {
    if (!this.map || this.map.getSource(JapanFullMapDialogComponent.ROUTE_SOURCE)) return;
    this.map.addSource(JapanFullMapDialogComponent.ROUTE_SOURCE, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
    this.map.addLayer({
      id: 'japan-full-route-casing',
      type: 'line',
      source: JapanFullMapDialogComponent.ROUTE_SOURCE,
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
      id: 'japan-full-route-line',
      type: 'line',
      source: JapanFullMapDialogComponent.ROUTE_SOURCE,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': [
          'case',
          ['to-boolean', ['get', 'active']],
          [
            'match',
            ['get', 'region'],
            'tokyo',
            '#0D47A1',
            '#1B5E20',
          ],
          [
            'match',
            ['get', 'region'],
            'tokyo',
            '#90CAF9',
            '#A5D6A7',
          ],
        ],
        'line-width': ['case', ['to-boolean', ['get', 'active']], 4.5, 2.5],
        'line-opacity': ['case', ['to-boolean', ['get', 'active']], 0.95, 0.55],
      },
    });
  }

  private async renderAllRoutes(): Promise<void> {
    if (!this.map) return;
    const source = this.map.getSource(JapanFullMapDialogComponent.ROUTE_SOURCE) as
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

    // Día activo encima
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
    const { KYOTO_CITY_DAYS, TOKYO_CITY_DAYS, KYOTO_EXCURSION_DAYS, TOKYO_EXCURSION_DAYS } =
      JapanFullMapDialogComponent;

    if (KYOTO_CITY_DAYS.includes(n)) {
      this.fitDayNumbers(KYOTO_CITY_DAYS, 'kyoto-city', 11.5);
      return;
    }
    if (TOKYO_CITY_DAYS.includes(n)) {
      this.fitDayNumbers(TOKYO_CITY_DAYS, 'tokyo-city', 11.2);
      return;
    }
    if (KYOTO_EXCURSION_DAYS.includes(n) || TOKYO_EXCURSION_DAYS.includes(n)) {
      // Excursión: encuadre del día, sin zoom agresivo
      this.fitDayNumbers([n], `day-${n}`, 10.5);
    }
  }

  private fitDayNumbers(dayNumbers: number[], cacheKey: string, maxZoom: number): void {
    if (!this.map) return;
    let bounds = this.zoneBoundsCache.get(cacheKey);
    if (!bounds) {
      bounds = new mapboxgl.LngLatBounds();
      let hasPoint = false;
      for (const day of this.days) {
        if (!dayNumbers.includes(day.dayNumber)) continue;
        for (const a of day.activities) {
          // Evitar que Haneda/Madrid rompan el zoom de Kyoto ciudad
          if (cacheKey === 'kyoto-city' && a.longitude > 137) continue;
          if (cacheKey === 'tokyo-city' && a.longitude < 138.5) continue;
          bounds.extend([a.longitude, a.latitude]);
          hasPoint = true;
        }
      }
      if (!hasPoint) return;
      this.zoneBoundsCache.set(cacheKey, bounds);
    }
    this.map.fitBounds(bounds, { padding: 80, maxZoom, duration: 650 });
  }
}

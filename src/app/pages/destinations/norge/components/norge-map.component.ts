import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { applyMapboxPublicToken } from '../../../../core/mapbox-token.util';
import { NorgeStop } from '../data/norge-route';
import { NorgeMapDayPoint, NorgeMapLegLabel } from './norge-map.types';

@Component({
  selector: 'norge-map',
  templateUrl: './norge-map.component.html',
  styleUrls: ['./norge-map.component.css'],
})
export class NorgeMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() stops: NorgeStop[] = [];
  @Input() selectedStopId: string | null = null;
  @Input() routeCoordinates: Array<[number, number]> = [];
  /** @deprecated Prefer tripRouteLegs — se mantiene como fallback. */
  @Input() dayRouteCoordinates: Array<[number, number]> = [];
  @Input() dayRouteLegs: Array<{ mode: string; coordinates: Array<[number, number]> }> = [];
  /** Toda la ruta del viaje; `active` = día seleccionado. */
  @Input() tripRouteLegs: Array<{
    stopId: string;
    mode: string;
    coordinates: Array<[number, number]>;
    active: boolean;
  }> = [];
  @Input() dayPoints: NorgeMapDayPoint[] = [];
  /** Marcadores de todos los días (gris + activo). */
  @Input() tripDayPoints: NorgeMapDayPoint[] = [];
  @Input() dayLegLabels: NorgeMapLegLabel[] = [];
  @Input() activeSegmentCoordinates: Array<[number, number]> = [];
  @Input() activeSegmentMode = 'driving';
  @Input() selectedActivityIndex = 0;
  @Output() stopSelected = new EventEmitter<string>();
  /** Índice display (0=Resumen, 1+=actividad real). */
  @Output() dayActivitySelected = new EventEmitter<number>();
  @Output() tripPointSelected = new EventEmitter<{ stopId: string; activityIndex: number }>();

  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private map?: mapboxgl.Map;
  private stopMarkers: mapboxgl.Marker[] = [];
  private dayMarkers: mapboxgl.Marker[] = [];
  private legLabelMarkers: mapboxgl.Marker[] = [];
  private ready = false;
  private didFitTrip = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ready || !this.map) return;
    if (changes['stops'] && !changes['stops'].firstChange) {
      this.renderStopMarkers();
    }
    if (
      changes['routeCoordinates'] ||
      changes['dayRouteCoordinates'] ||
      changes['dayRouteLegs'] ||
      changes['tripRouteLegs'] ||
      changes['activeSegmentCoordinates'] ||
      changes['activeSegmentMode'] ||
      changes['selectedStopId']
    ) {
      this.updateRouteLine();
    }
    if (
      changes['dayPoints'] ||
      changes['tripDayPoints'] ||
      changes['selectedStopId'] ||
      changes['selectedActivityIndex']
    ) {
      this.renderDayOverlay();
    }
    if (changes['selectedStopId']) {
      this.refreshStopMarkerColors();
    }
    // Zoom estable: solo encuadre completo la primera vez que hay ruta de viaje
    if (changes['tripRouteLegs'] && this.tripRouteLegs.length > 0 && !this.didFitTrip) {
      this.didFitTrip = true;
      this.fitTrip();
    }
  }

  ngOnDestroy(): void {
    this.clearDayOverlay();
    this.stopMarkers.forEach(m => m.remove());
    this.map?.remove();
  }

  private initMap(): void {
    if (!applyMapboxPublicToken() || !this.mapEl?.nativeElement) return;

    const center: [number, number] = this.stops[0]
      ? [this.stops[0].longitude, this.stops[0].latitude]
      : [10.5, 64.5];

    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom: 5,
      pitch: 0,
      bearing: 0,
      antialias: true,
    });

    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    this.map.on('load', () => {
      this.ready = true;
      this.ensureRouteLayer();
      this.updateRouteLine();
      this.renderStopMarkers();
      this.renderDayOverlay();
      if (this.tripRouteLegs.length > 0) {
        this.didFitTrip = true;
        this.fitTrip();
      } else {
        this.fitAll();
      }
      try {
        this.map?.resize();
      } catch {
        /* noop */
      }
    });
  }

  private ensureRouteLayer(): void {
    if (!this.map) return;

    const activeColor = [
      'case',
      ['!', ['to-boolean', ['get', 'active']]],
      '#9E9E9E',
      [
        'match',
        ['get', 'mode'],
        'boat',
        '#00838F',
        'train',
        '#6A1B9A',
        'bus',
        '#EF6C00',
        'lodging',
        '#2E7D32',
        '#4285F4',
      ],
    ];

    if (!this.map.getSource('norge-route')) {
      this.map.addSource('norge-route', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      // Casing (blanco / gris claro)
      this.map.addLayer({
        id: 'norge-route-casing',
        type: 'line',
        source: 'norge-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': [
            'case',
            ['to-boolean', ['get', 'active']],
            '#ffffff',
            '#E0E0E0',
          ],
          'line-width': ['case', ['to-boolean', ['get', 'active']], 8, 6],
          'line-opacity': 0.95,
        },
      });
      // Carretera / bus / lodging (sólido)
      this.map.addLayer({
        id: 'norge-route-road',
        type: 'line',
        source: 'norge-route',
        filter: ['in', ['get', 'mode'], ['literal', ['driving', 'bus', 'lodging']]],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': activeColor as never,
          'line-width': ['case', ['to-boolean', ['get', 'active']], 5, 3.5],
          'line-opacity': ['case', ['to-boolean', ['get', 'active']], 1, 0.75],
        },
      });
      // Barco (discontinuo)
      this.map.addLayer({
        id: 'norge-route-boat',
        type: 'line',
        source: 'norge-route',
        filter: ['==', ['get', 'mode'], 'boat'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': activeColor as never,
          'line-width': ['case', ['to-boolean', ['get', 'active']], 4, 3],
          'line-dasharray': [1.5, 1.2],
          'line-opacity': ['case', ['to-boolean', ['get', 'active']], 1, 0.75],
        },
      });
      // Tren (discontinuo)
      this.map.addLayer({
        id: 'norge-route-train',
        type: 'line',
        source: 'norge-route',
        filter: ['==', ['get', 'mode'], 'train'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': activeColor as never,
          'line-width': ['case', ['to-boolean', ['get', 'active']], 4, 3],
          'line-dasharray': [2, 1],
          'line-opacity': ['case', ['to-boolean', ['get', 'active']], 1, 0.75],
        },
      });
    }

    if (!this.map.getSource('norge-segment')) {
      this.map.addSource('norge-segment', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { mode: 'driving' },
          geometry: { type: 'LineString', coordinates: [] },
        },
      });
      this.map.addLayer({
        id: 'norge-segment-casing',
        type: 'line',
        source: 'norge-segment',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 9, 'line-opacity': 0.95 },
      });
      this.map.addLayer({
        id: 'norge-segment-line',
        type: 'line',
        source: 'norge-segment',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#EA4335',
          'line-width': 6,
          'line-opacity': 1,
        },
      });
    }
  }

  private updateRouteLine(): void {
    if (!this.map) return;
    this.ensureRouteLayer();

    const routeSource = this.map.getSource('norge-route') as mapboxgl.GeoJSONSource | undefined;
    if (this.tripRouteLegs.length > 0) {
      // Inactivos debajo, activos encima (orden en FeatureCollection)
      const sorted = [
        ...this.tripRouteLegs.filter(l => !l.active),
        ...this.tripRouteLegs.filter(l => l.active),
      ];
      routeSource?.setData({
        type: 'FeatureCollection',
        features: sorted.map(leg => ({
          type: 'Feature',
          properties: {
            mode: leg.mode,
            active: leg.active,
            stopId: leg.stopId,
          },
          geometry: { type: 'LineString', coordinates: leg.coordinates },
        })),
      });
    } else if (this.dayRouteLegs.length > 0) {
      routeSource?.setData({
        type: 'FeatureCollection',
        features: this.dayRouteLegs.map(leg => ({
          type: 'Feature',
          properties: { mode: leg.mode, active: true },
          geometry: { type: 'LineString', coordinates: leg.coordinates },
        })),
      });
    } else {
      const coords =
        this.routeCoordinates.length >= 2
          ? this.routeCoordinates
          : this.stops.map(s => [s.longitude, s.latitude] as [number, number]);
      routeSource?.setData({
        type: 'FeatureCollection',
        features:
          coords.length >= 2
            ? [
                {
                  type: 'Feature',
                  properties: { mode: 'driving', active: true },
                  geometry: { type: 'LineString', coordinates: coords },
                },
              ]
            : [],
      });
    }

    const seg = this.activeSegmentCoordinates.length >= 2 ? this.activeSegmentCoordinates : [];
    const segSource = this.map.getSource('norge-segment') as mapboxgl.GeoJSONSource | undefined;
    segSource?.setData({
      type: 'Feature',
      properties: { mode: this.activeSegmentMode },
      geometry: { type: 'LineString', coordinates: seg },
    });
  }

  private renderStopMarkers(): void {
    if (!this.map || this.stops.length === 0) return;

    this.stopMarkers.forEach(m => m.remove());
    this.stopMarkers = [];

    // Ocultar markers de paradas grandes cuando hay overlay del día
    if (this.tripDayPoints.length >= 2 || this.dayPoints.length >= 2) return;

    this.stops.forEach((stop, index) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'norge-marker';
      el.textContent = String(index + 1);
      el.setAttribute('aria-label', stop.name);
      if (stop.id === this.selectedStopId) el.classList.add('is-active');
      el.addEventListener('click', e => {
        e.stopPropagation();
        this.stopSelected.emit(stop.id);
      });

      this.stopMarkers.push(
        new mapboxgl.Marker({ element: el })
          .setLngLat([stop.longitude, stop.latitude])
          .addTo(this.map!),
      );
    });
  }

  private refreshStopMarkerColors(): void {
    this.stopMarkers.forEach((marker, i) => {
      marker.getElement().classList.toggle('is-active', this.stops[i]?.id === this.selectedStopId);
    });
  }

  private clearDayOverlay(): void {
    this.dayMarkers.forEach(m => {
      m.getPopup()?.remove();
      m.remove();
    });
    this.legLabelMarkers.forEach(m => m.remove());
    this.dayMarkers = [];
    this.legLabelMarkers = [];
  }

  private shortTitle(name: string): string {
    const cut = name.indexOf(' (');
    return cut > 0 ? name.slice(0, cut) : name;
  }

  private escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private transportIcon(mode?: string): string {
    // Etiqueta corta para popup HTML (sin depender de Material Icons en el mapa).
    return this.transportLabel(mode);
  }

  private transportLabel(mode?: string): string {
    switch (mode) {
      case 'boat':
        return 'Barco';
      case 'bus':
        return 'Bus';
      case 'train':
        return 'Tren';
      case 'driving':
        return 'Coche';
      case 'lodging':
        return 'Alojamiento';
      default:
        return '';
    }
  }

  private renderDayOverlay(): void {
    if (!this.map) return;
    this.clearDayOverlay();

    const points =
      this.tripDayPoints.length > 0 ? this.tripDayPoints : this.dayPoints.map(p => ({ ...p, active: true }));

    if (points.length < 2) {
      this.renderStopMarkers();
      return;
    }

    this.stopMarkers.forEach(m => m.remove());
    this.stopMarkers = [];

    // Grises primero, activos encima (orden DOM / z de markers Mapbox = orden de add)
    const ordered = [...points.filter(p => !p.active), ...points.filter(p => p.active)];

    ordered.forEach(p => {
      const title = this.shortTitle(p.name);
      const modeLabel = this.transportLabel(p.arriveBy);
      const isDayActive = p.active !== false;
      const pointIdx = p.pointIndex ?? 0;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'norge-marker norge-marker--day';
      if (!isDayActive) {
        el.classList.add('is-dimmed');
      } else if (p.arriveBy) {
        el.classList.add(`mode-${p.arriveBy}`);
      }
      const activePointIdx = this.selectedActivityIndex <= 0 ? 0 : this.selectedActivityIndex - 1;
      el.innerHTML =
        isDayActive && p.arriveBy
          ? `<span class="norge-marker-num">${p.letter}</span><span class="norge-marker-mode">${this.modeGlyph(p.arriveBy)}</span>`
          : `<span class="norge-marker-num">${p.letter}</span>`;
      el.setAttribute('aria-label', title);
      if (isDayActive && pointIdx === activePointIdx) el.classList.add('is-active');
      if (isDayActive && pointIdx === 0) el.classList.add('is-start');

      const modeRow = modeLabel
        ? `<div class="norge-popup-mode">${this.escapeHtml(modeLabel)}</div>`
        : pointIdx === 0
          ? `<div class="norge-popup-mode">Inicio del día</div>`
          : '';

      const popup = new mapboxgl.Popup({
        offset: 18,
        closeButton: false,
        closeOnClick: false,
        className: 'norge-day-popup',
      }).setHTML(
        `<div class="norge-popup-card">` +
          `<span class="norge-popup-num">${this.escapeHtml(p.letter)}</span>` +
          `<div class="norge-popup-body">` +
          `<span class="norge-popup-title">${this.escapeHtml(title)}</span>` +
          modeRow +
          `</div></div>`,
      );

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([p.longitude, p.latitude])
        .setPopup(popup)
        .addTo(this.map!);

      el.addEventListener('click', e => {
        e.stopPropagation();
        const activityIndex = pointIdx === 0 ? 0 : pointIdx + 1;
        if (p.stopId) {
          this.tripPointSelected.emit({ stopId: p.stopId, activityIndex });
        } else {
          this.dayActivitySelected.emit(activityIndex);
        }
        if (!marker.getPopup()?.isOpen()) {
          marker.togglePopup();
        }
      });

      if (isDayActive && pointIdx === activePointIdx) {
        marker.togglePopup();
      }

      this.dayMarkers.push(marker);
    });

    this.updateRouteLine();
  }

  private modeGlyph(mode: string): string {
    // Mini SVG monocromo (blanco) para el marcador.
    const common =
      'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"';
    switch (mode) {
      case 'boat':
        return `<svg ${common}><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>`;
      case 'bus':
        return `<svg ${common}><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>`;
      case 'train':
        return `<svg ${common}><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
      case 'lodging':
        return `<svg ${common}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
      default:
        return `<svg ${common}><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`;
    }
  }

  private flyToStop(id: string): void {
    const stop = this.stops.find(s => s.id === id);
    if (!stop || !this.map) return;
    this.map.flyTo({
      center: [stop.longitude, stop.latitude],
      zoom: 9,
      pitch: 0,
      bearing: 0,
      duration: 1000,
      essential: true,
    });
  }

  private fitTrip(): void {
    if (!this.map || this.tripRouteLegs.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    this.tripRouteLegs.forEach(leg => leg.coordinates.forEach(c => bounds.extend(c)));
    if (bounds.isEmpty()) return;
    this.map.fitBounds(bounds, { padding: 64, maxZoom: 7.5, pitch: 0, bearing: 0, duration: 900 });
  }

  private fitDay(): void {
    // Conservado por si se necesita; el zoom por día está desactivado a propósito.
    if (!this.map) return;
    const bounds = new mapboxgl.LngLatBounds();
    const line = this.dayRouteCoordinates.length >= 2 ? this.dayRouteCoordinates : null;
    if (line) {
      line.forEach(c => bounds.extend(c));
    } else {
      this.dayPoints.forEach(p => bounds.extend([p.longitude, p.latitude]));
    }
    if (bounds.isEmpty()) return;
    this.map.fitBounds(bounds, { padding: 72, maxZoom: 12, pitch: 0, bearing: 0, duration: 900 });
  }

  private fitAll(): void {
    if (!this.map || this.stops.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    const line = this.routeCoordinates.length >= 2 ? this.routeCoordinates : null;
    if (line) {
      line.forEach(c => bounds.extend(c));
    } else {
      this.stops.forEach(s => bounds.extend([s.longitude, s.latitude]));
    }
    this.map.fitBounds(bounds, { padding: 64, maxZoom: 7, pitch: 0, bearing: 0, duration: 900 });
  }

  resize(): void {
    try {
      this.map?.resize();
    } catch {
      /* noop */
    }
  }
}

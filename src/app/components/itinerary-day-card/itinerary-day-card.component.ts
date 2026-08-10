import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { applyMapboxPublicToken } from '../../core/mapbox-token.util';
import {
  fetchItineraryLegs,
  ItineraryRouteLeg,
  ItineraryTravelMode,
  normalizeArriveBy,
} from '../../core/mapbox-directions.util';
import { ScrollService } from '../../services/scroll.service';

interface Activity {
  name: string;
  description: string;
  images: string[];
  longitude: number;
  latitude: number;
  mapUrl: string;
  /** Cómo se llega a este punto desde el anterior (default: a pie). */
  arriveBy?: ItineraryTravelMode;
}

interface Day {
  title: string;
  activities: Activity[];
}

@Component({
  selector: 'app-itinerary-day-card',
  templateUrl: './itinerary-day-card.component.html',
  styleUrls: ['./itinerary-day-card.component.css'],
})
export class ItineraryDayCardComponent implements OnDestroy, OnInit, OnChanges {
  @Input() day!: Day;
  @Input() borderClass: string = '';
  /** Id del panel (ancla + apertura desde Inicio Japón). */
  @Input() panelId = '';
  /** Cuando coincide con panelId, el acordeón se abre. */
  @Input() activeExpandId: string | null = null;
  @ViewChild('map', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mobileMap', { static: false }) mobileMapContainer!: ElementRef;
  @ViewChild('galleryContainer', { static: false }) galleryContainer!: ElementRef;
  @ViewChild('mobileScrollContainer', { static: false }) mobileScrollContainer!: ElementRef;

  panelOpenState = false;
  currentActivityIndex = 0;
  currentImageIndex = 0;
  private map!: mapboxgl.Map;
  private mobileMap!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private mobileMarkers: mapboxgl.Marker[] = [];
  private routeLegs: ItineraryRouteLeg[] = [];
  private routeLegsPromise: Promise<ItineraryRouteLeg[]> | null = null;
  private isMapInitialized = false;
  private isMobileMapInitialized = false;
  private touchStartX = 0;
  private touchEndX = 0;
  private static readonly ROUTE_SOURCE = 'itinerary-route';
  private static readonly ROUTE_CASING = 'itinerary-route-casing';
  private static readonly ROUTE_LINE = 'itinerary-route-line';

  constructor(
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Resetear scroll cuando se inicializa el componente
    this.scrollService.resetContainerScroll('.mobile-scroll-container');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['activeExpandId'] &&
      this.panelId &&
      this.activeExpandId === this.panelId
    ) {
      this.panelOpenState = true;
      // El body del expansion panel recién existe tras render / animación; sin esto el mapa no inicializa.
      this.cdr.detectChanges();
      this.deferInitMapsWhilePanelOpens();
    }
  }

  /** Mapbox necesita el contenedor ya visible con tamaño > 0. */
  private deferInitMapsWhilePanelOpens(): void {
    const delays = [320, 520];
    delays.forEach(ms =>
      setTimeout(() => {
        if (!this.panelOpenState) return;
        this.onPanelStateChange(true);
        requestAnimationFrame(() => {
          try {
            this.map?.resize();
          } catch {
            /* noop */
          }
          try {
            this.mobileMap?.resize();
          } catch {
            /* noop */
          }
        });
      }, ms),
    );
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    if (this.mobileMap) {
      this.mobileMap.remove();
    }
  }

  // Método para manejar swipe en la galería
  onGalleryTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onGalleryTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleGallerySwipe();
  }

  private handleGallerySwipe(): void {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      const currentActivity = this.day.activities[this.currentActivityIndex];
      if (swipeDistance > 0 && this.currentImageIndex > 0) {
        // Swipe right - imagen anterior
        this.currentImageIndex--;
      } else if (swipeDistance < 0 && this.currentImageIndex < currentActivity.images.length - 1) {
        // Swipe left - imagen siguiente
        this.currentImageIndex++;
      }
    }
  }

  onPanelStateChange(isOpen: boolean): void {
    console.log('Estado del panel:', isOpen);
    if (isOpen) {
      this.initializeMap();
      this.initializeMobileMap();
    }
  }

  private initializeMap(): void {
    if (this.isMapInitialized || !this.mapContainer?.nativeElement) {
      return;
    }

    if (!applyMapboxPublicToken()) {
      return;
    }

    const firstActivity = this.day.activities[0];
    if (!firstActivity) {
      console.error('No hay actividades para inicializar el mapa.');
      return;
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [firstActivity.longitude, firstActivity.latitude],
      zoom: 12,
    });

    this.map.on('load', () => {
      void this.bootstrapMapOverlay(this.map, this.markers);
    });

    this.isMapInitialized = true;
  }

  private initializeMobileMap(): void {
    if (this.isMobileMapInitialized || !this.mobileMapContainer?.nativeElement) {
      return;
    }

    if (!applyMapboxPublicToken()) {
      return;
    }

    const firstActivity = this.day.activities[0];
    if (!firstActivity) {
      return;
    }

    this.mobileMap = new mapboxgl.Map({
      container: this.mobileMapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [firstActivity.longitude, firstActivity.latitude],
      zoom: 12,
    });

    this.mobileMap.on('load', () => {
      void this.bootstrapMapOverlay(this.mobileMap, this.mobileMarkers);
    });

    this.isMobileMapInitialized = true;
  }

  private async bootstrapMapOverlay(
    map: mapboxgl.Map,
    markers: mapboxgl.Marker[],
  ): Promise<void> {
    if (!this.routeLegsPromise) {
      this.routeLegsPromise = fetchItineraryLegs(this.day.activities).then(legs => {
        this.routeLegs = legs;
        return legs;
      });
    }
    await this.routeLegsPromise;
    this.ensureRouteLayer(map);
    this.setRouteGeoJson(map);
    this.addMarkers(map, markers);
    this.adjustBounds(map);
    try {
      map.resize();
    } catch {
      /* noop */
    }
  }

  private arriveMode(activity: Activity, _index: number): ItineraryTravelMode {
    return normalizeArriveBy(activity.arriveBy);
  }

  private modeGlyph(mode: ItineraryTravelMode): string {
    const size = 12;
    if (mode === 'driving' || mode === 'bus' || mode === 'lodging') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`;
    }
    if (mode === 'plane') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;
    }
    if (mode === 'metro') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2H18v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6.5h-5V6h5v4.5zm2 0V6h5v4.5h-5zm3.5 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
    }
    if (mode === 'boat') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>`;
    }
    if (mode === 'train') {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>`;
  }

  private addMarkers(map: mapboxgl.Map, markers: mapboxgl.Marker[]): void {
    markers.forEach(marker => marker.remove());
    markers.length = 0;

    this.day.activities.forEach((activity, index) => {
      const mode = this.arriveMode(activity, index);
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `itinerary-marker mode-${mode}`;
      if (index === 0) el.classList.add('is-start');
      if (index === this.currentActivityIndex) el.classList.add('is-active');
      el.innerHTML = `<span class="itinerary-marker-num">${index + 1}</span><span class="itinerary-marker-mode">${this.modeGlyph(mode)}</span>`;
      el.title = activity.name;
      el.addEventListener('click', e => {
        e.stopPropagation();
        this.selectActivity(index);
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([activity.longitude, activity.latitude])
        .addTo(map);

      markers.push(marker);
    });
  }

  private ensureRouteLayer(map: mapboxgl.Map): void {
    const src = ItineraryDayCardComponent.ROUTE_SOURCE;
    if (map.getSource(src)) return;

    map.addSource(src, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
    map.addLayer({
      id: ItineraryDayCardComponent.ROUTE_CASING,
      type: 'line',
      source: src,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': ['case', ['to-boolean', ['get', 'active']], '#ffffff', '#E0E0E0'],
        'line-width': ['case', ['to-boolean', ['get', 'active']], 8, 6],
        'line-opacity': 0.95,
      },
    });
    map.addLayer({
      id: ItineraryDayCardComponent.ROUTE_LINE,
      type: 'line',
      source: src,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': [
          'case',
          ['to-boolean', ['get', 'active']],
          '#f44336',
          '#1a237e',
        ],
        'line-width': ['case', ['to-boolean', ['get', 'active']], 5, 3.5],
        'line-opacity': ['case', ['to-boolean', ['get', 'active']], 1, 0.85],
      },
    });
  }

  private setRouteGeoJson(map: mapboxgl.Map): void {
    const source = map.getSource(ItineraryDayCardComponent.ROUTE_SOURCE) as
      | mapboxgl.GeoJSONSource
      | undefined;
    if (!source) return;

    const activeLeg =
      this.currentActivityIndex > 0 ? this.currentActivityIndex - 1 : -1;

    source.setData({
      type: 'FeatureCollection',
      features: this.routeLegs.map((leg, i) => ({
        type: 'Feature',
        properties: {
          mode: leg.mode,
          active: i === activeLeg || (activeLeg < 0 && i === 0),
        },
        geometry: {
          type: 'LineString',
          coordinates: leg.coordinates,
        },
      })),
    });
  }

  private adjustBounds(map: mapboxgl.Map): void {
    if (this.day.activities.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    this.day.activities.forEach(activity => {
      bounds.extend([activity.longitude, activity.latitude]);
    });

    map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  }

  selectActivity(index: number): void {
    if (index < 0 || index >= this.day.activities.length) return;

    this.currentActivityIndex = index;
    this.currentImageIndex = 0;

    const activity = this.day.activities[index];

    if (this.map) {
      this.updateMarkers(this.map, this.markers);
      this.setRouteGeoJson(this.map);
      this.performDesktopZoomAnimation(activity);
    }

    if (this.mobileMap) {
      this.updateMarkers(this.mobileMap, this.mobileMarkers);
      this.setRouteGeoJson(this.mobileMap);
      this.performMobileZoomAnimation(activity);
    }

    this.scrollToActivityTop();
  }

  private performDesktopZoomAnimation(activity: Activity): void {
    if (!this.map) return;
    
    // Cancelar cualquier animación en curso
    this.map.stop();
    
    // Primero zoom out para ver el contexto completo
    this.map.flyTo({
      center: [activity.longitude, activity.latitude],
      zoom: 13,
      duration: 800,
      essential: true
    });
    
    // Esperar a que termine completamente la animación antes de hacer zoom in
    const onMoveEnd = () => {
      this.map.off('moveend', onMoveEnd);
      
      // Pequeña pausa para que se vea el contexto
      setTimeout(() => {
        if (this.map) {
          this.map.flyTo({
            center: [activity.longitude, activity.latitude],
            zoom: 15,
            duration: 1200,
            essential: true
          });
        }
      }, 200);
    };
    
    this.map.once('moveend', onMoveEnd);
  }

  private performMobileZoomAnimation(activity: Activity): void {
    if (!this.mobileMap) return;
    
    // Cancelar cualquier animación en curso
    this.mobileMap.stop();
    
    // Animación más simple y rápida para móvil
    this.mobileMap.flyTo({
      center: [activity.longitude, activity.latitude],
      zoom: 15,
      duration: 800,
      essential: true
    });
  }

  private updateMarkers(map: mapboxgl.Map, markers: mapboxgl.Marker[]): void {
    this.addMarkers(map, markers);
  }

  changeActivity(delta: number): void {
    const newIndex = this.currentActivityIndex + delta;
    if (newIndex >= 0 && newIndex < this.day.activities.length) {
      this.selectActivity(newIndex);
    }
  }

  private scrollToActivityTop(): void {
    // Solo resetear scroll interno del contenedor móvil sin mover la página
    if (window.innerWidth <= 768) {
      // Resetear scroll del contenedor móvil sin hacer scroll en la página principal
      if (this.mobileScrollContainer?.nativeElement) {
        this.mobileScrollContainer.nativeElement.scrollTop = 0;
      }
    }
  }

  changeImage(delta: number): void {
    const currentActivity = this.day.activities[this.currentActivityIndex];
    const newIndex = this.currentImageIndex + delta;
    
    if (newIndex >= 0 && newIndex < currentActivity.images.length) {
      this.currentImageIndex = newIndex;
    }
  }

  private debounce(func: () => void, wait: number): () => void {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func();
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  rescaleMap(): void {
    const debouncedAdjustBounds = this.debounce(() => {
      if (this.map) {
        this.adjustBounds(this.map);
      }
      if (this.mobileMap) {
        this.adjustBounds(this.mobileMap);
      }
    }, 100);

    debouncedAdjustBounds();
  }

  /**
   * Abre Google Maps con la ruta completa de las actividades del día.
   * Usa la primera actividad como origen, la última como destino
   * y el resto como waypoints intermedios.
   */
  openGoogleMapsRoute(): void {
    if (!this.day || !this.day.activities || this.day.activities.length === 0) {
      return;
    }

    const coords = this.day.activities
      .filter(a => a.latitude != null && a.longitude != null)
      .map(a => `${a.latitude},${a.longitude}`);

    if (coords.length === 0) {
      return;
    }

    const origin = encodeURIComponent(coords[0]);
    const destination = encodeURIComponent(coords[coords.length - 1]);
    const waypointsArray = coords.slice(1, -1);
    const waypointsParam = waypointsArray.length
      ? `&waypoints=${encodeURIComponent(waypointsArray.join('|'))}`
      : '';

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=walking`;

    window.open(url, '_blank');
  }
}
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { ScrollService } from '../../services/scroll.service';

interface Activity {
  name: string;
  description: string;
  images: string[];
  longitude: number;
  latitude: number;
  mapUrl: string;
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
export class ItineraryDayCardComponent implements OnDestroy, OnInit {
  @Input() day!: Day;
  @Input() borderClass: string = '';
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
  private isMapInitialized = false;
  private isMobileMapInitialized = false;
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Resetear scroll cuando se inicializa el componente
    this.scrollService.resetContainerScroll('.mobile-scroll-container');
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
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
    
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
      this.addMarkers(this.map, this.markers);
      this.adjustBounds(this.map);
    });

    this.isMapInitialized = true;
  }

  private initializeMobileMap(): void {
    if (this.isMobileMapInitialized || !this.mobileMapContainer?.nativeElement) {
      return;
    }
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
    
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
      this.addMarkers(this.mobileMap, this.mobileMarkers);
      this.adjustBounds(this.mobileMap);
    });

    this.isMobileMapInitialized = true;
  }

  private addMarkers(map: mapboxgl.Map, markers: mapboxgl.Marker[]): void {
    // Limpiar marcadores existentes
    markers.forEach(marker => marker.remove());
    markers.length = 0;

    this.day.activities.forEach((activity, index) => {
      const marker = new mapboxgl.Marker({
        color: index === this.currentActivityIndex ? '#f44336' : '#1a237e',
        scale: index === this.currentActivityIndex ? 1.2 : 1
      })
        .setLngLat([activity.longitude, activity.latitude])
        .addTo(map);

      markers.push(marker);
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
    
    // Animación optimizada para PC (desktop)
    if (this.map) {
      this.updateMarkers(this.map, this.markers);
      this.performDesktopZoomAnimation(activity);
    }
    
    // Animación optimizada para móvil
    if (this.mobileMap) {
      this.updateMarkers(this.mobileMap, this.mobileMarkers);
      this.performMobileZoomAnimation(activity);
    }
    
    // Scroll optimizado para móvil
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
    markers.forEach((marker, index) => {
      const color = index === this.currentActivityIndex ? '#f44336' : '#1a237e';
      const scale = index === this.currentActivityIndex ? 1.2 : 1;
      
      // Remove the old marker and create a new one with the updated color
      marker.remove();
      
      const newMarker = new mapboxgl.Marker({
        color: color,
        scale: scale
      })
        .setLngLat([this.day.activities[index].longitude, this.day.activities[index].latitude])
        .addTo(map);
      
      // Replace the marker in the array
      markers[index] = newMarker;
    });
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
}
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { isPlatformBrowser } from '@angular/common';

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
export class ItineraryDayCardComponent implements OnDestroy {
  @Input() day!: Day;
  @Input() borderClass: string = '';
  @ViewChild('map', { static: false }) mapContainer!: ElementRef;

  panelOpenState = false;
  currentActivityIndex = 0;
  currentImageIndex = 0;
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private isMapInitialized = false;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnDestroy(): void {
    // Limpia el mapa al destruir el componente
    if (this.map) {
      this.map.remove();
    }
  }

  // Variables existentes
  
  // Añade esta nueva variable
  isDescriptionVisible = false;
  
  
  // Añade este nuevo método
  toggleDescription(): void {
    this.isDescriptionVisible = !this.isDescriptionVisible;
    console.log('Descripción visible:', this.isDescriptionVisible);
  }

  onPanelStateChange(isOpen: boolean): void {
    console.log('Estado del panel:', isOpen);
    if (isOpen) {
      this.initializeMap();
    }
  }

  private async initializeMap(): Promise<void> {
    if (!this.isBrowser || this.isMapInitialized || !this.mapContainer?.nativeElement) return;
  
    const { default: mapboxgl } = await import('mapbox-gl'); // Lazy load para evitar que lo intente cargar SSR
  
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
  
    const firstActivity = this.day.activities[0];
    if (!firstActivity) return;
  
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [firstActivity.longitude, firstActivity.latitude],
      zoom: 12,
    });
  
    this.map.on('load', () => {
      this.addMarkers();
      this.rescaleMap();
    });
  
    this.isMapInitialized = true;
  }


  private addMarkers(): void {
    this.day.activities.forEach((activity, index) => {
      const color = index === this.currentActivityIndex ? 'red' : 'blue';
  
      // Eliminar los marcadores anteriores si ya existen
      if (this.markers[index]) {
        this.markers[index].remove();
      }
  
      const marker = new mapboxgl.Marker({ color })
        .setLngLat([activity.longitude, activity.latitude])
        .addTo(this.map);
  
      // Almacenar el marcador en el arreglo local
      this.markers[index] = marker;
    });
  }

  private adjustBounds(): void {
    const bounds = new mapboxgl.LngLatBounds();
    this.day.activities.forEach(activity => bounds.extend([activity.longitude, activity.latitude]));
    this.map.fitBounds(bounds, { padding: 50, duration: 2000, animate: true });
  }

  selectActivity(index: number): void {
    if (this.currentActivityIndex !== index) {
      this.currentActivityIndex = index;
      this.currentImageIndex = 0;
      const activity = this.day.activities[index];
      this.map.flyTo({
        center: [activity.longitude, activity.latitude],
        essential: true,
        zoom: 13
      });
      this.addMarkers();
    }
  }

  changeActivity(delta: number): void {
    const newIndex = this.currentActivityIndex + delta;
    if (newIndex >= 0 && newIndex < this.day.activities.length) {
      this.selectActivity(newIndex);
    }
  }

  changeImage(delta: number): void {
    const newIndex = this.currentImageIndex + delta;
    const currentActivity = this.day.activities[this.currentActivityIndex];
    if (newIndex >= 0 && newIndex < currentActivity.images.length) {
      this.currentImageIndex = newIndex;
    }
  }

  private debounce(func: () => void, wait: number): () => void {
    let timeout: number | null = null;
    return () => {
      if (timeout) {
        cancelAnimationFrame(timeout);
      }
      timeout = requestAnimationFrame(() => func());
    };
  }

  rescaleMap(): void {
    this.adjustBounds();
  }
}
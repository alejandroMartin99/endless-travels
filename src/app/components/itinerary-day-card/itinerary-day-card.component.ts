import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';

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
  @ViewChild('mobileMap', { static: false }) mobileMapContainer!: ElementRef;

  panelOpenState = false;
  currentActivityIndex = 0;
  currentImageIndex = 0;
  private map!: mapboxgl.Map;
  private mobileMap!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private mobileMarkers: mapboxgl.Marker[] = [];
  private isMapInitialized = false;
  private isMobileMapInitialized = false;

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    if (this.mobileMap) {
      this.mobileMap.remove();
    }
    this.toggleBodyScroll(false);
  }

  isDescriptionVisible = false;

  toggleDescription(): void {
    this.isDescriptionVisible = !this.isDescriptionVisible;
    this.toggleBodyScroll(this.isDescriptionVisible);
  }

  isGalleryVisible = false;

  toggleGallery(): void {
    this.isGalleryVisible = !this.isGalleryVisible;
    this.toggleBodyScroll(this.isGalleryVisible);
  }

  private toggleBodyScroll(disable: boolean): void {
    if (disable) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
    
    // Actualizar mapas
    if (this.map) {
      this.map.flyTo({
        center: [activity.longitude, activity.latitude],
        zoom: 14,
        duration: 1000
      });
      this.updateMarkers(this.map, this.markers);
    }
    
    if (this.mobileMap) {
      this.mobileMap.flyTo({
        center: [activity.longitude, activity.latitude],
        zoom: 14,
        duration: 1000
      });
      this.updateMarkers(this.mobileMap, this.mobileMarkers);
    }
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
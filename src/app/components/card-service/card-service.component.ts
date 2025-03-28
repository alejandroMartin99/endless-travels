import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css'],
})
export class CardServiceComponent implements AfterViewInit, OnDestroy {

  constructor(private sanitizer: DomSanitizer) {}

  @Input() day!: Day;
  @Input() borderClass: string = '';
  @ViewChild('map') mapContainer!: ElementRef;

  currentActivityIndex = 0;
  currentImageIndex = 0;
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private mapResizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    // Configurar el token de Mapbox
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
    
    // Inicializar el mapa con un pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  }

  getSafeDescription(description: string): SafeHtml {
    // Reemplaza URLs con un enlace que muestra "Link" en lugar de la URL completa
    const linkifiedDescription = description.replace(
      /https?:\/\/[^\s]+/g, 
      (url) => `<a href="${url}" target="_blank">Link</a>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(linkifiedDescription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['day'] && !changes['day'].firstChange) {
      this.cleanupMap();  // Limpiar el mapa y marcadores al cambiar de restaurante
      this.currentActivityIndex = 0;
      this.currentImageIndex = 0;
      setTimeout(() => {
        this.initializeMap();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.cleanupMap();
  }
  private cleanupMap(): void {
    if (this.map) {
      this.map.remove();
    }
    if (this.mapResizeObserver) {
      this.mapResizeObserver.disconnect();
      this.mapResizeObserver = null;
    }
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  private initializeMap(): void {
    if (!this.mapContainer?.nativeElement || !this.day?.activities?.length) return;

    const firstActivity = this.day.activities[0];

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [firstActivity.longitude, firstActivity.latitude],
      zoom: 12,
    });

    this.map.on('load', () => {
      this.addMarkers();
      this.adjustBounds();
      this.setupResizeObserver();
    });
  }

  private setupResizeObserver(): void {
    if (!this.mapContainer?.nativeElement || !this.map) return;
  
    // Crear un observer para detectar cambios en el tamaño del contenedor
    this.mapResizeObserver = new ResizeObserver(() => {
      if (this.map) {
        this.map.resize();
      }
    });
  
    // Observar el contenedor del mapa
    this.mapResizeObserver.observe(this.mapContainer.nativeElement);
  }

  

  private addMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    this.day.activities.forEach((activity, index) => {
      const color = index === this.currentActivityIndex ? 'red' : 'blue';
      const marker = new mapboxgl.Marker({ color })
        .setLngLat([activity.longitude, activity.latitude])
        .addTo(this.map);
      this.markers.push(marker);
    });
  }

  private adjustBounds(): void {
    if (!this.map || !this.day?.activities?.length) return;

    const bounds = new mapboxgl.LngLatBounds();
    this.day.activities.forEach(activity => {
      bounds.extend([activity.longitude, activity.latitude]);
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds, { padding: 50, duration: 1000, animate: true });
    }
  }

  
  selectActivity(index: number): void {
    if (this.currentActivityIndex !== index) {
      this.currentActivityIndex = index;
      this.currentImageIndex = 0;
      
      if (this.map) {
        const activity = this.day.activities[index];
        this.map.flyTo({
          center: [activity.longitude, activity.latitude],
          essential: true,
          zoom: 13
        });
        this.addMarkers();
      }
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

  rescaleMap(): void {
    if (this.map) {
      this.adjustBounds();
    }
  }
}
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
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
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css'],
})
export class CardServiceComponent implements AfterViewInit, OnDestroy {
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

  ngOnDestroy(): void {
    // Limpia el mapa al destruir el componente
    if (this.map) {
      this.map.remove();
    }
    
    if (this.mapResizeObserver) {
      this.mapResizeObserver.disconnect();
      this.mapResizeObserver = null;
    }
  }

  private initializeMap(): void {
    if (!this.mapContainer?.nativeElement || !this.day?.activities?.length) {
      console.error('No se puede inicializar el mapa: falta el contenedor o no hay actividades');
      return;
    }
    
    const firstActivity = this.day.activities[0];

    try {
      console.log('Inicializando mapa...');
      
      // Crear el mapa
      this.map = new mapboxgl.Map({
        container: this.mapContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [firstActivity.longitude, firstActivity.latitude],
        zoom: 12,
      });

      // Agregar marcadores y ajustar el mapa cuando se cargue
      this.map.on('load', () => {
        console.log('Mapa cargado');
        this.addMarkers();
        this.adjustBounds();
        
        // Configurar un ResizeObserver para manejar cambios de tamaño automáticamente
        this.setupResizeObserver();
      });
      
      console.log('Mapa inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }
  
  private setupResizeObserver(): void {
    if (!this.mapContainer?.nativeElement || !this.map) return;
    
    // Creamos un observer para detectar cambios en el tamaño del contenedor
    this.mapResizeObserver = new ResizeObserver(() => {
      if (this.map) {
        this.map.resize();
      }
    });
    
    // Observamos el contenedor del mapa
    this.mapResizeObserver.observe(this.mapContainer.nativeElement);
  }

  private addMarkers(): void {
    // Limpiar marcadores anteriores
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    
    // Agregar nuevos marcadores
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
      this.map.fitBounds(bounds, { 
        padding: 50, 
        duration: 1000, 
        animate: true 
      });
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
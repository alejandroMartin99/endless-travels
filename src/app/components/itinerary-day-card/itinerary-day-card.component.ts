import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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
  styleUrls: ['./itinerary-day-card.component.css']
})
export class ItineraryDayCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() day!: Day;
  @Input() borderClass: string = '';
  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLElement>;

  panelOpenState = false;
  currentActivityIndex = 0;
  currentImageIndex = 0;
  private map!: mapboxgl.Map;
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }

  private initializeMap(): void {
    
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.day.activities[0].longitude, this.day.activities[0].latitude],
      zoom: 12,
    });

    this.map.on('load', () => {
      this.addMarkers();
      this.adjustBounds();
    });
  }

  getBorderColorClass(location: string): string {
    switch (location.toLowerCase()) {
      case 'norte':
        return 'border-blue';
      case 'sur':
        return 'border-green';
      case 'este':
        return 'border-red';
      case 'oeste':
        return 'border-purple';
      default:
        return 'border-blue'; // Color por defecto
    }
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(this.debounce(() => {
      this.map.resize();
      this.adjustBounds();
    }, 100));
    
    this.resizeObserver.observe(this.mapContainer.nativeElement);
  }

  private addMarkers(): void {
    this.day.activities.forEach((activity, index) => {
      const color = index === this.currentActivityIndex ? 'red' : 'blue';
      new mapboxgl.Marker({ color })
        .setLngLat([activity.longitude, activity.latitude])
        .addTo(this.map);
    });
  }

  private adjustBounds(): void {
    const bounds = new mapboxgl.LngLatBounds();
    this.day.activities.forEach(activity => {
      bounds.extend([activity.longitude, activity.latitude]);
    });
    this.map.fitBounds(bounds, { padding: 50, duration: 2000 , animate: true});
  }

  selectActivity(index: number): void {
    this.currentActivityIndex = index;
    this.currentImageIndex = 0;
    const activity = this.day.activities[index];
    this.map.flyTo({
      center: [activity.longitude, activity.latitude],
      essential: true,
      zoom: 15
    });
    this.addMarkers();
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
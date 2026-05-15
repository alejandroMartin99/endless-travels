import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { applyMapboxPublicToken } from '../../../../../../core/mapbox-token.util';

interface Accommodation {
  id: string;
  name: string;
  location: string;
  dates: string;
  price: string;
  rating: number;
  description: string;
  features: string[];
  images: string[];
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'pragabudapest-accommodation-recomendations-component',
  templateUrl: './accommodation-recomendations.component.html',
  styleUrls: ['./accommodation-recomendations.component.css'],
})
export class AccommodationRecomendationsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('mapPraga', { static: false }) mapPragaContainer!: ElementRef;
  @ViewChild('mapBratislava', { static: false }) mapBratislavaContainer!: ElementRef;
  @ViewChild('mapBudapest', { static: false }) mapBudapestContainer!: ElementRef;

  private maps: { [key: string]: mapboxgl.Map } = {};
  private markers: { [key: string]: mapboxgl.Marker } = {};

  accommodations: Accommodation[] = [
    {
      id: 'praga',
      name: 'Narodni Stay',
      location: 'Praga, República Checa',
      dates: '25 oct 2024 – 28 oct 2024',
      price: 'Total pagado (estancia): € 272,15',
      rating: 4.5,
      description: 'Narodni Stay: lo reservamos para tres noches en Praga en octubre de 2024. Alojamiento moderno y bien ubicado en el corazón de la ciudad, en la calle Národní. Acceso a pie a la mayoría de atractivos; habitaciones funcionales y buena relación calidad-precio para base de visita.',
      features: [
        'Ubicación céntrica en Národní',
        'Acceso a pie a principales atractivos',
        'Habitaciones modernas y funcionales',
        'WiFi de alta velocidad',
        'Buen precio-calidad'
      ],
      images: [
        '/assets/budapest/recomendations/Narodni.jpg',
        '/assets/budapest/recomendations/Narodni_2.jpg',
        '/assets/budapest/recomendations/Narodni_3.jpg',
        '/assets/budapest/recomendations/Narodni_4.jpg',
      ],
      longitude: 14.4177,
      latitude: 50.0815
    },
    {
      id: 'bratislava',
      name: 'BlueBell Hotel',
      location: 'Bratislava, Eslovaquia',
      dates: '28 oct 2024 – 29 oct 2024',
      price: 'Total pagado (1 noche): € 88,86',
      rating: 4.6,
      description: 'BlueBell Hotel: una noche en Bratislava (octubre 2024). Hotel cómodo y bien situado para recorrer el casco y el Danubio sin perder tiempo en transporte. Buena opción para una escala corta entre Praga y Budapest.',
      features: [
        'Ubicación céntrica en Bratislava',
        'Cerca del casco antiguo',
        'Habitaciones espaciosas',
        'Desayuno disponible',
        'Buen servicio'
      ],
      images: [
        '/assets/budapest/recomendations/BlueBell%20Hotel.jpg',
        '/assets/budapest/recomendations/BlueBell%20Hotel_2.jpg',
        '/assets/budapest/recomendations/BlueBell%20Hotel_3.jpg',
      ],
      longitude: 17.1077,
      latitude: 48.1486
    },
    {
      id: 'budapest',
      name: 'Apartamento Airbnb',
      location: 'Budapest, Hungría',
      dates: '29 oct 2024 – 5 nov 2024',
      price: 'Precio total: ~350€',
      rating: 4.7,
      description: 'Un apartamento moderno y acogedor ubicado en el corazón de Budapest, perfecto para una estancia prolongada. El apartamento ofrece todas las comodidades de un hogar, incluyendo cocina completamente equipada, espacio de trabajo y una ubicación excelente que permite explorar tanto Buda como Pest con facilidad. La experiencia de alojarse en un apartamento local añade autenticidad al viaje.',
      features: [
        'Ubicación céntrica en Budapest',
        'Cocina completamente equipada',
        'Espacio amplio y cómodo',
        'Experiencia local auténtica',
        'Excelente relación precio-calidad'
      ],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
      ],
      longitude: 19.0402,
      latitude: 47.4979
    }
  ];

  ngOnInit(): void {
    // Initialize maps after view init
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initializeMaps(), 100);
  }

  ngOnDestroy(): void {
    Object.values(this.maps).forEach(map => {
      if (map) {
        map.remove();
      }
    });
    Object.values(this.markers).forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
  }

  initializeMaps(): void {
    if (!applyMapboxPublicToken()) {
      return;
    }

    this.accommodations.forEach(accommodation => {
      let container: ElementRef | null = null;
      
      switch(accommodation.id) {
        case 'praga':
          container = this.mapPragaContainer;
          break;
        case 'bratislava':
          container = this.mapBratislavaContainer;
          break;
        case 'budapest':
          container = this.mapBudapestContainer;
          break;
      }

      if (!container?.nativeElement) return;

      const map = new mapboxgl.Map({
        container: container.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [accommodation.longitude, accommodation.latitude],
        zoom: 14
      });

      map.on('load', () => {
        const marker = new mapboxgl.Marker({
          color: '#6e5d43'
        })
          .setLngLat([accommodation.longitude, accommodation.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${accommodation.name}</strong><br>${accommodation.location}`))
          .addTo(map);

        this.markers[accommodation.id] = marker;
      });

      this.maps[accommodation.id] = map;
    });
  }
}

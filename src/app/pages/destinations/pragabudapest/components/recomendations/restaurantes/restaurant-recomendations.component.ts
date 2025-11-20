import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import mapboxgl from 'mapbox-gl';

interface Restaurant {
  id: string;
  name: string;
  type: string;
  rating: number;
  description: string;
  details: string[];
  images: string[];
  googleMapsUrl: string;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'pragabudapest-restaurant-recomendations-component',
  templateUrl: './restaurant-recomendations.component.html',
  styleUrls: ['./restaurant-recomendations.component.css'],
})
export class RestaurantRecomendationsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  
  activeCity: string = 'praga';
  currentImageIndex: { [key: string]: number } = {};
  activeRestaurantIndex: number = 0;
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  cities = [
    { id: 'praga', name: 'Praga' },
    { id: 'bratislava', name: 'Bratislava' },
    { id: 'budapest', name: 'Budapest' }
  ];

  restaurants: { [key: string]: Restaurant[] } = {
    praga: [
      {
        id: 'lokal',
        name: 'Lokál Dlouhá',
        type: 'Cocina tradicional checa • Pub auténtico',
        rating: 4.5,
        description: 'Lokál Dlouhá representa la esencia del pub checo tradicional elevado a su máxima expresión. Este establecimiento ha logrado capturar el espíritu auténtico de la cultura gastronómica checa mientras mantiene estándares de calidad excepcionales. Especializado en cerveza Pilsner Urquell servida directamente desde barril, el restaurante ofrece una experiencia inmersiva en la tradición bohemia.',
        details: [
          '💰 €€ (Precio medio: 15-25€ por persona)',
          '📍 Staré Město, Dlouhá 33',
          '🕐 11:00 - 24:00 (todos los días)',
          '📞 Reservas recomendadas para cena'
        ],
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lokál+Dlouhá+Praga',
        longitude: 14.4251,
        latitude: 50.0880
      },
      {
        id: 'field',
        name: 'Field Restaurant',
        type: 'Alta cocina moderna • Estrella Michelin',
        rating: 4.8,
        description: 'Field Restaurant es la demostración de que la cocina checa puede alcanzar alturas gastronómicas internacionales. Con una estrella Michelin, este restaurante reinterpreta la tradición culinaria checa a través de técnicas modernas y presentaciones artísticas, sin perder la esencia de los sabores locales.',
        details: [
          '💰 €€€ (Menú degustación: 120-150€ por persona)',
          '📍 Nové Město, U Milosrdných 12',
          '🕐 18:00 - 23:00 (cerrado domingos y lunes)',
          '📞 Reserva obligatoria con antelación'
        ],
        images: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Field+Restaurant+Praga',
        longitude: 14.4208,
        latitude: 50.0755
      },
      {
        id: 'cafe-imperial',
        name: 'Café Imperial',
        type: 'Cocina checa tradicional • Ambiente histórico',
        rating: 4.6,
        description: 'Café Imperial es un restaurante histórico que ha servido a la élite praguense desde 1914. Ubicado en un edificio Art Nouveau, el restaurante combina la elegancia de principios del siglo XX con una cocina checa tradicional refinada. El ambiente es majestuoso, con techos altos, mosaicos decorativos y una atmósfera que transporta a otra época.',
        details: [
          '💰 €€€ (Precio medio: 40-60€ por persona)',
          '📍 Nové Město, Na Poříčí 15',
          '🕐 12:00 - 23:00 (todos los días)',
          '📞 Reservas recomendadas, especialmente para cena'
        ],
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Café+Imperial+Praga',
        longitude: 14.4336,
        latitude: 50.0889
      },
      {
        id: 'la-degustation',
        name: 'La Degustation Bohême Bourgeoise',
        type: 'Alta cocina checa • Menú degustación',
        rating: 4.7,
        description: 'La Degustation es un restaurante que celebra la cocina checa tradicional a través de menús degustación creativos. El chef Oldřich Sahajdák reinterpreta recetas históricas checas con técnicas modernas, creando una experiencia gastronómica única que rinde homenaje a la tradición culinaria bohemia del siglo XIX.',
        details: [
          '💰 €€€ (Menú degustación: 90-120€ por persona)',
          '📍 Staré Město, Haštalská 18',
          '🕐 18:00 - 23:00 (cerrado domingos)',
          '📞 Reserva obligatoria con antelación'
        ],
        images: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Degustation+Bohême+Bourgeoise+Praga',
        longitude: 14.4244,
        latitude: 50.0922
      }
    ],
    bratislava: [
      {
        id: 'pivovar',
        name: 'Bratislavský Meštiansky Pivovar',
        type: 'Cervecería tradicional • Cocina eslovaca auténtica',
        rating: 4.4,
        description: 'En el corazón del casco antiguo de Bratislava, esta cervecería combina la tradición de la cerveza artesanal eslovaca con una cocina tradicional generosa y sabrosa. El ambiente es genuinamente acogedor, con un diseño que rinde homenaje a la historia cervecera de la ciudad.',
        details: [
          '💰 €€ (Precio medio: 12-20€ por persona)',
          '📍 Staré Mesto, Drevená 8',
          '🕐 11:00 - 23:00 (todos los días)',
          '📞 No suele requerir reserva'
        ],
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bratislavský+Meštiansky+Pivovar',
        longitude: 17.1077,
        latitude: 48.1486
      },
      {
        id: 'modra',
        name: 'Modrá Hviezda',
        type: 'Cocina eslovaca tradicional • Ambiente histórico',
        rating: 4.5,
        description: 'Ubicado en una bodega histórica bajo el castillo de Bratislava, Modrá Hviezda ofrece una experiencia gastronómica única en un entorno que respira historia. El restaurante está situado en lo que fueron antiguas bodegas, creando una atmósfera íntima y auténtica que complementa perfectamente la cocina tradicional.',
        details: [
          '💰 €€ (Precio medio: 15-25€ por persona)',
          '📍 Staré Mesto, Beblavého 14',
          '🕐 12:00 - 22:00 (todos los días)',
          '📞 Reservas recomendadas para cena'
        ],
        images: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Modrá+Hviezda+Bratislava',
        longitude: 17.1042,
        latitude: 48.1426
      }
    ],
    budapest: [
      {
        id: 'gundel',
        name: 'Gundel',
        type: 'Alta cocina húngara • Restaurante histórico',
        rating: 4.7,
        description: 'Gundel no es solo un restaurante; es una institución culinaria que ha servido a reyes, políticos y celebridades desde 1894. Ubicado en el Parque Városliget, este restaurante legendario representa la elegancia y sofisticación de la cocina húngara en su máxima expresión.',
        details: [
          '💰 €€€ (Precio medio: 50-80€ por persona)',
          '📍 Parque Városliget, Állatkerti krt. 2',
          '🕐 12:00 - 23:00 (todos los días)',
          '📞 Reserva obligatoria, especialmente para cena'
        ],
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gundel+Budapest',
        longitude: 19.0819,
        latitude: 47.5156
      },
      {
        id: 'menza',
        name: 'Menza',
        type: 'Cocina moderna húngara • Ambiente retro-moderno',
        rating: 4.5,
        description: 'Menza representa la nueva generación de restaurantes húngaros que reinventan la tradición con creatividad y estilo. El restaurante combina un diseño retro-moderno que rinde homenaje a la era comunista con una cocina contemporánea que reinterpreta los clásicos húngaros de manera innovadora.',
        details: [
          '💰 €€ (Precio medio: 20-35€ por persona)',
          '📍 Distrito VI, Liszt Ferenc tér 2',
          '🕐 12:00 - 24:00 (todos los días)',
          '📞 Reservas recomendadas para cena'
        ],
        images: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Menza+Budapest',
        longitude: 19.0614,
        latitude: 47.5050
      }
    ]
  };

  ngOnInit(): void {
    this.initializeImageIndices();
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1pZ2xlc2lhcyIsImEiOiJjbTBiOWQ0YngwNjVzMmpzYW0wZzE5a3JkIn0.xI-NcNAH7XVZoXpMBpllnA';
    
    // Esperar a que el DOM esté completamente renderizado
    setTimeout(() => {
      this.initializeMap();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    this.markers.forEach(marker => marker.remove());
  }

  initializeImageIndices(): void {
    Object.keys(this.restaurants).forEach(city => {
      this.restaurants[city].forEach(restaurant => {
        this.currentImageIndex[restaurant.id] = 0;
      });
    });
  }

  selectCity(cityId: string): void {
    this.activeCity = cityId;
    this.activeRestaurantIndex = 0;
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  }

  nextRestaurant(): void {
    const restaurants = this.getCurrentRestaurants();
    if (this.activeRestaurantIndex < restaurants.length - 1) {
      this.activeRestaurantIndex++;
      this.updateMapForActiveRestaurant();
    }
  }

  prevRestaurant(): void {
    if (this.activeRestaurantIndex > 0) {
      this.activeRestaurantIndex--;
      this.updateMapForActiveRestaurant();
    }
  }

  selectRestaurant(index: number): void {
    this.activeRestaurantIndex = index;
    this.updateMapForActiveRestaurant();
  }

  getVisibleRestaurants(): Restaurant[] {
    const restaurants = this.getCurrentRestaurants();
    return restaurants.slice(this.activeRestaurantIndex, this.activeRestaurantIndex + 1);
  }

  isRestaurantActive(restaurant: Restaurant): boolean {
    const restaurants = this.getCurrentRestaurants();
    const index = restaurants.findIndex(r => r.id === restaurant.id);
    return index === this.activeRestaurantIndex;
  }

  getRestaurantCounter(): string {
    const restaurants = this.getCurrentRestaurants();
    const total = restaurants.length;
    const current = this.activeRestaurantIndex + 1;
    return `Restaurante ${current} de ${total}`;
  }

  canGoNext(): boolean {
    const restaurants = this.getCurrentRestaurants();
    return this.activeRestaurantIndex < restaurants.length - 1;
  }

  canGoPrev(): boolean {
    return this.activeRestaurantIndex > 0;
  }

  changeImage(restaurantId: string, direction: number): void {
    const restaurant = this.getCurrentRestaurants().find(r => r.id === restaurantId);
    if (!restaurant) return;

    const currentIndex = this.currentImageIndex[restaurantId] || 0;
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < restaurant.images.length) {
      this.currentImageIndex[restaurantId] = newIndex;
    }
  }

  getCurrentRestaurants(): Restaurant[] {
    return this.restaurants[this.activeCity] || [];
  }

  getCurrentImageIndex(restaurantId: string): number {
    return this.currentImageIndex[restaurantId] || 0;
  }

  initializeMap(): void {
    // Verificar que el contenedor exista
    if (!this.mapContainer?.nativeElement) {
      console.warn('Map container not found');
      return;
    }
    
    const container = this.mapContainer.nativeElement;
    
    // Limpiar mapa anterior si existe
    if (this.map) {
      try {
        this.map.remove();
      } catch (e) {
        // Ignorar errores al limpiar
      }
    }
    
    // Limpiar marcadores
    this.markers.forEach(marker => {
      try {
        marker.remove();
      } catch (e) {
        // Ignorar errores
      }
    });
    this.markers = [];

    const currentRestaurants = this.getCurrentRestaurants();
    if (currentRestaurants.length === 0) {
      return;
    }

    const firstRestaurant = currentRestaurants[0];
    
    // Crear el mapa
    this.map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [firstRestaurant.longitude, firstRestaurant.latitude],
      zoom: 12
    });

    this.map.on('load', () => {
      // Asegurar que el mapa tenga el tamaño correcto
      setTimeout(() => {
        if (this.map) {
          this.map.resize();
        }
      }, 100);
      this.updateMapForActiveRestaurant();
      this.fitAllMarkers();
    });
  }

  fitAllMarkers(): void {
    if (!this.map || this.markers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    
    this.markers.forEach(marker => {
      const lngLat = marker.getLngLat();
      bounds.extend([lngLat.lng, lngLat.lat]);
    });

    if (this.markers.length > 0) {
      this.map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14,
        duration: 1000
      });
    }
  }

  updateMapForActiveRestaurant(): void {
    if (!this.map) return;

    // Remove existing markers
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    const currentRestaurants = this.getCurrentRestaurants();
    if (currentRestaurants.length === 0) return;

    // Add markers with active restaurant in blue
    currentRestaurants.forEach((restaurant, index) => {
      const isActive = index === this.activeRestaurantIndex;
      const marker = new mapboxgl.Marker({
        color: isActive ? '#1a237e' : '#999'
      })
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${restaurant.name}</strong>`))
        .addTo(this.map);

      this.markers.push(marker);
    });
  }
}

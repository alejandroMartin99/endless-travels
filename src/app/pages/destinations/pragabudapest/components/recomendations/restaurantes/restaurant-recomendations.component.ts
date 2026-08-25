import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { applyMapboxPublicToken } from '../../../../../../core/mapbox-token.util';

interface RestaurantPlace {
  id: string;
  name: string;
  cityLabel: string;
  type: string;
  rating: number;
  description: string;
  details: string[];
  images: { src: string; caption: string }[];
  googleMapsUrl: string;
  websiteUrl?: string;
  address: string;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'pragabudapest-restaurant-recomendations-component',
  templateUrl: './restaurant-recomendations.component.html',
  styleUrls: ['./restaurant-recomendations.component.css'],
})
export class RestaurantRecomendationsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('placeMap') placeMapEls!: QueryList<ElementRef<HTMLDivElement>>;

  activeTab: 'guide' | 'praga' | 'bratislava' | 'budapest' = 'praga';
  imageIndex: Record<string, number> = {};

  private maps = new Map<string, mapboxgl.Map>();
  private markers = new Map<string, mapboxgl.Marker>();

  readonly tabs: { id: 'guide' | 'praga' | 'bratislava' | 'budapest'; name: string }[] = [
    { id: 'guide', name: 'Guía' },
    { id: 'praga', name: 'Praga' },
    { id: 'bratislava', name: 'Bratislava' },
    { id: 'budapest', name: 'Budapest' },
  ];

  readonly places: Record<'praga' | 'bratislava' | 'budapest', RestaurantPlace[]> = {
    praga: [
      {
        id: 'u-glaubicu',
        name: 'U Glaubiců',
        cityLabel: 'Praga · Malá Strana',
        type: 'Cocina checa · Cervecería histórica',
        rating: 4.6,
        description:
          'Taberna histórica junto a San Nicolás: sótano medieval, cerveza de tirador y platos checos (goulash, rodilla, knedlíky). Buena calidad-precio en zona turística.',
        details: [
          '€€ · ~15–25€/persona',
          'Malostranské nám. 266/5',
          '10:30 – 23:00',
        ],
        images: [
          { src: '/assets/budapest/recomendations/restaurants/glaubicu_pork.jpg', caption: 'Carnes asadas' },
          { src: '/assets/budapest/recomendations/restaurants/glaubicu_meat.jpg', caption: 'Platos bohemios' },
          { src: '/assets/budapest/recomendations/restaurants/glaubicu_steak.jpg', caption: 'Con cerveza de tirador' },
        ],
        googleMapsUrl: 'https://www.google.com/maps/place/U+Glaubic%C5%AF/@50.0876566,14.4035272,17z',
        address: 'Malostranské náměstí 266/5, Praha 1',
        longitude: 14.4035272,
        latitude: 50.0876566,
      },
      {
        id: 'cafe-louvre',
        name: 'Café Louvre',
        cityLabel: 'Praga · Národní',
        type: 'Gran café histórico · Cocina clásica',
        rating: 4.5,
        description:
          'Nuestra otra cena en Praga. Café desde 1902 en Národní: salones amplios, cocina clásica y postres. Conviene reservar.',
        details: [
          '€€–€€€ · menú del día y carta',
          'Národní 22, Praha 1',
          'L–V 08:00–23:30 · S–D 09:00–23:30',
        ],
        images: [
          { src: '/assets/budapest/recomendations/restaurants/louvre_risotto.png', caption: 'Risotto de remolacha' },
          { src: '/assets/budapest/recomendations/restaurants/louvre_tartar.png', caption: 'Steak tartare' },
          { src: '/assets/budapest/recomendations/restaurants/louvre_carne.png', caption: 'Carne braseada' },
          { src: '/assets/budapest/recomendations/restaurants/louvre_ambiente.png', caption: 'Ambiente' },
          { src: '/assets/budapest/recomendations/restaurants/louvre_mesa.png', caption: 'Mesa Café Louvre' },
        ],
        googleMapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+Louvre/@50.0820775,14.4186113,17z',
        websiteUrl: 'https://www.cafelouvre.cz/',
        address: 'Národní 22, 110 00 Praha 1',
        longitude: 14.4186113,
        latitude: 50.0820775,
      },
      {
        id: 'trdelnik',
        name: 'Chimney cake · Trdelník',
        cityLabel: 'Praga · Postre callejero',
        type: 'Postre típico',
        rating: 4.3,
        description:
          'El postre típico que probamos: masa enrollada, azúcar y canela. Turístico, pero rico recién hecho en puestos del casco.',
        details: [
          '€ · 3–6€',
          'Puestos del centro histórico',
          'Mejor caliente y recién hecho',
        ],
        images: [
          { src: '/assets/budapest/recomendations/restaurants/trdelnik.jpg', caption: 'Chimney cake / trdelník que probamos' },
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=trdelnik+Prague+Old+Town',
        address: 'Puestos en el casco histórico',
        longitude: 14.42076,
        latitude: 50.08652,
      },
    ],
    bratislava: [
      {
        id: 'koliba-kamzik',
        name: 'Koliba Kamzík · Michalská',
        cityLabel: 'Bratislava · Casco antiguo',
        type: 'Cocina eslovaca · Koliba',
        rating: 4.5,
        description:
          'Cena en Bratislava: koliba en Michalská con halušky, pierogi y carnes. Ambiente local en el casco.',
        details: [
          '€€ · ~13–25€',
          'Michalská 387/16',
          '11:00 – 23:00',
        ],
        images: [
          { src: '/assets/budapest/recomendations/restaurants/kamzik_food.jpg', caption: 'Cocina eslovaca' },
          { src: '/assets/budapest/recomendations/restaurants/kamzik_meat.jpg', caption: 'Carnes' },
          { src: '/assets/budapest/recomendations/restaurants/kamzik_platter.jpg', caption: 'Para compartir' },
        ],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Koliba+Kamz%C3%ADk+Michalsk%C3%A1+Bratislava',
        websiteUrl: 'https://michalska.kamzik.sk/en/',
        address: 'Michalská 387/16, Bratislava',
        longitude: 17.1067,
        latitude: 48.1439,
      },
    ],
    budapest: [
      {
        id: 'lanchid-sorozo',
        name: 'Lánchíd Söröző',
        cityLabel: 'Budapest · Buda',
        type: 'Pub húngaro · Cocina casera',
        rating: 4.5,
        description:
          'Pub en Fő u. 4 (cerca del Puente de las Cadenas). Paprikás csirke con nokedli, ambiente local y buen precio.',
        details: [
          '€€ · ~12–20€',
          'Fő u. 4, 1011 Budapest',
          'Paprikás / goulash con nokedli',
        ],
        images: [
          { src: '/assets/budapest/recomendations/restaurants/lanchid_paprikash.png', caption: 'Paprikás csirke' },
          { src: '/assets/budapest/recomendations/restaurants/lanchid_interior.png', caption: 'Interior del pub' },
        ],
        googleMapsUrl: 'https://www.google.com/maps/place/L%C3%A1nch%C3%ADd+S%C3%B6r%C3%B6z%C5%91/@47.4990008,19.0400478,17z',
        address: 'Fő u. 4, 1011 Budapest',
        longitude: 19.0400478,
        latitude: 47.4990008,
      },
    ],
  };

  ngAfterViewInit(): void {
    setTimeout(() => this.initVisibleMaps(), 120);
    this.placeMapEls?.changes.subscribe(() => {
      setTimeout(() => this.initVisibleMaps(), 80);
    });
  }

  ngOnDestroy(): void {
    this.destroyMaps();
  }

  selectTab(id: 'guide' | 'praga' | 'bratislava' | 'budapest'): void {
    if (this.activeTab === id) return;
    this.destroyMaps();
    this.activeTab = id;
    setTimeout(() => this.initVisibleMaps(), 100);
  }

  placesFor(city: string): RestaurantPlace[] {
    if (city === 'praga' || city === 'bratislava' || city === 'budapest') {
      return this.places[city];
    }
    return [];
  }

  currentImage(place: RestaurantPlace): { src: string; caption: string } {
    const i = this.imageIndex[place.id] ?? 0;
    return place.images[i] ?? place.images[0];
  }

  imageCounter(place: RestaurantPlace): string {
    return `${(this.imageIndex[place.id] ?? 0) + 1} / ${place.images.length}`;
  }

  changeImage(place: RestaurantPlace, direction: number): void {
    const cur = this.imageIndex[place.id] ?? 0;
    const next = cur + direction;
    if (next < 0 || next >= place.images.length) return;
    this.imageIndex = { ...this.imageIndex, [place.id]: next };
  }

  private initVisibleMaps(): void {
    if (this.activeTab === 'guide' || !applyMapboxPublicToken()) return;

    const list = this.placesFor(this.activeTab);
    const els = this.placeMapEls?.toArray() ?? [];

    list.forEach((place, index) => {
      const el = els[index]?.nativeElement;
      if (!el) return;

      const existing = this.maps.get(place.id);
      if (existing) {
        existing.resize();
        return;
      }

      const map = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [place.longitude, place.latitude],
        zoom: 15,
        interactive: true,
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        map.resize();
        const marker = new mapboxgl.Marker({ color: '#1a237e' })
          .setLngLat([place.longitude, place.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML(`<strong>${place.name}</strong>`))
          .addTo(map);
        this.markers.set(place.id, marker);
      });

      this.maps.set(place.id, map);
    });
  }

  private destroyMaps(): void {
    this.markers.forEach(m => m.remove());
    this.maps.forEach(m => m.remove());
    this.markers.clear();
    this.maps.clear();
  }
}

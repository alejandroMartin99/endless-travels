import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'restaurant-recomendations-component',
  templateUrl: './restaurant-recomendations.component.html',
  styleUrls: ['./restaurant-recomendations.component.css'],
})
export class RestaurantRecomendationsComponent  implements OnInit{

  panelOpenState = true;
  // Tabs disponibles
  tabs = [
    { id: 'general', name: 'General', active: true },
    { id: 'tokyo', name: 'Tokyo', active: false },
    { id: 'kyoto', name: 'Kyoto', active: false },
    { id: 'osaka', name: 'Osaka', active: false },
    { id: 'hirosima', name: 'Hiroshima', active: false },
    { id: 'nara', name: 'Nara', active: false },
  ];

  // Tab actualmente seleccionada
  activeTab: string = 'general';

  /**
   * Cambia la pestaña activa
   * @param tabId - Identificador de la pestaña a activar
   */
  openTab(tabId: string): void {
    // Desactivar todas las pestañas
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    }));
    
    // Actualizar pestaña activa
    this.activeTab = tabId;
  }

  /**
   * Comprueba si una pestaña está activa
   * @param tabId - Identificador de la pestaña a comprobar
   * @returns boolean indicando si la pestaña está activa
   */
  isTabActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }


  images = [
    {
      src: '/assets/japan/Recomendations/Comida/Ramen.JPG',
      alt: 'Ramen japonés',
      caption: 'Ramen - Una sopa de fideos acompañada de otros ingredientes como pollo, cerdo, ternera o vegetales. Incluye un huevo marinado cocido.'
    },
    {
      src: '/assets/japan/Recomendations/Comida/Sushi.JPG',
      alt: 'Sushi variado',
      caption: 'Sushi - Arroz con pescado crudo, marisco, mini-tortillas de huevo o verduras. Pueden ser en forma de nigiri, makis, uramaki, Inari ...'
    },
    {
      src: '/assets/japan/Recomendations/Comida/takoyaki.jpg',
      alt: 'Takoyaki',
      caption: 'Takoyaki - Buñuelo relleno de pulpo. Se cocina en una plancha especializada y se sirve con salsa, especias y katsuo-bushi.'
    },
    {
      src: '/assets/japan/Recomendations/Comida/Okonomiyaki.HEIC',
      alt: 'Okonomiyaki',
      caption: 'Okonomiyaki - La "pizza japonesa" con base de tortilla que se prepara sobre una plancha caliente. Incluye marisco y mucha verdura.'
    },
    {
      src: '/assets/japan/Recomendations/Comida/Tonkatsu.JPG',
      alt: 'Tempura y Tonkatsu',
      caption: 'Tempura y Tonkatsu - Todo tipo de cosas fritas, desde verduras, pollo cerdo. No se nota grasiento y se sirve con todo tipo de salsas.'
    },

    {
      src: '/assets/japan/Recomendations/Comida/Gyoza.JPG',
      alt: 'Gyoza',
      caption: 'Gyoza - Empanadillas cocidas y fritas rellenas de verduras y pollo o cerdo. Deliciosas y baratas.'
    },

    {
      src: '/assets/japan/Recomendations/Comida/Yakitori.JPG',
      alt: 'Yakitori',
      caption: 'Yakitori - Brochetas a la parrilla, generalmente de pollo y verduras, pero también puedes encontrarlas con mariscos o pescado.'
    }
    ,

    {
      src: '/assets/japan/Recomendations/Comida/Wagyu.HEIC',
      alt: 'Wagyu',
      caption: 'Wagyu - Carne de buey originaria de Japón, apreciada por su sabor, ternura y grasa veteada. Vale la pena probarla al menos una vez.'
    }
    
  ];

  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  
}
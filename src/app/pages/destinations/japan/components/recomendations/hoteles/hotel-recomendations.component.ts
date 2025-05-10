import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'hotel-recomendations-component',
  templateUrl: './hotel-recomendations.component.html',
  styleUrls: ['./hotel-recomendations.component.css'],
})
export class HotelRecomendationsComponent  implements OnInit{

  panelOpenState = true;
  // Tabs disponibles
  tabs = [
    { id: 'resumen', name: 'Resumen', active: true },
    { id: 'flight_night', name: 'Flight Night', active: false },
    { id: 'kyoto', name: 'Kyoto', active: false },
    { id: 'tokyo', name: 'Tokyo', active: false },
  ];

  // Tab actualmente seleccionada
  activeTab: string = 'resumen';

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

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
  }

  hotel1_Url: string =`https://www.booking.com/hotel/jp/chuan-qi-kingusukaihurontodong-ji-reihoteru.es.html?label=brave_nonbrand_organic_trigger_ef205286-b3e9-46b0-863b-817cac9a3b88_0&sid=5bf532fdc7db13af6869e23c0b013a12&aid=2405612&ucfs=1&arphpl=1&checkin=2025-08-04&checkout=2025-08-11&dest_id=-233143&dest_type=city&group_adults=4&req_adults=4&no_rooms=2&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=d7cd984526800534&srepoch=1746827712&all_sr_blocks=316945805_347606635_2_2_0%2C316945805_347606635_2_2_0&highlighted_blocks=316945805_347606635_2_2_0%2C316945805_347606635_2_2_0&matching_block_id=316945805_347606635_2_2_0&sr_pri_blocks=316945805_347606635_2_2_0__11175192%2C316945805_347606635_2_2_0__11175192&from=searchresults)`


  getSafeDescription(description: string): SafeHtml {
      // Reemplaza URLs con un enlace que muestra "Link" en lugar de la URL completa
      const linkifiedDescription = description.replace(
        /https?:\/\/[^\s]+/g, 
        (url) => `<a href="${url}" target="_blank">Link</a>`
      );
      return this.sanitizer.bypassSecurityTrustHtml(linkifiedDescription);
    }


    currentIndex = 0;

    images: string[] = [
      '/assets/japan/Recomendations/Comida/Ramen.JPG',
      '/assets/japan/Recomendations/Comida/Sushi.JPG',
      '/assets/japan/Recomendations/Comida/takoyaki.jpg',
      '/assets/japan/Recomendations/Comida/Okonomiyaki.HEIC',
      '/assets/japan/Recomendations/Comida/Tonkatsu.JPG',
      '/assets/japan/Recomendations/Comida/Gyoza.JPG',
      '/assets/japan/Recomendations/Comida/Yakitori.JPG',
      '/assets/japan/Recomendations/Comida/Wagyu.HEIC'  ]

    changeImage(delta: number): void {
      const newIndex = this.currentIndex + delta;
      if (newIndex >= 0 && newIndex < this.images.length) {
        this.currentIndex = newIndex;
      }
    }


  
}
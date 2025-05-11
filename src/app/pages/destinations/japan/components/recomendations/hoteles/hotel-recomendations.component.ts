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


  hotel2_Url: string =`https://www.booking.com/hotel/jp/tokyu-stay-kyoto-ryogaemachi-dori.es.html?aid=2405612&label=brave_nonbrand_organic_trigger_ef205286-b3e9-46b0-863b-817cac9a3b88_0&sid=5bf532fdc7db13af6869e23c0b013a12&checkin=2025-10-29&checkout=2025-11-05&dest_id=-235402&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1746977857&srpvid=3a596ddd594d04f7&type=total&ucfs=1&#no_availability_msg`

  hotel3_Url: string =`https://www.booking.com/searchresults.es.html?aid=2405612&label=brave_nonbrand_organic_trigger_ef205286-b3e9-46b0-863b-817cac9a3b88_0&highlighted_hotels=6663751&checkin=2025-10-29&redirected=1&city=-246227&hlrd=with_av&source=hotel&checkout=2025-11-05&keep_landing=1&sid=5bf532fdc7db13af6869e23c0b013a12`




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
      '/assets/japan/Recomendations/Hotel/Hotel1.png',
      '/assets/japan/Recomendations/Hotel/Hotel1_2.png',
      '/assets/japan/Recomendations/Hotel/Hotel1_3.png',
      '/assets/japan/Recomendations/Hotel/Hotel1_4.png',
    ]
    changeImage(delta: number): void {
      const newIndex = this.currentIndex + delta;
      if (newIndex >= 0 && newIndex < this.images.length) {
        this.currentIndex = newIndex;
      }
    }

    currentIndex_2 = 0;
    images_2: string[] = [
      '/assets/japan/Recomendations/Hotel/Hotel2_1.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_2.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_3.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_4.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_5.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_6.png',
      '/assets/japan/Recomendations/Hotel/Hotel2_7.png',
    ]

    changeImage_2(delta: number): void {
      const newIndex = this.currentIndex_2 + delta;
      if (newIndex >= 0 && newIndex < this.images_2.length) {
        this.currentIndex_2 = newIndex;
      }
    }


    currentIndex_3 = 0;
    images_3: string[] = [
      '/assets/japan/Recomendations/Hotel/Hotel3_1.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_2.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_3.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_4.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_5.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_6.png',
      '/assets/japan/Recomendations/Hotel/Hotel3_7.png',
    ]

    changeImage_3(delta: number): void {
      const newIndex = this.currentIndex_3 + delta;
      if (newIndex >= 0 && newIndex < this.images_3.length) {
        this.currentIndex_3 = newIndex;
      }
    }


  
}
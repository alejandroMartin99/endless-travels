import { Component } from '@angular/core';

@Component({
  selector: 'transport-recomendations-component',
  templateUrl: './transport-recomendations.component.html',
  styleUrls: ['./transport-recomendations.component.css'],
})
export class TransportRecomendationsComponent {

  panelOpenState = false;
  // Tabs disponibles
  tabs = [
    { id: 'general', name: 'General', active: true },
    { id: 'tokyo', name: 'Tokyo', active: false },
    { id: 'kyoto', name: 'Kyoto', active: false },
    { id: 'excursiones', name: 'Excursiones', active: false }
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



  // Propiedades para controlar el popup
  showImagePopup: boolean = false;
  popupImageSrc: string = '';
  popupImageAlt: string = '';
  popupImageTitle: string = '';
  popupImageDescription: string = '';
  
  /**
   * Abre el popup de imagen con la información proporcionada
   */
  openImagePopup(imageSrc: string, title: string, description?: string, alt?: string): void {
    this.popupImageSrc = imageSrc;
    this.popupImageTitle = title;
    this.popupImageDescription = description || '';
    this.popupImageAlt = alt || title;
    this.showImagePopup = true;
    
    // Bloquear scroll del body cuando el popup está abierto
    document.body.style.overflow = 'hidden';
  }
  
  /**
   * Cierra el popup de imagen
   */
  closeImagePopup(): void {
    this.showImagePopup = false;
    this.popupImageSrc = '';
    this.popupImageTitle = '';
    this.popupImageDescription = 'wedf';
    this.popupImageAlt = 'frew';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  

  
}
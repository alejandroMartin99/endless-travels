import { Component } from '@angular/core';

@Component({
  selector: 'japan-recomendations-component',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css'],
})
export class RecomendationsComponent {

  panelOpenState = true;
  // Tabs disponibles
  tabs = [
    { id: 'general', name: 'General', active: true },
    { id: 'tokyo', name: 'Tokyo', active: false },
    { id: 'kyoto', name: 'Kyoto', active: false }
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
}
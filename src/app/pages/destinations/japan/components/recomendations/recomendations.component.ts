import { Component } from '@angular/core';

@Component({
  selector: 'japan-recomendations-component',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css'],
})
export class RecomendationsComponent {

  // Tab actualmente seleccionada (transporte por defecto)
  activeTab: string = 'transport';

  /**
   * Selecciona un tab
   * @param tabId - ID del tab a seleccionar
   */
  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
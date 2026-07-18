import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'init-polonia-component',
  templateUrl: './init-polonia.component.html',
  styleUrls: ['./init-polonia.component.css'],
})
export class InitPoloniaComponent {
  @Output() goToItinerary = new EventEmitter<
    number | { tab: number; anchor?: string }
  >();

  goToItineraryTab(tabIndex: number): void {
    this.goToItinerary.emit(tabIndex);
  }

  readonly viaje = {
    duracionDias: 8,
    fechas: '26 abril – 3 mayo 2025',
    ciudades: 'Varsovia · Cracovia · Wrocław',
  };
}

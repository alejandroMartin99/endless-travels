import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'init-lisboasintra-component',
  templateUrl: './init-lisboasintra.component.html',
  styleUrls: ['./init-lisboasintra.component.css'],
})
export class InitLisboaSintraComponent {
  @Output() goToItinerary = new EventEmitter<
    number | { tab: number; anchor?: string }
  >();

  goToItineraryTab(tabIndex: number): void {
    this.goToItinerary.emit(tabIndex);
  }

  goToItinerarySection(): void {
    this.goToItinerary.emit({ tab: 2 });
  }

  readonly viaje = {
    duracionDias: 5,
    fechasRecomendadas:
      'Primavera o otoño: temperaturas suaves, menos calor en Lisboa y mejores luces en Sintra.',
  };
}

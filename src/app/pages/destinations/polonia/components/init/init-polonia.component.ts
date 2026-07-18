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

  goToItinerarySection(): void {
    this.goToItinerary.emit({ tab: 2 });
  }

  readonly viaje = {
    duracionDias: 8,
    fechasRecomendadas:
      'Primavera (abril-junio) u otoño (septiembre-octubre): temperaturas suaves, días largos y menos turistas en los grandes monumentos.',
  };
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'init-pragabudapest-component',
  templateUrl: './init-pragabudapest.component.html',
  styleUrls: ['./init-pragabudapest.component.css'],
})
export class InitPragabudapestComponent {
  @Output() goToItinerary = new EventEmitter<
    number | { tab: number; anchor?: string }
  >();

  goToItineraryTab(tabIndex: number): void {
    this.goToItinerary.emit(tabIndex);
  }

  /** Por ahora abre pestaña Itinerario; enlaces por ciudad cuando el día a día tenga anclas. */
  goToItinerarySection(): void {
    this.goToItinerary.emit({ tab: 2 });
  }

  readonly viaje = {
    duracionDias: 9,
    fechasRecomendadas:
      'Primavera (abril-junio) u otoño (septiembre-octubre): días largos y temperaturas agradables para caminar ciudades empedradas',
  };
}

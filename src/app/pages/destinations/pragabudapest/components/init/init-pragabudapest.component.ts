import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Output, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PragaFullMapDialogComponent } from '../itinerary/praga-full-map/praga-full-map-dialog.component';

@Component({
  selector: 'init-pragabudapest-component',
  templateUrl: './init-pragabudapest.component.html',
  styleUrls: ['./init-pragabudapest.component.css'],
})
export class InitPragabudapestComponent {
  @Output() goToItinerary = new EventEmitter<
    number | { tab: number; anchor?: string }
  >();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = inject(MatDialog);

  goToItineraryTab(tabIndex: number): void {
    this.goToItinerary.emit(tabIndex);
  }

  /** Por ahora abre pestaña Itinerario; enlaces por ciudad cuando el día a día tenga anclas. */
  goToItinerarySection(): void {
    this.goToItinerary.emit({ tab: 2 });
  }

  openFullMap(event?: Event): void {
    event?.stopPropagation();
    if (!isPlatformBrowser(this.platformId)) return;
    this.dialog.open(PragaFullMapDialogComponent, {
      panelClass: 'praga-full-map-panel',
      maxWidth: '98vw',
      width: '1360px',
      autoFocus: false,
    });
  }

  readonly viaje = {
    duracionDias: 9,
    fechasRecomendadas:
      'Primavera (abril-junio) u otoño (septiembre-octubre): días largos y temperaturas agradables para caminar ciudades empedradas',
  };
}

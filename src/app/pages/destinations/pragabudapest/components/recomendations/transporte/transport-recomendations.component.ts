import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'pragabudapest-transport-recomendations-component',
  templateUrl: './transport-recomendations.component.html',
  styleUrls: ['./transport-recomendations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportRecomendationsComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly cities = {
    praga: { lat: 50.0755, lng: 14.4378 },
    bratislava: { lat: 48.1486, lng: 17.1077 },
    budapest: { lat: 47.4979, lng: 19.0402 },
    osario: { lat: 49.96039308374713, lng: 15.288720505888634 },
  };

  /** URLs fijadas una sola vez — evita que el scroll recargue los iframes. */
  readonly trainMapIframeUrl: SafeResourceUrl;
  readonly busMapIframeUrl: SafeResourceUrl;
  readonly osarioMapIframeUrl: SafeResourceUrl;
  readonly trainMapDirectionsUrl: string;
  readonly busMapDirectionsUrl: string;
  readonly osarioMapDirectionsUrl: string;

  mapLoaded: Record<'train' | 'bus' | 'osario', boolean> = {
    train: false,
    bus: false,
    osario: false,
  };

  constructor(sanitizer: DomSanitizer) {
    const { praga, bratislava, budapest, osario } = this.cities;

    this.trainMapIframeUrl = sanitizer.bypassSecurityTrustResourceUrl(
      this.buildDirectionsEmbed(praga.lat, praga.lng, bratislava.lat, bratislava.lng, 3),
    );
    this.busMapIframeUrl = sanitizer.bypassSecurityTrustResourceUrl(
      this.buildDirectionsEmbed(bratislava.lat, bratislava.lng, budapest.lat, budapest.lng, 0),
    );
    this.osarioMapIframeUrl = sanitizer.bypassSecurityTrustResourceUrl(
      this.buildDirectionsEmbed(praga.lat, praga.lng, osario.lat, osario.lng, 0),
    );

    this.trainMapDirectionsUrl = this.buildDirectionsLink(
      praga.lat,
      praga.lng,
      bratislava.lat,
      bratislava.lng,
      3,
    );
    this.busMapDirectionsUrl = this.buildDirectionsLink(
      bratislava.lat,
      bratislava.lng,
      budapest.lat,
      budapest.lng,
      0,
    );
    this.osarioMapDirectionsUrl = this.buildDirectionsLink(
      praga.lat,
      praga.lng,
      osario.lat,
      osario.lng,
      0,
    );
  }

  onMapLoad(key: 'train' | 'bus' | 'osario'): void {
    if (this.mapLoaded[key]) return;
    this.mapLoaded = { ...this.mapLoaded, [key]: true };
    this.cdr.markForCheck();
  }

  private buildDirectionsEmbed(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number,
    travelMode: 0 | 3,
  ): string {
    const centerLat = (fromLat + toLat) / 2;
    const centerLng = (fromLng + toLng) / 2;
    return `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11647!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e${travelMode}!4m5!1s0x0%3A0x0!2sOrigen!3m2!1d${fromLat}!2d${fromLng}!4m5!1s0x0%3A0x0!2sDestino!3m2!1d${toLat}!2d${toLng}!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses`;
  }

  private buildDirectionsLink(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number,
    travelMode: 0 | 3,
  ): string {
    const centerLat = (fromLat + toLat) / 2;
    const centerLng = (fromLng + toLng) / 2;
    return `https://www.google.com/maps/dir/${fromLat},${fromLng}/${toLat},${toLng}/@${centerLat},${centerLng},8z/data=!3m1!4b1!4m2!4m1!3e${travelMode}`;
  }
}

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'pragabudapest-transport-recomendations-component',
  templateUrl: './transport-recomendations.component.html',
  styleUrls: ['./transport-recomendations.component.css'],
})
export class TransportRecomendationsComponent {
  
  // Coordenadas de las ciudades
  private cities = {
    praga: { lat: 50.0755, lng: 14.4378, name: 'Praga' },
    bratislava: { lat: 48.1486, lng: 17.1077, name: 'Bratislava' },
    budapest: { lat: 47.4979, lng: 19.0402, name: 'Budapest' },
    osario: { lat: 49.96039308374713, lng: 15.288720505888634, name: 'Osario de Sedlec' }
  };

  constructor(private sanitizer: DomSanitizer) {}

  // Mapa con ruta en tren: Praga - Bratislava
  get trainMapUrl(): SafeResourceUrl {
    const centerLat = (this.cities.praga.lat + this.cities.bratislava.lat) / 2;
    const centerLng = (this.cities.praga.lng + this.cities.bratislava.lng) / 2;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11647!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x470b939c0970798b%3A0x400af0f66140b90!2sPraga!3m2!1d${this.cities.praga.lat}!2d${this.cities.praga.lng}!4m5!1s0x476c893c12720001%3A0x400af0f66140b90!2sBratislava!3m2!1d${this.cities.bratislava.lat}!2d${this.cities.bratislava.lng}!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses`
    );
  }

  // Mapa con ruta en bus: Bratislava - Budapest
  get busMapUrl(): SafeResourceUrl {
    const centerLat = (this.cities.bratislava.lat + this.cities.budapest.lat) / 2;
    const centerLng = (this.cities.bratislava.lng + this.cities.budapest.lng) / 2;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11647!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x476c893c12720001%3A0x400af0f66140b90!2sBratislava!3m2!1d${this.cities.bratislava.lat}!2d${this.cities.bratislava.lng}!4m5!1s0x47491d588c5b5e0f%3A0x400af0f66140b90!2sBudapest!3m2!1d${this.cities.budapest.lat}!2d${this.cities.budapest.lng}!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses`
    );
  }

  // Mapa con ruta en coche: Praga - Osario de Sedlec
  get osarioMapUrl(): SafeResourceUrl {
    // Usar formato simple de Google Maps con direcciones
    // Formato: /dir/origin/destination
    const origin = encodeURIComponent('Praga, República Checa');
    const destination = encodeURIComponent('Osario de Sedlec, Kutná Hora, República Checa');
    
    // URL simple de Google Maps que funciona sin API key
    const url = `https://www.google.com/maps/dir/${origin}/${destination}/@${(this.cities.praga.lat + this.cities.osario.lat) / 2},${(this.cities.praga.lng + this.cities.osario.lng) / 2},10z/data=!3m1!4b1!4m2!4m1!3e0`;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

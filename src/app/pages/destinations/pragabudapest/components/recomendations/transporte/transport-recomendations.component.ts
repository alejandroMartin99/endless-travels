import { Component } from '@angular/core';

@Component({
  selector: 'pragabudapest-transport-recomendations-component',
  templateUrl: './transport-recomendations.component.html',
  styleUrls: ['./transport-recomendations.component.css'],
})
export class TransportRecomendationsComponent {
  
  activeCity: string = 'praga';

  cities = [
    { id: 'praga', name: 'Praga' },
    { id: 'bratislava', name: 'Bratislava' },
    { id: 'budapest', name: 'Budapest' }
  ];

  selectCity(cityId: string): void {
    this.activeCity = cityId;
  }
}


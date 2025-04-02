import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hotel-recomendations-component',
  templateUrl: './hotel-recomendations.component.html',
  styleUrls: ['./hotel-recomendations.component.css'],
})
export class HotelRecomendationsComponent  implements OnInit{

  panelOpenState = true;
  // Tabs disponibles
  
  constructor() { }

  ngOnInit(): void {
  }


  
}
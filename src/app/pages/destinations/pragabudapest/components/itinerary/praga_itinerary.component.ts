import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { day01Praga } from './days/Day01';

@Component({
  selector: 'PragaBudapest-itinerary-component',
  templateUrl: './praga_itinerary.component.html',
  styleUrls: ['./praga_itinerary.component.css'],
})
export class PragaItineraryComponent  implements OnChanges{

  @Input() currentTab!: number;

  ngOnChanges(changes: SimpleChanges) {
    const currentTabChange = changes['currentTab'];
    if (currentTabChange) {
      console.log('Tab activo desde Itinerary:', currentTabChange.currentValue);
    }
  }

  public day01Praga = day01Praga;



  
}
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'PragaBudapest-recomendations-component',
  templateUrl: './praga_recomendations.component.html',
  styleUrls: ['./praga_recomendations.component.css'],
})
export class PragaBudapestRecomendationsComponent  implements OnChanges{

  @Input() currentTab!: number;

  ngOnChanges(changes: SimpleChanges) {
    const currentTabChange = changes['currentTab'];
    if (currentTabChange) {
      console.log('Tab activo desde Itinerary:', currentTabChange.currentValue);
    }
  }

}
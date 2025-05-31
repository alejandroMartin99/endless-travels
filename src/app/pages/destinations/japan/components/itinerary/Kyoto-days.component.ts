import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'Kyoto-days-component',
  templateUrl: './Kyoto-days.components.html',
  styleUrls: ['./Kyoto-days.component.css'],
})
export class KyotoDaysComponent  implements OnChanges{

  @Input() currentTab!: number;

  ngOnChanges(changes: SimpleChanges) {
    const currentTabChange = changes['currentTab'];
    if (currentTabChange) {
      console.log('Tab activo desde Itinerary:', currentTabChange.currentValue);
    }
  }
  
}
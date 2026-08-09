import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { day01Lisboa } from './days/Day01';

@Component({
  selector: 'lisboa-itinerary-component',
  templateUrl: './lisboa_itinerary.component.html',
  styleUrls: ['./lisboa_itinerary.component.css'],
})
export class LisboaItineraryComponent implements OnChanges {
  @Input() currentTab!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTab']) {
      console.log('Tab activo desde Itinerary Lisboa:', changes['currentTab'].currentValue);
    }
  }

  public day01Lisboa = day01Lisboa;
}

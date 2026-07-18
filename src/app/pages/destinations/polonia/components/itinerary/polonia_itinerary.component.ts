import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { day01Polonia } from './days/Day01';
import { day02Polonia } from './days/Day02';
import { day03Polonia } from './days/Day03';
import { day04Polonia } from './days/Day04';
import { day05Polonia } from './days/Day05';
import { day06Polonia } from './days/Day06';
import { day07Polonia } from './days/Day07';
import { day08Polonia } from './days/Day08';

@Component({
  selector: 'polonia-itinerary-component',
  templateUrl: './polonia_itinerary.component.html',
  styleUrls: ['./polonia_itinerary.component.css'],
})
export class PoloniaItineraryComponent implements OnChanges {
  @Input() currentTab!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTab']) {
      console.log('Tab activo desde Itinerary Polonia:', changes['currentTab'].currentValue);
    }
  }

  public day01Polonia = day01Polonia;
  public day02Polonia = day02Polonia;
  public day03Polonia = day03Polonia;
  public day04Polonia = day04Polonia;
  public day05Polonia = day05Polonia;
  public day06Polonia = day06Polonia;
  public day07Polonia = day07Polonia;
  public day08Polonia = day08Polonia;
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { day01Praga } from './days/Day01';
import { day02Praga } from './days/Day02';
import { day03Praga } from './days/Day03';
import { day04Bratislava } from './days/Day04';
import { day05Budapest } from './days/Day05';
import { day06Budapest } from './days/Day06';
import { day07Budapest } from './days/Day07';
import { day08Budapest } from './days/Day08';
import { day09Budapest } from './days/Day09';

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
  public day02Praga = day02Praga;
  public day03Praga = day03Praga;
  public day04Bratislava = day04Bratislava;
  public day05Budapest = day05Budapest;
  public day06Budapest = day06Budapest;
  public day07Budapest = day07Budapest;
  public day08Budapest = day08Budapest;
  public day09Budapest = day09Budapest;

  



  
}
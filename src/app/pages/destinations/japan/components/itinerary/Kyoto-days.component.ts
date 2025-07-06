import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { day02Kyoto } from './Kioto/Day02';
import { day03Kyoto } from './Kioto/Day03';
import { day04Kyoto } from './Kioto/Day04';
import { day05Kyoto } from './Kioto/Day05';

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

  public day02Kyoto = day02Kyoto;
  public day03Kyoto = day03Kyoto;
  public day04Kyoto = day04Kyoto;
  public day05Kyoto = day05Kyoto;


  
}
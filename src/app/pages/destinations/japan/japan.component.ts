import { Component } from '@angular/core';

@Component({
  selector: 'app-japan',
  templateUrl: './japan.component.html',
  styleUrl: './japan.component.css'
})
export class JapanComponent {

  selectedTabIndex =2;

  changeTab(index: number) {
    this.selectedTabIndex = index;
    console.log(`Selected tab index: ${this.selectedTabIndex}`);
  }

  onTabChanged(index: number) {
  this.selectedTabIndex = index;
  console.log('Tab actual:', index);
  }

}

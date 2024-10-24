import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  sidebarItems = [
    {
      label: 'Asia',
      icon: 'place',
      subItems: [
        { label: 'Japón', url: './destinations/japan', icon: 'flag' },
      ]
    },
    {
      label: 'Europa',
      icon: 'place',
      subItems: [
        { label: 'Praga - Budapest', url: './destinations/pragabudapest', icon: 'flag' },
        { label: 'Copenhague', url: './destinations/copenhague', icon: 'flag' }
      ]
    }
  ];

  isSidenavClosed: boolean = true;
  onSidenavToggle(isOpened: boolean) {
    this.isSidenavClosed = !isOpened;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pragabudapest',
  templateUrl: './pragabudapest.component.html',
  styleUrl: './pragabudapest.component.css'
})
export class PragabudapestComponent implements OnInit {

  selectedTabIndex = 2;

  ngOnInit() {
    // Resetear scroll al inicio cuando se carga la página
    this.resetScrollToTop();
  }

  changeTab(index: number) {
    this.selectedTabIndex = index;
    console.log(`Selected tab index: ${this.selectedTabIndex}`);
  }

  onTabChanged(index: number) {
    this.selectedTabIndex = index;
    console.log('Tab actual:', index);
  }

  /**
   * Resetea el scroll al inicio de la página
   */
  private resetScrollToTop(): void {
    // Usar setTimeout para asegurar que el DOM se ha cargado completamente
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

}





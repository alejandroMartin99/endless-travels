import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'landing-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css'],
})
export class StyledButton{  // Cambia el nombre a Component
  constructor(private viewportScroller: ViewportScroller) {}

  // Método simplificado
  scrollTo(anchor: string): void {
  setTimeout(() => {
    this.viewportScroller.scrollToAnchor(anchor);
  }, 100); // Pequeño delay para contenido dinámico
}
}
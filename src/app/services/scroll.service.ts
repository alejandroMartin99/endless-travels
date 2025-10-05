import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPosition = 0;

  constructor(private router: Router) {
    this.setupRouteScrollReset();
  }

  private setupRouteScrollReset(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  scrollToElement(element: HTMLElement, offset: number = 0): void {
    if (typeof window !== 'undefined' && element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  saveScrollPosition(): void {
    if (typeof window !== 'undefined') {
      this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    }
  }

  restoreScrollPosition(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, this.scrollPosition);
    }
  }

  // Método específico para componentes móviles
  scrollToMobileContainer(element: HTMLElement): void {
    if (typeof window !== 'undefined' && element) {
      // Scroll suave al elemento, pero manteniendo la posición relativa
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Pequeño delay para asegurar que el scroll se complete
      setTimeout(() => {
        // Si el elemento está dentro de un contenedor con scroll, resetear su scroll interno
        const scrollContainer = element.closest('.mobile-scroll-container');
        if (scrollContainer) {
          scrollContainer.scrollTop = 0;
        }
      }, 300);
    }
  }

  // Método para resetear scroll de contenedores específicos
  resetContainerScroll(selector: string): void {
    if (typeof document !== 'undefined') {
      const containers = document.querySelectorAll(selector);
      containers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.scrollTop = 0;
        }
      });
    }
  }
}

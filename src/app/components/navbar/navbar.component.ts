import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDestinationsOpen = false;
  isMobileMenuOpen = false;
  isMobileDestinationsOpen = false;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private outsideClickHandler?: (event: MouseEvent) => void;

  @HostListener('window:resize', [])
  onWindowResize() {
    if (!this.isBrowser) return;
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    this.outsideClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown') && !target.closest('.mobile-dropdown')) {
        this.closeDropdowns();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser || !this.outsideClickHandler) return;
    document.removeEventListener('click', this.outsideClickHandler);
  }

  toggleDestinationsDropdown() {
    this.isDestinationsOpen = !this.isDestinationsOpen;
  }

  toggleMobileMenu() {
    if (!this.isBrowser) return;
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleMobileDestinations() {
    this.isMobileDestinationsOpen = !this.isMobileDestinationsOpen;
  }

  closeDropdowns() {
    this.isDestinationsOpen = false;
  }

  closeMobileMenu() {
    if (!this.isBrowser) return;
    this.isMobileMenuOpen = false;
    this.isMobileDestinationsOpen = false;
    document.body.style.overflow = '';
  }
}

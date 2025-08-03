import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isDestinationsOpen = false;
  isMobileMenuOpen = false;
  isMobileDestinationsOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  ngOnInit() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown') && !target.closest('.mobile-dropdown')) {
        this.closeDropdowns();
      }
    });
  }

  toggleDestinationsDropdown() {
    this.isDestinationsOpen = !this.isDestinationsOpen;
  }

  toggleMobileMenu() {
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
    this.isMobileMenuOpen = false;
    this.isMobileDestinationsOpen = false;
    document.body.style.overflow = '';
  }
}

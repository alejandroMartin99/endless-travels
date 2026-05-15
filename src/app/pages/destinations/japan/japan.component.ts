import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type JapanItineraryNavPayload = number | { tab: number; anchor?: string };

@Component({
  selector: 'app-japan',
  templateUrl: './japan.component.html',
  styleUrl: './japan.component.css',
})
export class JapanComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  selectedTabIndex = 0;
  /** Ancla / ciudad desde la pestaña Inicio al abrir Itinerario */
  itineraryFocusSlug: string | null = null;

  ngOnInit() {
    this.scrollMainToTop();
  }

  onTabChanged(index: number) {
    this.itineraryFocusSlug = null;
    this.selectedTabIndex = index;
    this.scrollMainToTop();
  }

  handleGoToItinerary(payload: JapanItineraryNavPayload) {
    if (typeof payload === 'number') {
      this.selectedTabIndex = payload;
      this.itineraryFocusSlug = null;
    } else {
      this.selectedTabIndex = payload.tab;
      this.itineraryFocusSlug = payload.anchor ?? null;
    }
    this.scrollMainToTop();
  }

  private scrollMainToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
}

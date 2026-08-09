import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type LisboaItineraryNavPayload = number | { tab: number; anchor?: string };

@Component({
  selector: 'app-lisboasintra',
  templateUrl: './lisboasintra.component.html',
  styleUrl: './lisboasintra.component.css',
})
export class LisboaSintraComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  selectedTabIndex = 0;
  itineraryFocusSlug: string | null = null;

  ngOnInit(): void {
    this.scrollMainToTop();
  }

  onTabChanged(index: number): void {
    this.itineraryFocusSlug = null;
    this.selectedTabIndex = index;
    this.scrollMainToTop();
  }

  handleGoToItinerary(payload: LisboaItineraryNavPayload): void {
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

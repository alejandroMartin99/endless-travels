import { Component, Input, OnChanges, SimpleChanges, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { day01Kyoto } from './Kioto/Day01';
import { day02Kyoto } from './Kioto/Day02';
import { day03Kyoto } from './Kioto/Day03';
import { day04Kyoto } from './Kioto/Day04';
import { day05Kyoto } from './Kioto/Day05';
import { day06Kyoto } from './Kioto/Day06';
import { day07Kyoto } from './Kioto/Day07';
import { day08Kyoto } from './Kioto/Day08';
import { day09Tokio } from './Tokio/Day09';
import { day10Tokio } from './Tokio/Day10';
import { day11Tokio } from './Tokio/Day11';
import { day12Tokio } from './Tokio/Day12';
import { day13Tokio } from './Tokio/Day13';
import { day14Tokio } from './Tokio/Day14';
import { day15Tokio } from './Tokio/Day15';

@Component({
  selector: 'Kyoto-days-component',
  templateUrl: './Kyoto-days.components.html',
  styleUrls: ['./Kyoto-days.component.css'],
})
export class KyotoDaysComponent implements OnChanges {
  @Input() currentTab!: number;
  /** Desde Inicio: ancla + panel a abrir en itinerario (tab 2). */
  @Input() focusSlug: string | null = null;

  private readonly platformId = inject(PLATFORM_ID);

  /** Coincide con `panelId` de cada `app-itinerary-day-card`. */
  activePanelId: string | null = null;

  private readonly slugToPanelId: Record<string, string> = {
    kyoto: 'panel-day02',
    tokyo: 'panel-day09',
    osaka: 'panel-day06',
    nara: 'panel-day07',
    hiroshima: 'panel-day08',
    miyajima: 'panel-day08',
    nikko: 'panel-day10',
    kamakura: 'panel-day11',
  };

  public day01Kyoto = day01Kyoto;
  public day02Kyoto = day02Kyoto;
  public day03Kyoto = day03Kyoto;
  public day04Kyoto = day04Kyoto;
  public day05Kyoto = day05Kyoto;
  public day06Kyoto = day06Kyoto;
  public day07Kyoto = day07Kyoto;
  public day08Kyoto = day08Kyoto;

  public day09Tokio = day09Tokio;
  public day10Tokio = day10Tokio;
  public day11Tokio = day11Tokio;
  public day12Tokio = day12Tokio;
  public day13Tokio = day13Tokio;
  public day14Tokio = day14Tokio;
  public day15Tokio = day15Tokio;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTab']) {
      console.log('Tab activo desde Itinerary:', changes['currentTab'].currentValue);
    }
    if (changes['focusSlug']) {
      this.applyFocus(this.focusSlug);
    }
  }

  private applyFocus(slug: string | null): void {
    if (!slug) {
      this.activePanelId = null;
      return;
    }
    if (slug === 'intro') {
      this.activePanelId = null;
      this.scheduleScroll('itinerary-anchor-intro');
      return;
    }
    this.activePanelId = this.slugToPanelId[slug] ?? null;
    const scrollAnchorId =
      slug === 'miyajima' ? 'itinerary-anchor-miyajima' : `itinerary-anchor-${slug}`;
    this.scheduleScroll(scrollAnchorId);
  }

  private scheduleScroll(elementId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 280);
  }
}

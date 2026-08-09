import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NorgeActivity } from '../data/norge-route';
import { DriveLegStats } from '../services/norge-directions.service';

@Component({
  selector: 'norge-day-itinerary',
  templateUrl: './norge-day-itinerary.component.html',
  styleUrls: ['./norge-day-itinerary.component.css'],
})
export class NorgeDayItineraryComponent implements OnChanges {
  @Input() activities: NorgeActivity[] = [];
  @Input() activityLegByFromId: Record<string, DriveLegStats> = {};
  @Input() durationFormatter: (min: number) => string = (m) => `${m} min`;
  @Input() stopId: string | null = null;
  @Input() stopName = '';
  @Input() stopDayLabel = '';
  @Input() stopSummary = '';
  @Input() stopImages: string[] = [];
  /** Índice controlado desde el padre (mapa / drawer). */
  @Input() selectedIndex: number | null = null;

  @Output() activityIndexChange = new EventEmitter<number>();

  currentActivityIndex = 0;
  currentImageIndex = 0;
  displayActivities: NorgeActivity[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['stopId'] ||
      changes['activities'] ||
      changes['stopName'] ||
      changes['stopSummary'] ||
      changes['stopImages'] ||
      changes['stopDayLabel'] ||
      changes['activityLegByFromId']
    ) {
      const keepIndex = !!changes['activityLegByFromId'] && !changes['stopId'] && !changes['activities'];
      const prevIndex = this.currentActivityIndex;
      this.rebuildDisplay();
      if (keepIndex && prevIndex < this.displayActivities.length) {
        this.currentActivityIndex = prevIndex;
      } else {
        this.currentActivityIndex = 0;
        this.currentImageIndex = 0;
        this.activityIndexChange.emit(0);
      }
    } else if (changes['selectedIndex'] && this.selectedIndex != null) {
      const idx = this.selectedIndex;
      if (idx !== this.currentActivityIndex && idx >= 0 && idx < this.displayActivities.length) {
        this.currentActivityIndex = idx;
        this.currentImageIndex = 0;
      }
    }
  }

  private rebuildDisplay(): void {
    const stages = this.activities
      .map((a, i) => {
        const title = `${i + 1}. ${this.shortTitle(a.name)}`;
        if (i === 0) return title;
        const prev = this.activities[i - 1];
        const leg = prev ? this.activityLegByFromId[prev.id] : null;
        if (!leg) return title;
        return `${title} <em>(${this.transportLabel(leg.mode)} · ${leg.distanceKm} km · ${this.durationFormatter(leg.durationMin)})</em>`;
      })
      .join(' · ');
    const resumen: NorgeActivity = {
      id: `${this.stopId ?? 'stop'}-resumen`,
      name: 'Resumen',
      description:
        `<p><strong>${this.stopName}</strong>${this.stopDayLabel ? ` · ${this.stopDayLabel}` : ''}</p>` +
        `<p>${this.stopSummary || ''}</p>` +
        (stages
          ? `<p><strong>Etapas del día:</strong> ${stages}.</p>` +
            `<p>Cada etapa indica el medio y la distancia/tiempo del tramo que llega a ella. ` +
            `Usa Anterior / Siguiente para abrir el detalle con fotos.</p>`
          : ''),
      images: this.stopImages?.length ? this.stopImages : [],
    };
    this.displayActivities = [resumen, ...this.activities.map(a => ({
      ...a,
      name: this.shortTitle(a.name),
    }))];
  }

  get current(): NorgeActivity | null {
    return this.displayActivities[this.currentActivityIndex] ?? null;
  }

  get images(): string[] {
    return this.current?.images?.length ? this.current.images : [];
  }

  /** Índice en activities reales (-1 = resumen). */
  get realActivityIndex(): number {
    return this.currentActivityIndex - 1;
  }

  get inboundLeg(): DriveLegStats | null {
    const real = this.realActivityIndex;
    if (real <= 0) return null;
    const prev = this.activities[real - 1];
    if (!prev) return null;
    return this.activityLegByFromId[prev.id] ?? null;
  }

  get inboundLegLabel(): string | null {
    const leg = this.inboundLeg;
    if (!leg) return null;
    return `${leg.distanceKm} km · ${this.durationFormatter(leg.durationMin)}`;
  }

  transportIcon(mode: string | undefined): string {
    switch (mode) {
      case 'boat':
        return 'directions_boat';
      case 'bus':
        return 'directions_bus';
      case 'train':
        return 'train';
      case 'lodging':
        return 'cottage';
      default:
        return 'directions_car';
    }
  }

  transportLabel(mode: string | undefined): string {
    switch (mode) {
      case 'boat':
        return 'Barco';
      case 'bus':
        return 'Bus';
      case 'train':
        return 'Tren';
      case 'lodging':
        return 'Alojamiento';
      default:
        return 'Coche';
    }
  }

  shortTitle(name: string): string {
    const cut = name.indexOf(' (');
    return cut > 0 ? name.slice(0, cut) : name;
  }

  selectActivity(index: number): void {
    if (index < 0 || index >= this.displayActivities.length) return;
    this.currentActivityIndex = index;
    this.currentImageIndex = 0;
    this.activityIndexChange.emit(index);
  }

  changeActivity(delta: number): void {
    this.selectActivity(this.currentActivityIndex + delta);
  }

  changeImage(delta: number): void {
    const next = this.currentImageIndex + delta;
    if (next < 0 || next >= this.images.length) return;
    this.currentImageIndex = next;
  }
}

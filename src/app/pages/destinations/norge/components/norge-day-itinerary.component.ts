import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  lightboxOpen = false;
  lightboxIndex = 0;

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
    const lead = this.stopSummary
      ? `<div class="day-resumen-lead">${this.stopSummary}</div>`
      : '';

    if (!this.activities.length) {
      this.displayActivities = [
        {
          id: `${this.stopId ?? 'stop'}-resumen`,
          name: 'Resumen',
          description: lead,
          images: this.stopImages ?? [],
        },
      ];
      return;
    }

    // Fusiona el resumen del día con la primera actividad (salida): un único ítem/marcador.
    const first = this.activities[0];
    const merged: NorgeActivity = {
      ...first,
      name: this.shortTitle(first.name),
      description: lead + (first.description ?? ''),
      images: [...(this.stopImages ?? []), ...(first.images ?? [])],
    };

    this.displayActivities = [
      merged,
      ...this.activities.slice(1).map(a => ({
        ...a,
        name: this.shortTitle(a.name),
      })),
    ];
  }

  get current(): NorgeActivity | null {
    return this.displayActivities[this.currentActivityIndex] ?? null;
  }

  /** Título del encabezado: en el resumen usa el nombre del día (no "Resumen"). */
  get headerTitle(): string {
    if (this.currentActivityIndex === 0) return this.stopName;
    return this.shortTitle(this.current?.name ?? '');
  }

  get images(): string[] {
    return this.current?.images?.length ? this.current.images : [];
  }

  /** Imágenes que se muestran en el mosaico (máx. 4). */
  get galleryImages(): string[] {
    return this.images.slice(0, 4);
  }

  /** Nº de imágenes ocultas más allá de las 4 visibles. */
  get galleryExtra(): number {
    return Math.max(0, this.images.length - 4);
  }

  /** Clase de layout del mosaico según el nº de imágenes visibles. */
  get galleryLayout(): string {
    return `gallery-${Math.min(this.galleryImages.length, 4)}`;
  }

  /** Índice en activities reales (0 = salida/resumen fusionados). */
  get realActivityIndex(): number {
    return this.currentActivityIndex;
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

  openLightbox(index: number): void {
    if (!this.images.length) return;
    this.lightboxIndex = Math.min(Math.max(index, 0), this.images.length - 1);
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  lightboxStep(delta: number): void {
    const total = this.images.length;
    if (!total) return;
    this.lightboxIndex = (this.lightboxIndex + delta + total) % total;
  }

  @HostListener('document:keydown', ['$event'])
  onLightboxKey(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    else if (event.key === 'ArrowRight') this.lightboxStep(1);
    else if (event.key === 'ArrowLeft') this.lightboxStep(-1);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  NorgeCost,
  NorgeStop,
  NorgeStopLegView,
  NorgeTip,
} from '../data/norge-route';
import { DriveLegStats } from '../services/norge-directions.service';

export type NorgeDrawerTab = 'ruta' | 'tips' | 'costes';

@Component({
  selector: 'norge-drawer',
  templateUrl: './norge-drawer.component.html',
  styleUrls: ['./norge-drawer.component.css'],
})
export class NorgeDrawerComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() stops: NorgeStop[] = [];
  @Input() tips: NorgeTip[] = [];
  @Input() costs: NorgeCost[] = [];
  @Input() selectedStopId: string | null = null;
  @Input() tab: NorgeDrawerTab = 'ruta';
  @Input() collapsed = false;

  @Input() stopLegs: NorgeStopLegView[] = [];
  @Input() totalDistanceKm: number | null = null;
  @Input() totalDurationLabel = '';
  @Input() routeLoading = false;
  @Input() routeError = false;
  @Input() activityLegs: DriveLegStats[] = [];
  @Input() activityLegByFromId: Record<string, DriveLegStats> = {};
  @Input() activityLegsLoading = false;
  @Input() durationFormatter: (min: number) => string = (m) => `${m} min`;
  @Input() selectedActivityIndex = 0;

  @Output() tabChange = new EventEmitter<NorgeDrawerTab>();
  @Output() stopSelected = new EventEmitter<string>();
  @Output() activitySelected = new EventEmitter<number>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  get selectedStop(): NorgeStop | null {
    return this.stops.find(s => s.id === this.selectedStopId) ?? null;
  }

  legAfterStop(stopId: string): NorgeStopLegView | undefined {
    return this.stopLegs.find(l => l.fromStopId === stopId);
  }

  setTab(t: NorgeDrawerTab): void {
    this.tabChange.emit(t);
  }

  selectStop(id: string): void {
    this.stopSelected.emit(id);
    if (this.tab !== 'ruta') {
      this.tabChange.emit('ruta');
    }
  }

  onActivityIndex(i: number): void {
    this.activitySelected.emit(i);
  }

  toggleCollapsed(): void {
    this.collapsedChange.emit(!this.collapsed);
  }
}

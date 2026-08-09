import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  NorgeCost,
  NorgeStop,
  NorgeStopLegView,
  NorgeTip,
} from '../data/norge-route';
import { DriveLegStats } from '../services/norge-directions.service';

export type NorgeDrawerTab = 'ruta' | 'tips' | 'costes';

export interface NorgeCostCategoryBar {
  category: string;
  amount: number;
  pct: number;
  color: string;
}

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

  private readonly categoryColors: Record<string, string> = {
    Transporte: '#1565c0',
    Alojamiento: '#2e7d32',
    Comida: '#ef6c00',
    Varios: '#6a1b9a',
  };

  get selectedStop(): NorgeStop | null {
    return this.stops.find(s => s.id === this.selectedStopId) ?? null;
  }

  /** Total real (excluye reembolsos). */
  get costTotal(): number {
    return this.costCategoryBars.reduce((s, c) => s + c.amount, 0);
  }

  get costCategoryBars(): NorgeCostCategoryBar[] {
    const map = new Map<string, number>();
    for (const c of this.costs) {
      const n = this.parseCostAmount(c.amountHint);
      if (n == null) continue;
      map.set(c.category, (map.get(c.category) ?? 0) + n);
    }
    const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
    return [...map.entries()]
      .map(([category, amount]) => ({
        category,
        amount,
        pct: Math.round((amount / total) * 1000) / 10,
        color: this.categoryColors[category] ?? '#546e7a',
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  /** Segmentos del donut (stroke-dasharray). */
  get costDonutSegments(): Array<NorgeCostCategoryBar & { dash: string; offset: number }> {
    const r = 42;
    const c = 2 * Math.PI * r;
    let offset = 0;
    return this.costCategoryBars.map(bar => {
      const len = (bar.amount / (this.costTotal || 1)) * c;
      const seg = {
        ...bar,
        dash: `${len} ${c - len}`,
        offset: -offset,
      };
      offset += len;
      return seg;
    });
  }

  formatEuro(n: number): string {
    return (
      '€ ' +
      n.toLocaleString('es-ES', {
        minimumFractionDigits: n % 1 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  }

  /** Parsea "€ 12,50" / "€ 82". Null si no hay cifra o es reembolso. */
  parseCostAmount(hint: string): number | null {
    if (!hint || /reembols/i.test(hint) || /^\s*[—–-]/.test(hint)) return null;
    const m = hint.match(/([\d]+(?:[.,]\d+)?)/);
    if (!m) return null;
    const n = parseFloat(m[1].replace(',', '.'));
    return Number.isFinite(n) ? n : null;
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

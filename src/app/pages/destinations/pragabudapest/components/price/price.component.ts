import { Component, OnInit } from '@angular/core';
import {
  PragaBudapestTransactionsService,
  Transaction,
} from './transactions.service';

@Component({
  selector: 'pragabudapest-price-component',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PragaBudapestPriceComponent implements OnInit {
  readonly persons = 2;
  transactions: Transaction[] = [];
  categoryTotals: { [key: string]: number } = {};
  grandTotal = 0;
  flightsTotal = 0;
  accommodationTotal = 0;
  spentInDestination = 0;
  pieGradient = '';

  private readonly categoryIcons: { [key: string]: string } = {
    Transporte: '🚌',
    Alojamiento: '🏨',
    Comida: '🍽️',
    Actividades: '🎟️',
    Compras: '🛍️',
    Efectivo: '💵',
  };

  readonly categoryOrder = [
    'Transporte',
    'Alojamiento',
    'Comida',
    'Actividades',
    'Compras',
    'Efectivo',
  ];

  private readonly categoryColors: { [key: string]: string } = {
    Transporte: '#1a237e',
    Alojamiento: '#3949ab',
    Comida: '#e67e22',
    Actividades: '#00897b',
    Compras: '#8e24aa',
    Efectivo: '#546e7a',
  };

  constructor(private transactionsService: PragaBudapestTransactionsService) {}

  ngOnInit(): void {
    const divisor = this.persons;
    this.transactions = this.transactionsService.getAllTransactions().map((t) => ({
      ...t,
      amount: Math.round((t.amount / divisor) * 100) / 100,
    }));

    const rawTotals = this.transactionsService.getCategoryTotals();
    this.categoryTotals = Object.fromEntries(
      Object.entries(rawTotals).map(([k, v]) => [
        k,
        Math.round((v / divisor) * 100) / 100,
      ])
    );

    this.grandTotal =
      Math.round((this.transactionsService.getGrandTotal() / divisor) * 100) / 100;
    this.flightsTotal = Math.round((425 / divisor) * 100) / 100;
    this.accommodationTotal = this.categoryTotals['Alojamiento'] || 0;
    this.spentInDestination =
      Math.round((this.grandTotal - this.flightsTotal) * 100) / 100;
    this.buildPieGradient();
  }

  get orderedCategories(): string[] {
    return this.categoryOrder.filter((c) => this.categoryTotals[c] != null);
  }

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || '📦';
  }

  getCategoryClass(category: string): string {
    const classes: { [key: string]: string } = {
      Transporte: 'transport',
      Alojamiento: 'accommodation',
      Comida: 'food',
      Actividades: 'entertainment',
      Compras: 'shopping',
      Efectivo: 'cash',
    };
    return classes[category] || 'entertainment';
  }

  getCategoryColor(category: string): string {
    return this.categoryColors[category] || '#999';
  }

  getCategoryPercent(category: string): string {
    if (!this.grandTotal) return '0';
    return ((this.categoryTotals[category] / this.grandTotal) * 100).toFixed(1);
  }

  formatEur(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }

  private buildPieGradient(): void {
    let cursor = 0;
    const parts: string[] = [];

    for (const cat of this.orderedCategories) {
      const value = this.categoryTotals[cat] || 0;
      const pct = (value / this.grandTotal) * 100;
      const start = cursor;
      const end = cursor + pct;
      parts.push(
        `${this.categoryColors[cat]} ${start.toFixed(2)}% ${end.toFixed(2)}%`
      );
      cursor = end;
    }

    this.pieGradient = `conic-gradient(${parts.join(', ')})`;
  }
}

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

export interface Transaction {
  date: string;
  merchant: string;
  category: string;
  amount: number;
}

export interface CategoryTotal {
  [key: string]: number;
}

export interface BudgetSummary {
  total: number;
  flights: number;
  jrPass: number;
  spentInDestination: number;
  available: number;
}

@Component({
  selector: 'japan-price-component',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class JapanPriceComponent implements OnInit, AfterViewInit {
  @ViewChild('mainChart', { static: false }) mainChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('budgetChart', { static: false }) budgetChartRef!: ElementRef<HTMLCanvasElement>;

  // Propiedades del componente
  budgetSummary: BudgetSummary = {
    total: 1414,
    flights: 800,
    jrPass: 314,
    spentInDestination: 300,
    available: 0
  };

  transactions: Transaction[] = [
    { date: '2023-10-29', merchant: 'Jr-East', category: 'Transporte', amount: -3.82 },
    { date: '2023-10-29', merchant: 'Jr-East', category: 'Transporte', amount: -3.82 },
    { date: '2023-10-29', merchant: 'Jr-East', category: 'Transporte', amount: -8.49 },
    { date: '2023-10-29', merchant: 'Jr-East', category: 'Transporte', amount: -8.98 },
    { date: '2023-10-29', merchant: 'Menshotakamatsu Honten', category: 'Comida', amount: -10.90 },
    { date: '2023-10-30', merchant: 'Starbucks', category: 'Comida', amount: -7.87 },
    { date: '2023-11-03', merchant: 'Reward', category: 'Recompensa', amount: 5.00 },
    { date: '2023-11-03', merchant: 'Uber', category: 'Transporte', amount: -8.15 },
    { date: '2023-11-01', merchant: 'Kyoto Tower Sando', category: 'Entretenimiento', amount: -8.04 },
    { date: '2023-11-02', merchant: 'Uber', category: 'Transporte', amount: -15.03 },
    { date: '2023-11-02', merchant: 'Super Kids Land Joshin', category: 'Entretenimiento', amount: -16.41 },
    { date: '2023-11-02', merchant: 'Bic Camera Shinjuku West Exit', category: 'Compras', amount: -9.43 },
    { date: '2023-11-03', merchant: 'Kyoto Tower Sando', category: 'Entretenimiento', amount: -7.76 },
    { date: '2023-11-03', merchant: 'Kyoto Tower Sando', category: 'Entretenimiento', amount: -14.41 },
    { date: '2023-11-03', merchant: 'Kyoto Tower Sando', category: 'Entretenimiento', amount: -4.76 },
    { date: '2023-11-06', merchant: 'Jr-East', category: 'Transporte', amount: -13.02 },
    { date: '2023-11-07', merchant: 'JR-EAST', category: 'Transporte', amount: -7.07 },
    { date: '2023-11-08', merchant: 'Susizanmai Uenoten', category: 'Comida', amount: -40.50 },
    { date: '2023-11-08', merchant: 'Astop Radio Store', category: 'Compras', amount: -33.77 },
    { date: '2023-11-08', merchant: 'MANDARAKE', category: 'Compras', amount: -2.74 },
    { date: '2023-11-08', merchant: 'MANDARAKE', category: 'Compras', amount: -3.09 },
    { date: '2023-11-07', merchant: 'FamilyMart', category: 'Comida', amount: -13.78 },
    { date: '2023-11-08', merchant: 'Animate Akihabara', category: 'Entretenimiento', amount: -23.80 },
    { date: '2023-11-08', merchant: 'Yamayashouten', category: 'Comida', amount: -25.65 },
    { date: '2023-11-09', merchant: 'Mega Don Quijote', category: 'Compras', amount: -25.87 },
    { date: '2023-11-09', merchant: 'Blacows', category: 'Comida', amount: -50.82 },
    { date: '2023-11-09', merchant: 'Ishibashigatsuki Shibuyat', category: 'Comida', amount: -25.63 },
    { date: '2023-11-09', merchant: 'McDonald\'s', category: 'Comida', amount: -3.66 },
    { date: '2023-11-10', merchant: 'UNIQLO', category: 'Compras', amount: -126.44 },
    { date: '2023-11-10', merchant: 'McDonald\'s', category: 'Comida', amount: -4.10 },
    { date: '2023-11-10', merchant: 'McDonald\'s', category: 'Comida', amount: -11.05 },
    { date: '2023-11-11', merchant: 'Animate Ikebukuro', category: 'Entretenimiento', amount: -10.22 },
    { date: '2023-11-11', merchant: 'A Happypancake Ikebukur', category: 'Comida', amount: -26.12 },
    { date: '2023-11-11', merchant: 'Jr-East', category: 'Transporte', amount: -15.88 },
    { date: '2023-11-11', merchant: 'FamilyMart', category: 'Comida', amount: -1.46 },
    { date: '2023-11-12', merchant: 'Haneda Airport Terminal', category: 'Transporte', amount: -18.08 },
    { date: '2023-11-13', merchant: 'KFC', category: 'Comida', amount: -26.52 },
    { date: '2023-11-13', merchant: 'KFC', category: 'Comida', amount: -12.11 },
    { date: '2023-11-13', merchant: 'Burger King', category: 'Comida', amount: -27.83 },
    { date: '2023-11-12', merchant: 'McDonald\'s', category: 'Comida', amount: -4.34 }
  ];

  categoryTotals: CategoryTotal = {};
  dailyTotals: { [key: string]: number } = {};
  currentChartType: string = 'overview';
  
  // Referencias a los gráficos
  private mainChart: Chart | null = null;
  private budgetChart: Chart | null = null;

  // Configuraciones de colores y estilos
  private readonly categoryColors: { [key: string]: string } = {
    'Transporte': '#3498db',
    'Comida': '#e67e22',
    'Compras': '#9b59b6',
    'Entretenimiento': '#f39c12',
    'Recompensa': '#27ae60'
  };

  private readonly categoryIcons: { [key: string]: string } = {
    'Transporte': '🚅',
    'Comida': '🍜',
    'Compras': '🛍️',
    'Entretenimiento': '🎮',
    'Recompensa': '🎁'
  };

  constructor() {}

  ngOnInit(): void {
    this.calculateTotals();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.mainChart) {
      this.mainChart.destroy();
    }
    if (this.budgetChart) {
      this.budgetChart.destroy();
    }
  }

  private calculateTotals(): void {
    // Calcular totales por categoría
    this.categoryTotals = this.transactions.reduce((acc: CategoryTotal, transaction) => {
      if (transaction.category !== 'Recompensa' && transaction.amount < 0) {
        acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {});

    // Calcular totales por día
    this.dailyTotals = this.transactions.reduce((acc: { [key: string]: number }, transaction) => {
      if (transaction.amount < 0) {
        acc[transaction.date] = (acc[transaction.date] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {});
  }

  private initializeCharts(): void {
    if (this.mainChartRef && this.budgetChartRef) {
      this.showChart('overview');
      this.updateBudgetChart();
    }
  }

  showChart(type: string): void {
    this.currentChartType = type;
    
    if (!this.mainChartRef?.nativeElement) return;

    const ctx = this.mainChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.mainChart) {
      this.mainChart.destroy();
    }

    switch (type) {
      case 'overview':
        this.showOverviewChart(ctx);
        break;
      case 'categories':
        this.showCategoriesChart(ctx);
        break;
      case 'daily':
        this.showDailyChart(ctx);
        break;
      case 'comparison':
        this.showComparisonChart(ctx);
        break;
    }
  }

  private showOverviewChart(ctx: CanvasRenderingContext2D): void {
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Vuelos', 'JR Pass', 'Gastos en Destino', 'Disponible'],
        datasets: [{
          data: [
            this.budgetSummary.flights,
            this.budgetSummary.jrPass,
            this.budgetSummary.spentInDestination,
            this.budgetSummary.available
          ],
          backgroundColor: ['#e74c3c', '#3498db', '#f39c12', '#95a5a6'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    this.mainChart = new Chart(ctx, config);
  }

  private showCategoriesChart(ctx: CanvasRenderingContext2D): void {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: Object.keys(this.categoryTotals),
        datasets: [{
          label: 'Gastos por Categoría (€)',
          data: Object.values(this.categoryTotals),
          backgroundColor: Object.keys(this.categoryTotals).map(category => this.categoryColors[category]),
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.mainChart = new Chart(ctx, config);
  }

  private showDailyChart(ctx: CanvasRenderingContext2D): void {
    const sortedDates = Object.keys(this.dailyTotals).sort();
    const dailyAmounts = sortedDates.map(date => this.dailyTotals[date]);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: sortedDates.map(date => new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })),
        datasets: [{
          label: 'Gastos Diarios (€)',
          data: dailyAmounts,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.mainChart = new Chart(ctx, config);
  }

  private showComparisonChart(ctx: CanvasRenderingContext2D): void {
    const config: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: ['Transporte', 'Comida', 'Compras', 'Entretenimiento'],
        datasets: [{
          label: 'Presupuesto Planificado',
          data: [80, 60, 40, 30],
          borderColor: '#95a5a6',
          backgroundColor: 'rgba(149, 165, 166, 0.2)'
        }, {
          label: 'Gasto Real',
          data: [
            this.categoryTotals['Transporte'] || 0,
            this.categoryTotals['Comida'] || 0,
            this.categoryTotals['Compras'] || 0,
            this.categoryTotals['Entretenimiento'] || 0
          ],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    };

    this.mainChart = new Chart(ctx, config);
  }

  private updateBudgetChart(): void {
    if (!this.budgetChartRef?.nativeElement) return;

    const ctx = this.budgetChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.budgetChart) {
      this.budgetChart.destroy();
    }

    let runningBalance = 600; // Dinero inicial llevado
    const dailyBalance: number[] = [];
    const dates: string[] = [];

    // Procesar transacciones cronológicamente
    const sortedTransactions = [...this.transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    sortedTransactions.forEach((transaction, index) => {
      if (transaction.amount < 0) {
        runningBalance += transaction.amount;
      }
      if (index % 3 === 0 || index === sortedTransactions.length - 1) {
        dailyBalance.push(runningBalance);
        dates.push(new Date(transaction.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
      }
    });

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Saldo Disponible (€)',
          data: dailyBalance,
          borderColor: runningBalance > 0 ? '#27ae60' : '#e74c3c',
          backgroundColor: runningBalance > 0 ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.budgetChart = new Chart(ctx, config);
  }

  // Métodos auxiliares para el template
  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || '📦';
  }

  getCategoryClass(category: string): string {
    const classes: { [key: string]: string } = {
      'Transporte': 'transport',
      'Comida': 'food',
      'Compras': 'shopping',
      'Entretenimiento': 'entertainment',
      'Recompensa': 'positive'
    };
    return classes[category] || 'entertainment';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  formatAmount(amount: number): string {
    return `€${amount.toFixed(2)}`;
  }

  isActiveFilter(filterType: string): boolean {
    return this.currentChartType === filterType;
  }

  getTotalByCategory(category: string): number {
    return this.categoryTotals[category] || 0;
  }

  getRewardTotal(): number {
    return this.transactions
      .filter(t => t.category === 'Recompensa' && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }
}
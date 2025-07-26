import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { BaseChartDirective } from 'ng2-charts';

export interface CategoryTotal {
  [key: string]: number;
}
interface Transaction {
    date: string;
    merchant: string;
    category: string;
    amount: number;
}

export interface BudgetSummary {
  total: number;
  flights: number;
  jrPass: number;
  spentInDestination: number;
}

interface Transaction {
  date: string;
  merchant: string;
  category: string;
  amount: number;
}

@Component({
  selector: 'japan-price-component',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class JapanPriceComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  budgetSummary: BudgetSummary = {
    total: 1414,
    flights: 800,
    jrPass: 314,
    spentInDestination: 300,
  };
  
  transactions: Transaction[] = [];
  dailyTotals: { [key: string]: number } = {};
  currentChartType: string = 'overview';
  
  private readonly categoryIcons: { [key: string]: string } = {
    'Transporte': '🚅',
    'Comida': '🍜',
    'Compras': '🛍️',
    'Entretenimiento': '🎮',
    'Recompensa': '🎁'
  };
  
  // Definición inicial del gráfico
  chartData: any = {
    labels: ['Comida', 'Transporte', 'Alojamiento', 'Entradas', 'Otros'], // Tus labels
    datasets: [
      {
        label: 'Coste estimado en €',
        data: [375, 1200, 560, 70, 100], // Tus datos iniciales o los que quieras mostrar
        backgroundColor: [
          '#1a237e',
          '#1a237e',
          '#1a237e',
          '#1a237e',
          '#1a237e',
        ],
      },
    ],
  };
  
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categoría',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Coste en €',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactions = this.transactionsService.getAllTransactions();

    // Crear datos aleatorios para la gráfica
   
  }

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
}

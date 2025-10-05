import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'dinero-recomendations-component',
  templateUrl: './dinero-recomendations.component.html',
  styleUrls: ['./dinero-recomendations.component.css'],
})
export class DineroRecomendationsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  panelOpenState = true;

  chartData: any = {
    labels: [],
    datasets: [
      {
        label: '1 EUR a JPY',
        data: [],
        borderColor: '#1a237e', // Color Material
        pointBackgroundColor: '#1a237e',
        pointRadius: 4,
        fill: false,
        tension: 0.3,
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
          text: 'Fecha',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'JPY',
        },
        ticks: {
          stepSize: 2,
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Cargar datos inmediatamente
    this.loadChartData();
    // Intentar cargar datos reales en segundo plano
    this.fetchExchangeRates();
  }

  loadChartData(): void {
    // Datos de ejemplo basados en la tendencia real del yen
    const sampleData = {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: '1 EUR a JPY',
          data: [120, 125, 130, 140, 155, 160],
          borderColor: '#1a237e',
          pointBackgroundColor: '#1a237e',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.3,
          borderWidth: 3,
        },
      ],
    };

    this.chartData = sampleData;
  }

  fetchExchangeRates(): void {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 365 * 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=EUR&to=JPY`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        const rates = response.rates;

        if (!rates || Object.keys(rates).length === 0) {
          console.log('No se recibieron datos de la API, usando datos de ejemplo');
          return;
        }

        const dates = Object.keys(rates).sort();
        const values = dates.map((date) => rates[date].JPY);

        // Mostrar solo los últimos 12 meses para mejor visualización
        const recentDates = dates.slice(-12);
        const recentValues = values.slice(-12);

        this.chartData = {
          labels: recentDates.map(date => new Date(date).toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })),
          datasets: [
            {
              label: '1 EUR a JPY',
              data: recentValues,
              borderColor: '#1a237e',
              pointBackgroundColor: '#1a237e',
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: false,
              tension: 0.3,
              borderWidth: 3,
            },
          ],
        };

        // Actualizar el gráfico si existe
        if (this.chart) {
          this.chart.update();
        }

        console.log('Datos actualizados:', recentDates, recentValues);
      },
      error: (error) => {
        console.log('Error al cargar datos de la API, usando datos de ejemplo:', error);
        // Los datos de ejemplo ya están cargados en loadChartData()
      }
    });
  }
}

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
        borderColor: '#3f51b5', // Color Material
        pointBackgroundColor: '#3f51b5',
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
    this.fetchExchangeRates();
  }

  fetchExchangeRates(): void {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 365*5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=EUR&to=JPY`;

    this.http.get<any>(url).subscribe((response) => {
      const rates = response.rates;

      if (!rates) {
        console.error('No se recibieron datos de tipo rates');
        return;
      }

      const dates = Object.keys(rates).sort();
      const values = dates.map((date) => rates[date].JPY);

      this.chartData = {
        labels: dates,
        datasets: [
          {
            label: '1 EUR a JPY',
            data: values,
            borderColor: '#3f51b5',
            pointBackgroundColor: '#3f51b5',
            pointRadius: 0,
            fill: false,
            tension: 0.3,
          },
        ],
      };

      console.log('Fechas:', dates);
      console.log('Valores:', values);
    });
  }
}

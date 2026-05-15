import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dinero-recomendations-component',
  templateUrl: './dinero-recomendations.component.html',
  styleUrls: ['./dinero-recomendations.component.css'],
})
export class DineroRecomendationsComponent implements OnInit {
  panelOpenState = true;

  isLoading = true;
  /** Texto tipo "1 EUR = 184,75 JPY (referencia)." cuando hay datos */
  exchangeSummary = '';
  loadError = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCurrentRate();
  }

  fetchCurrentRate(): void {
    this.isLoading = true;
    this.loadError = '';
    this.exchangeSummary = '';
    const url = 'https://api.exchangerate-api.com/v4/latest/EUR';

    this.http.get<{ rates?: { JPY?: number }; date?: string }>(url).subscribe({
      next: (response) => {
        if (response.rates?.JPY != null) {
          this.applyRate(response.rates.JPY, response.date);
          return;
        }
        this.tryExchangeRateHost();
      },
      error: () => this.tryExchangeRateHost(),
    });
  }

  private applyRate(jpyPerEur: number, apiDate?: string): void {
    const formatted = jpyPerEur.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const datePart =
      apiDate?.trim() ?
        ` Referencia (${apiDate}).`
        : '';
    this.exchangeSummary = `Tipo de cambio aproximado: 1 EUR = ${formatted} JPY.${datePart}`;
    this.isLoading = false;
  }

  private tryExchangeRateHost(): void {
    const url =
      'https://api.exchangerate.host/latest?base=EUR&symbols=JPY';
    this.http.get<{ success?: boolean; rates?: { JPY?: number }; date?: string }>(url).subscribe({
      next: (response) => {
        if (
          response.success &&
          response.rates?.JPY != null
        ) {
          this.applyRate(response.rates.JPY, response.date);
          return;
        }
        this.failLoad();
      },
      error: () => this.failLoad(),
    });
  }

  private failLoad(): void {
    this.isLoading = false;
    this.exchangeSummary = '';
    this.loadError =
      'No se ha podido obtener el tipo de cambio en este momento.';
  }
}

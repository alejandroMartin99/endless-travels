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
  
  isLoading = true;
  hasError = false;
  errorMessage = '';

  chartData: any = {
    labels: [],
    datasets: [
      {
        label: '1 EUR a JPY',
        data: [],
        borderColor: '#1a237e',
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
    this.fetchRealExchangeRates();
  }

  fetchRealExchangeRates(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';
    this.fetchFromYahooFinance();
  }

  fetchFromYahooFinance(): void {
    // Usar una API completamente gratuita sin access keys
    console.log('=== INTENTANDO DATOS HISTÓRICOS ===');
    console.log('Probando con Fixer.io (gratuito sin key)...');
    
    this.fetchFromFixerIOFree();
  }

  fetchFromFixerIOFree(): void {
    // Fixer.io tiene un endpoint gratuito sin access key
    const url = 'http://data.fixer.io/api/latest?access_key=';
    
    console.log('=== FIXER.IO GRATUITO ===');
    console.log('URL:', url);
    console.log('Intentando con Fixer.io (endpoint público)...');

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA FIXER.IO ===');
        console.log('Response completa:', response);
        
        if (response.success && response.rates && response.rates.JPY) {
          const currentRate = response.rates.JPY;
          console.log('✅ Tipo de cambio actual obtenido:', currentRate);
          
          // Como no tenemos datos históricos, mostrar solo el actual
          this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos requieren una API key.`);
        } else {
          console.log('❌ Fixer.io no funcionó, probando exchangerate-api...');
          this.fetchFromExchangeRateAPIFree();
        }
      },
      error: (error) => {
        console.log('=== ERROR FIXER.IO ===');
        console.log('Error completo:', error);
        console.log('Probando exchangerate-api...');
        this.fetchFromExchangeRateAPIFree();
      }
    });
  }

  fetchFromExchangeRateAPIFree(): void {
    // exchangerate-api.com es completamente gratuito
    const url = 'https://api.exchangerate-api.com/v4/latest/EUR';
    
    console.log('=== EXCHANGERATE-API.COM GRATUITO ===');
    console.log('URL:', url);

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA EXCHANGERATE-API ===');
        console.log('Response completa:', response);
        
        if (response.rates && response.rates.JPY) {
          const currentRate = response.rates.JPY;
          console.log('✅ Tipo de cambio actual obtenido:', currentRate);
          
          // Intentar obtener algunos datos históricos usando fechas específicas
          this.tryHistoricalDataWithCurrentRate(currentRate);
        } else {
          console.log('❌ exchangerate-api no funcionó, probando exchangerate.host...');
          this.fetchFromExchangeRateHostFree();
        }
      },
      error: (error) => {
        console.log('=== ERROR EXCHANGERATE-API ===');
        console.log('Error completo:', error);
        console.log('Probando exchangerate.host...');
        this.fetchFromExchangeRateHostFree();
      }
    });
  }

  fetchFromExchangeRateHostFree(): void {
    // exchangerate.host es completamente gratuito
    const url = 'https://api.exchangerate.host/latest?base=EUR&symbols=JPY';
    
    console.log('=== EXCHANGERATE.HOST GRATUITO ===');
    console.log('URL:', url);

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA EXCHANGERATE.HOST ===');
        console.log('Response completa:', response);
        
        if (response.success && response.rates && response.rates.JPY) {
          const currentRate = response.rates.JPY;
          console.log('✅ Tipo de cambio actual obtenido:', currentRate);
          
          this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos no están disponibles sin API key.`);
        } else {
          console.log('❌ Todas las APIs fallaron');
          this.showErrorChart('No se pudieron cargar datos de ninguna API gratuita. Verifica tu conexión a internet.');
        }
      },
      error: (error) => {
        console.log('=== ERROR EXCHANGERATE.HOST ===');
        console.log('Error completo:', error);
        console.log('❌ Todas las APIs fallaron');
        this.showErrorChart('Error de conexión. Verifica tu conexión a internet.');
      }
    });
  }

  tryHistoricalDataWithCurrentRate(currentRate: number): void {
    // Intentar obtener algunos datos históricos usando fechas específicas
    console.log('=== INTENTANDO DATOS HISTÓRICOS CON FECHAS ESPECÍFICAS ===');
    
    const historicalDates = [
      '2024-01-01',
      '2024-04-01', 
      '2024-07-01',
      '2024-10-01',
      '2023-01-01',
      '2023-04-01',
      '2023-07-01',
      '2023-10-01',
      '2022-01-01',
      '2022-04-01',
      '2022-07-01',
      '2022-10-01'
    ];
    
    let successCount = 0;
    const results: { date: string, rate: number }[] = [];
    
    historicalDates.forEach((dateStr, index) => {
      setTimeout(() => {
        const url = `https://api.exchangerate-api.com/v4/${dateStr}/EUR`;
        
        console.log(`Consultando fecha histórica ${index + 1}/${historicalDates.length}: ${dateStr}`);
        
        this.http.get<any>(url).subscribe({
          next: (response) => {
            console.log(`Respuesta para ${dateStr}:`, response);
            
            if (response.rates && response.rates.JPY) {
              results.push({ date: dateStr, rate: response.rates.JPY });
              successCount++;
              console.log(`✅ ${dateStr}: 1 EUR = ${response.rates.JPY} JPY`);
            }
            
            // Si hemos procesado todas las fechas o tenemos suficientes datos
            if (successCount + (historicalDates.length - successCount) === historicalDates.length) {
              if (results.length > 0) {
                this.processHistoricalResults(results);
              } else {
                this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos no están disponibles.`);
              }
            }
          },
          error: (error) => {
            console.log(`❌ Error para ${dateStr}:`, error);
            
            // Si hemos procesado todas las fechas
            if (successCount + (historicalDates.length - successCount) === historicalDates.length) {
              if (results.length > 0) {
                this.processHistoricalResults(results);
              } else {
                this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos no están disponibles.`);
              }
            }
          }
        });
      }, index * 300);
    });
  }

  fetchHistoricalDataFromExchangeRateHost(): void {
    // Usar exchangerate.host que no tiene problemas de CORS
    console.log('=== USANDO EXCHANGERATE.HOST ===');
    
    // Generar fechas mensuales de los últimos 4 años (solo fechas pasadas)
    const dates: string[] = [];
    const today = new Date();
    
    // Empezar desde hace 4 años y avanzar hacia hoy
    const startDate = new Date(today);
    startDate.setFullYear(startDate.getFullYear() - 4);
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dates.push(dateStr);
      
      // Avanzar un mes
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    console.log('Fechas a consultar:', dates.slice(0, 5), '...', dates.slice(-5));
    console.log('Total fechas:', dates.length);
    
    // Probar con algunas fechas específicas primero (cada 3 meses para tener más puntos)
    const testDates = dates.filter((_, index) => index % 3 === 0);
    console.log('Fechas de prueba:', testDates);
    console.log('Total fechas de prueba:', testDates.length);
    
    this.fetchMultipleHistoricalDatesFromHost(testDates);
  }

  fetchMultipleHistoricalDatesFromHost(dates: string[]): void {
    let successCount = 0;
    let errorCount = 0;
    const results: { date: string, rate: number }[] = [];
    
    console.log(`Iniciando consulta de ${dates.length} fechas con exchangerate.host...`);
    
    dates.forEach((dateStr, index) => {
      const url = `https://api.exchangerate.host/${dateStr}?base=EUR&symbols=JPY`;
      
      // Hacer la petición con un pequeño delay para evitar rate limiting
      setTimeout(() => {
        console.log(`Consultando fecha ${index + 1}/${dates.length}: ${dateStr}`);
        console.log(`URL: ${url}`);
        
        this.http.get<any>(url).subscribe({
          next: (response) => {
            console.log(`Respuesta para ${dateStr}:`, response);
            
            if (response.success && response.rates && response.rates.JPY) {
              results.push({ date: dateStr, rate: response.rates.JPY });
              successCount++;
              console.log(`✅ ${dateStr}: 1 EUR = ${response.rates.JPY} JPY`);
            } else {
              errorCount++;
              console.log(`❌ ${dateStr}: No se encontró JPY o success=false`);
            }
            
            // Si hemos procesado todas las fechas
            if (successCount + errorCount === dates.length) {
              this.processHistoricalResults(results);
            }
          },
          error: (error) => {
            errorCount++;
            console.log(`❌ Error para ${dateStr}:`, error);
            
            if (successCount + errorCount === dates.length) {
              this.processHistoricalResults(results);
            }
          }
        });
      }, index * 200); // 200ms delay entre peticiones
    });
    
    // Timeout de seguridad por si alguna petición se cuelga
    setTimeout(() => {
      if (successCount + errorCount < dates.length) {
        console.log('Timeout alcanzado, procesando resultados parciales...');
        this.processHistoricalResults(results);
      }
    }, 15000); // 15 segundos timeout
  }

  fetchMultipleHistoricalDates(dates: string[]): void {
    let successCount = 0;
    let errorCount = 0;
    const results: { date: string, rate: number }[] = [];
    
    console.log(`Iniciando consulta de ${dates.length} fechas...`);
    
    dates.forEach((dateStr, index) => {
      const url = `https://api.exchangerate-api.com/v4/history/EUR/${dateStr}`;
      
      // Hacer la petición con un pequeño delay para evitar rate limiting
      setTimeout(() => {
        console.log(`Consultando fecha ${index + 1}/${dates.length}: ${dateStr}`);
        
        this.http.get<any>(url).subscribe({
          next: (response) => {
            console.log(`Respuesta para ${dateStr}:`, response);
            
            if (response.rates && response.rates.JPY) {
              results.push({ date: dateStr, rate: response.rates.JPY });
              successCount++;
              console.log(`✅ ${dateStr}: 1 EUR = ${response.rates.JPY} JPY`);
            } else {
              errorCount++;
              console.log(`❌ ${dateStr}: No se encontró JPY`);
            }
            
            // Si hemos procesado todas las fechas
            if (successCount + errorCount === dates.length) {
              this.processHistoricalResults(results);
            }
          },
          error: (error) => {
            errorCount++;
            console.log(`❌ Error para ${dateStr}:`, error);
            
            if (successCount + errorCount === dates.length) {
              this.processHistoricalResults(results);
            }
          }
        });
      }, index * 100); // 100ms delay entre peticiones
    });
    
    // Timeout de seguridad por si alguna petición se cuelga
    setTimeout(() => {
      if (successCount + errorCount < dates.length) {
        console.log('Timeout alcanzado, procesando resultados parciales...');
        this.processHistoricalResults(results);
      }
    }, 10000); // 10 segundos timeout
  }

  processHistoricalResults(results: { date: string, rate: number }[]): void {
    console.log('=== PROCESANDO RESULTADOS HISTÓRICOS ===');
    console.log('Resultados obtenidos:', results.length);
    console.log('Datos:', results);
    
    if (results.length > 0) {
      // Ordenar por fecha
      results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      const labels: string[] = [];
      const values: number[] = [];
      
      results.forEach(result => {
        const date = new Date(result.date);
        labels.push(date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }));
        values.push(Math.round(result.rate * 100) / 100);
      });
      
      console.log('Labels generados:', labels);
      console.log('Values generados:', values);
      
      this.chartData = {
        labels,
        datasets: [
          {
            label: '1 EUR a JPY',
            data: values,
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

      this.isLoading = false;
      if (this.chart) this.chart.update();

      console.log('✅ Datos históricos cargados:', values.length, 'puntos');
    } else {
      console.log('❌ No se obtuvieron datos históricos, probando API alternativa...');
      this.fetchFromAlternativeAPI();
    }
  }

  fetchFromAlternativeAPI(): void {
    // exchangerate-api.com como alternativa
    const url = 'https://api.exchangerate-api.com/v4/latest/EUR';
    
    console.log('=== EXCHANGERATE-API.COM ===');
    console.log('URL:', url);
    console.log('Intentando con exchangerate-api.com...');

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA EXCHANGERATE-API ===');
        console.log('Response completa:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));
        
        if (response) {
          console.log('Rates exists:', !!response.rates);
          if (response.rates) {
            console.log('Rates keys:', Object.keys(response.rates));
            console.log('JPY rate exists:', !!response.rates.JPY);
            if (response.rates.JPY) {
              console.log('JPY rate value:', response.rates.JPY);
            }
          }
        }
        
        if (response.rates && response.rates.JPY) {
          const currentRate = response.rates.JPY;
          console.log('✅ Tipo de cambio actual obtenido:', currentRate);
          this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos no están disponibles.`);
        } else {
          console.log('❌ No se encontró JPY en rates, probando exchangerate.host...');
          this.fetchFromExchangeRateHost();
        }
      },
      error: (error) => {
        console.log('=== ERROR EXCHANGERATE-API ===');
        console.log('Error completo:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error URL:', error.url);
        this.fetchFromExchangeRateHost();
      }
    });
  }

  fetchFromExchangeRateHost(): void {
    // exchangerate.host como tercera opción
    const url = 'https://api.exchangerate.host/latest?base=EUR&symbols=JPY';
    
    console.log('=== EXCHANGERATE.HOST ===');
    console.log('URL:', url);
    console.log('Intentando con exchangerate.host...');

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA EXCHANGERATE.HOST ===');
        console.log('Response completa:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));
        
        if (response) {
          console.log('Success exists:', !!response.success);
          console.log('Success value:', response.success);
          console.log('Rates exists:', !!response.rates);
          if (response.rates) {
            console.log('Rates keys:', Object.keys(response.rates));
            console.log('JPY rate exists:', !!response.rates.JPY);
            if (response.rates.JPY) {
              console.log('JPY rate value:', response.rates.JPY);
            }
          }
        }
        
        if (response.success && response.rates && response.rates.JPY) {
          const currentRate = response.rates.JPY;
          console.log('✅ Tipo de cambio actual obtenido desde exchangerate.host:', currentRate);
          this.showErrorChart(`Tipo de cambio actual: 1 EUR = ${currentRate.toFixed(2)} JPY. Los datos históricos no están disponibles.`);
        } else {
          console.log('❌ No se encontró JPY en exchangerate.host, mostrando error final');
          this.showErrorChart('No se pudieron cargar datos de ninguna API. Verifica tu conexión a internet.');
        }
      },
      error: (error) => {
        console.log('=== ERROR EXCHANGERATE.HOST ===');
        console.log('Error completo:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error URL:', error.url);
        console.log('❌ Error con todas las APIs, mostrando error final');
        this.showErrorChart('Error de conexión. Verifica tu conexión a internet.');
      }
    });
  }

  private showErrorChart(message: string = 'Error al cargar datos'): void {
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = message;
    
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: '1 EUR a JPY',
          data: [],
          borderColor: '#dc3545',
          pointBackgroundColor: '#dc3545',
          pointRadius: 0,
          fill: false,
          tension: 0,
          borderWidth: 0,
        },
      ],
    };

    console.error(message);
  }
}
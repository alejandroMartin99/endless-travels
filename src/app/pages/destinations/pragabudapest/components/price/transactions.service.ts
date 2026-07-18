import { Injectable } from '@angular/core';

export interface Transaction {
  place: string;
  merchant: string;
  category: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class PragaBudapestTransactionsService {
  private transactions: Transaction[] = [
    // Transporte
    { place: 'General', merchant: 'Vuelo de ida', category: 'Transporte', amount: -215 },
    { place: 'General', merchant: 'Vuelo de vuelta', category: 'Transporte', amount: -210 },
    { place: 'Praga', merchant: 'Tren Praga–Bratislava', category: 'Transporte', amount: -37.8 },
    { place: 'Praga', merchant: 'Coche de alquiler (Kutná Hora)', category: 'Transporte', amount: -40.65 },
    { place: 'Praga', merchant: 'Peajes Kutná Hora', category: 'Transporte', amount: -11 },
    { place: 'Praga', merchant: 'Gasolina Kutná Hora', category: 'Transporte', amount: -22.6 },
    { place: 'Bratislava', merchant: 'Bus Bratislava–Budapest', category: 'Transporte', amount: -34.3 },
    { place: 'Bratislava', merchant: 'Transporte local Bratislava', category: 'Transporte', amount: -3.2 },
    { place: 'Budapest', merchant: 'Transporte Budapest', category: 'Transporte', amount: -2.24 },
    { place: 'Budapest', merchant: 'Bus Budapest', category: 'Transporte', amount: -2.24 },
    { place: 'Budapest', merchant: 'Metro día 1', category: 'Transporte', amount: -2.23 },
    { place: 'Budapest', merchant: 'Metro ida/vuelta balneario', category: 'Transporte', amount: -4.4 },
    { place: 'Budapest', merchant: 'Bus aeropuerto', category: 'Transporte', amount: -10.85 },

    // Alojamiento
    { place: 'Praga', merchant: 'Hotel Praga', category: 'Alojamiento', amount: -272 },
    { place: 'Bratislava', merchant: 'Hotel Bratislava', category: 'Alojamiento', amount: -81.86 },
    { place: 'Budapest', merchant: 'Apartamento Budapest', category: 'Alojamiento', amount: -177.4 },
    { place: 'Bratislava', merchant: 'Tasa turística Bratislava', category: 'Alojamiento', amount: -7 },
    { place: 'Budapest', merchant: 'Maletas Storage', category: 'Alojamiento', amount: -12.99 },

    // Actividades
    { place: 'Praga', merchant: 'Entradas Osario Kutná Hora', category: 'Actividades', amount: -21.51 },
    { place: 'Budapest', merchant: 'Baños Széchenyi', category: 'Actividades', amount: -66 },
    { place: 'Budapest', merchant: 'Tour por el Danubio', category: 'Actividades', amount: -36 },
    { place: 'Budapest', merchant: 'Baño (Pis Lu)', category: 'Actividades', amount: -1 },

    // Comida
    { place: 'Praga', merchant: 'KFC Cenaculum', category: 'Comida', amount: -19.7 },
    { place: 'Praga', merchant: 'Fritura Castillo de Praga', category: 'Comida', amount: -30 },
    { place: 'Praga', merchant: 'Comida Uglaviku', category: 'Comida', amount: -35.8 },
    { place: 'Praga', merchant: 'Cena Café Elubre', category: 'Comida', amount: -34.6 },
    { place: 'Praga', merchant: 'Desayuno Star Wars', category: 'Comida', amount: -15.87 },
    { place: 'Praga', merchant: 'Entrada sin agua', category: 'Comida', amount: -29.37 },
    { place: 'Praga', merchant: 'Comida local Praga', category: 'Comida', amount: -43.94 },
    { place: 'Praga', merchant: 'Postre Praga', category: 'Comida', amount: -3.58 },
    { place: 'Praga', merchant: 'Desayuno Praga', category: 'Comida', amount: -15.4 },
    { place: 'Praga', merchant: 'Cena Bagateria Boulevard', category: 'Comida', amount: -22.14 },
    { place: 'Bratislava', merchant: 'Restaurante Divinity Jancodija', category: 'Comida', amount: -28.38 },
    { place: 'Bratislava', merchant: 'Cena Kalibakapni', category: 'Comida', amount: -51.6 },
    { place: 'Bratislava', merchant: 'Desayuno estación Bratislava', category: 'Comida', amount: -6.26 },
    { place: 'Budapest', merchant: 'Comida Budapest', category: 'Comida', amount: -41.12 },
    { place: 'Budapest', merchant: 'Desayuno Circus Café', category: 'Comida', amount: -35.15 },
    { place: 'Budapest', merchant: 'Agua Spar', category: 'Comida', amount: -0.41 },
    { place: 'Budapest', merchant: 'Cena Makas', category: 'Comida', amount: -24.09 },
    { place: 'Budapest', merchant: 'Desayuno Circus Café (día 2)', category: 'Comida', amount: -31.15 },
    { place: 'Budapest', merchant: 'Chimney cake', category: 'Comida', amount: -4.37 },
    { place: 'Budapest', merchant: 'Cena Forni di Napoli', category: 'Comida', amount: -31.7 },
    { place: 'Budapest', merchant: 'Comida Budalanchi / Soro Zondo', category: 'Comida', amount: -32.68 },
    { place: 'Budapest', merchant: 'Comida Negro Mangalica', category: 'Comida', amount: -49.59 },
    { place: 'Budapest', merchant: 'Chimney postre', category: 'Comida', amount: -8.15 },
    { place: 'Budapest', merchant: 'Cena burgers', category: 'Comida', amount: -25.32 },
    { place: 'Budapest', merchant: 'Desayuno Starbucks', category: 'Comida', amount: -11.26 },
    { place: 'Budapest', merchant: 'Cena burgers (2)', category: 'Comida', amount: -18.71 },
    { place: 'Budapest', merchant: 'Agua', category: 'Comida', amount: -3.42 },
    { place: 'Budapest', merchant: 'Comida Paprika Bendeklao', category: 'Comida', amount: -43.3 },
    { place: 'Budapest', merchant: 'Chimney Cake', category: 'Comida', amount: -8.15 },
    { place: 'Budapest', merchant: 'Burger aeropuerto', category: 'Comida', amount: -23.61 },

    // Compras
    { place: 'General', merchant: 'Regalitos', category: 'Compras', amount: -12 },
    { place: 'Budapest', merchant: 'Souvenirs paprika', category: 'Compras', amount: -7.41 },
    { place: 'Budapest', merchant: 'Regalo Pixl (Papi Lu)', category: 'Compras', amount: -11 },
    { place: 'Budapest', merchant: 'Souvenirs choco', category: 'Compras', amount: -6.91 },

    // Efectivo / reserva
    { place: 'General', merchant: 'Reserva de dinero', category: 'Efectivo', amount: -200 },
    { place: 'General', merchant: 'Gastado en efectivo', category: 'Efectivo', amount: -175 },
  ];

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  getCategoryTotals(): { [key: string]: number } {
    return this.transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as { [key: string]: number });
  }

  getGrandTotal(): number {
    return this.transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }
}

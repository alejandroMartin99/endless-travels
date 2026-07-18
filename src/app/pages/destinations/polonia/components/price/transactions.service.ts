import { Injectable } from '@angular/core';

export interface Transaction {
  place: string;
  merchant: string;
  category: string;
  amount: number;
}

/** Importes totales del viaje (2 personas). El componente divide ÷2. */
@Injectable({ providedIn: 'root' })
export class PoloniaTransactionsService {
  private transactions: Transaction[] = [
    // —— Transporte ——
    { place: 'General', merchant: 'Vuelo ida → Varsovia', category: 'Transporte', amount: -138 },
    { place: 'General', merchant: 'Vuelo vuelta Wrocław → Valencia', category: 'Transporte', amount: -125 },
    { place: 'General', merchant: 'Tren Valencia → Madrid', category: 'Transporte', amount: -53.44 },
    { place: 'Varsovia', merchant: 'Tren Varsovia → Cracovia', category: 'Transporte', amount: -37 },
    { place: 'Cracovia', merchant: 'Tren Cracovia → Wrocław', category: 'Transporte', amount: -34.12 },
    { place: 'Varsovia', merchant: 'Transporte local (genérico)', category: 'Transporte', amount: -2.1 },
    { place: 'Cracovia', merchant: 'Transporte local', category: 'Transporte', amount: -3.3 },
    { place: 'Cracovia', merchant: 'Uber Cracovia → Minas de Wieliczka', category: 'Transporte', amount: -14.03 },
    { place: 'Cracovia', merchant: 'Transporte urbano Cracovia', category: 'Transporte', amount: -4.71 },
    { place: 'Wrocław', merchant: 'Uber estación → hotel', category: 'Transporte', amount: -4.39 },

    // —— Alojamiento ——
    { place: 'Varsovia', merchant: 'Apartamento Varsovia', category: 'Alojamiento', amount: -191.5 },
    { place: 'Cracovia', merchant: 'Airbnb Cracovia', category: 'Alojamiento', amount: -180 },
    { place: 'Wrocław', merchant: 'Hotel Wrocław', category: 'Alojamiento', amount: -157 },

    // —— Actividades ——
    { place: 'Cracovia', merchant: 'Minas de Sal de Wieliczka', category: 'Actividades', amount: -61.25 },
    { place: 'Cracovia', merchant: 'Excursión Auschwitz-Birkenau (Civitatis)', category: 'Actividades', amount: -89.41 },
    { place: 'Varsovia', merchant: 'Mirador Palacio de Cultura y Ciencia', category: 'Actividades', amount: -13.29 },
    { place: 'Varsovia', merchant: 'Propina / tip (SUV)', category: 'Actividades', amount: -6 },
    { place: 'Varsovia', merchant: 'Free tours Varsovia (×2, propinas)', category: 'Actividades', amount: -50 },
    { place: 'Cracovia', merchant: 'Free tour casco antiguo Cracovia', category: 'Actividades', amount: -30 },
    { place: 'Cracovia', merchant: 'Free tour barrio judío Cracovia', category: 'Actividades', amount: -30 },
    { place: 'Cracovia', merchant: 'Visita iglesia / catedral Cracovia', category: 'Actividades', amount: -7.06 },
    { place: 'Cracovia', merchant: 'Museo judío', category: 'Actividades', amount: -9.4 },
    { place: 'Wrocław', merchant: 'Free tour Wrocław (propina)', category: 'Actividades', amount: -20 },

    // —— Comida ——
    { place: 'Varsovia', merchant: 'Cena McDonald\'s', category: 'Comida', amount: -17.98 },
    { place: 'Varsovia', merchant: 'Café / desayuno', category: 'Comida', amount: -17.8 },
    { place: 'Varsovia', merchant: 'Cena kebab', category: 'Comida', amount: -16.99 },
    { place: 'Varsovia', merchant: 'Zapiekanki', category: 'Comida', amount: -27.4 },
    { place: 'Varsovia', merchant: 'Carrefour (día 26)', category: 'Comida', amount: -9.53 },
    { place: 'Varsovia', merchant: 'Cena (día 27)', category: 'Comida', amount: -32 },
    { place: 'Varsovia', merchant: 'Carrefour varios', category: 'Comida', amount: -4.88 },
    { place: 'Cracovia', merchant: 'Comida restaurante (pato)', category: 'Comida', amount: -45.93 },
    { place: 'Cracovia', merchant: 'Cena pizzas (día 28)', category: 'Comida', amount: -3.95 },
    { place: 'Cracovia', merchant: 'Desayuno', category: 'Comida', amount: -10 },
    { place: 'Cracovia', merchant: 'Desayuno Costa Coffee', category: 'Comida', amount: -18.93 },
    { place: 'Cracovia', merchant: 'Comida Abuela Frambuesa (día 29)', category: 'Comida', amount: -44.91 },
    { place: 'Cracovia', merchant: 'Cena (día 29)', category: 'Comida', amount: -11.18 },
    { place: 'Cracovia', merchant: 'Panini (día 30)', category: 'Comida', amount: -2.47 },
    { place: 'Cracovia', merchant: 'Compra supermercado', category: 'Comida', amount: -11 },
    { place: 'Cracovia', merchant: 'Cena perrito caliente', category: 'Comida', amount: -32.66 },
    { place: 'Cracovia', merchant: 'Comida Subway (1 mayo)', category: 'Comida', amount: -33.22 },
    { place: 'Wrocław', merchant: 'Desayuno McDonald\'s', category: 'Comida', amount: -9.1 },
    { place: 'Wrocław', merchant: 'Comida pierogi (día 2 mayo)', category: 'Comida', amount: -48 },
    { place: 'Wrocław', merchant: 'Cena McDonald\'s', category: 'Comida', amount: -12 },
    { place: 'Wrocław', merchant: 'Comida (Day Pilgrims / similar)', category: 'Comida', amount: -28 },
    { place: 'Valencia', merchant: 'Desayuno Valencia (escala vuelta)', category: 'Comida', amount: -16.5 },

    // —— Compras ——
    { place: 'Cracovia', merchant: 'Libro de regalo', category: 'Compras', amount: -21 },
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

  /** Vuelos ida + vuelta (sin tren Valencia–Madrid). Total pareja. */
  getFlightsPairTotal(): number {
    return 138 + 125;
  }
}

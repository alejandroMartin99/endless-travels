import { Injectable } from '@angular/core';

interface Transaction {
    date: string;
    merchant: string;
    category: string;
    amount: number;
}

@Injectable({
providedIn: 'root'
})



export class TransactionsService {

    

    private transactions: Transaction[] = [
        // Aquí pega todas las transacciones actuales
        { date: '2023-10-29', merchant: 'Jr-East -> Compra puesto ST', category: 'Comida', amount: -13.82 },
        { date: '2023-10-29', merchant: 'Menshotakamatsu Honten', category: 'Comida', amount: -5.90 },
        { date: '2023-10-30', merchant: 'Starbucks', category: 'Comida', amount: -3.87 },
        { date: '2023-11-03', merchant: 'Uber', category: 'Transporte', amount: -8.15 },
        { date: '2023-11-01', merchant: 'Kyoto Tower Sando - Street Food', category: 'Comida', amount: -8.04 },
        { date: '2023-11-02', merchant: 'Super Kids Land Joshin', category: 'Entretenimiento', amount: -16.41 },
        { date: '2023-11-02', merchant: 'Bic Camera Shinjuku West Exit', category: 'Compras', amount: -9.43 },
        { date: '2023-11-03', merchant: 'Kyoto Tower Sando - Street Food', category: 'Entretenimiento', amount: -20.15 },
        { date: '2023-11-07', merchant: 'JR-EAST', category: 'Transporte', amount: -7.07 },
        { date: '2023-11-08', merchant: 'Susizanmai Uenoten', category: 'Comida', amount: -40.50 },
        { date: '2023-11-08', merchant: 'Astop Radio Store', category: 'Compras', amount: -33.77 },
        { date: '2023-11-08', merchant: 'MANDARAKE - Mangas', category: 'Compras', amount: -2.74 },
        { date: '2023-11-08', merchant: 'MANDARAKE - Mangas', category: 'Compras', amount: -3.09 },
        { date: '2023-11-07', merchant: 'FamilyMart', category: 'Comida', amount: -13.78 },
        { date: '2023-11-08', merchant: 'Animate Akihabara - Mangas', category: 'Entretenimiento', amount: -23.80 },
        { date: '2023-11-08', merchant: 'Yamayashouten', category: 'Comida', amount: -25.65 },
        { date: '2023-11-09', merchant: 'Mega Don Quijote', category: 'Compras', amount: -25.87 },
        { date: '2023-11-09', merchant: 'Blacows', category: 'Comida', amount: -50.82 },
        { date: '2023-11-09', merchant: 'Ishibashigatsuki Shibuyat', category: 'Comida', amount: -25.63 },
        { date: '2023-11-09', merchant: 'McDonald\'s', category: 'Comida', amount: -3.66 },
        { date: '2023-11-10', merchant: 'UNIQLO', category: 'Compras', amount: -60.44 },
        { date: '2023-11-10', merchant: 'McDonald\'s', category: 'Comida', amount: -7.05 },
        { date: '2023-11-11', merchant: 'Animate Ikebukuro - Mangas', category: 'Entretenimiento', amount: -10.22 },
        { date: '2023-11-11', merchant: 'A Happypancake Ikebukur', category: 'Comida', amount: -26.12 },
        { date: '2023-11-11', merchant: 'Jr-East', category: 'Transporte', amount: -15.88 },
        { date: '2023-11-11', merchant: 'FamilyMart', category: 'Comida', amount: -1.46 },
        { date: '2023-11-12', merchant: 'Haneda Airport Terminal - Cena Aeropuerto', category: 'Transporte', amount: -18.08 },
        
    ];



  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionsByCategory(category: string): Transaction[] {
    return this.transactions.filter(t => t.category === category);
  }

  getTransactionsByDate(date: string): Transaction[] {
    return this.transactions.filter(t => t.date === date);
  }
}

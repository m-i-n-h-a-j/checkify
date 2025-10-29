import { Injectable, signal } from '@angular/core';
import { Cheque } from '../models/check';

@Injectable({
  providedIn: 'root',
})
export class CoreServices {
  chequePresets = signal<Array<Cheque>>([]);
  selectedPreset = signal<number | null>(null);

  numberToWords(num: number): string {
    const a = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];

    const b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    if (num === 0) {
      return 'Zero';
    }

    if (num < 20) {
      return a[num];
    }

    if (num < 100) {
      return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
    }

    if (num < 1000) {
      return (
        a[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' and ' + this.numberToWords(num % 100) : '')
      );
    }

    if (num < 100000) {
      return (
        this.numberToWords(Math.floor(num / 1000)) +
        ' Thousand' +
        (num % 1000 ? ' ' + this.numberToWords(num % 1000) : '')
      );
    }

    if (num < 10000000) {
      return (
        this.numberToWords(Math.floor(num / 100000)) +
        ' Lakh' +
        (num % 100000 ? ' ' + this.numberToWords(num % 100000) : '')
      );
    }

    return (
      this.numberToWords(Math.floor(num / 10000000)) +
      ' Crore' +
      (num % 10000000 ? ' ' + this.numberToWords(num % 10000000) : '')
    );
  }

  setPreset(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.selectedPreset.set(Number(id));
    localStorage.setItem('lastPreset', id);
  }
}

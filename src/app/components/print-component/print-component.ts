import { Component, input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Cheque } from '../../models/check';

@Component({
  selector: 'app-print-component',
  imports: [FormsModule, InputTextModule, FloatLabel],
  templateUrl: './print-component.html',
  styleUrl: './print-component.css',
})
export class PrintComponent implements OnInit {
  width: string | undefined;
  height: string | undefined;

  dateTop: string | undefined;
  dateLeft: string | undefined;

  nameTop: string | undefined;
  nameLeft: string | undefined;

  amntLine1Top: string | undefined;
  amntLine1Left: string | undefined;

  amntLine2Top: string | undefined;
  amntLine2Left: string | undefined;

  amountTop: string | undefined;
  amountLeft: string | undefined;

  date = input<string>();
  name = input<string>();
  amount = input<string>();
  amntInWordsLine1 = input<string>();
  amntInWordsLine2 = input<string>();

  ngOnInit(): void {
    // this.width = '25.4';
    // this.height = '11.4';

    // this.dateTop = '0.75';
    // this.dateLeft = '20';

    // this.nameTop = '2';
    // this.nameLeft = '1.5';

    // this.amntLine1Top = '4';
    // this.amntLine1Left = '1.5';

    // this.amntLine2Top = '6';
    // this.amntLine2Left = '1.5';

    // this.amountTop = '7';
    // this.amountLeft = '20';
  }

  saveLayout() {
    const storedPresets = localStorage.getItem('chequePresets');
    const chequePresets: Cheque[] = storedPresets ? JSON.parse(storedPresets) : [];

    const cheque: Cheque = {
      id: chequePresets.length + 1,
      width: this.width ?? '',
      height: this.height ?? '',
      dateTop: this.dateTop ?? '',
      dateLeft: this.dateLeft ?? '',
      nameTop: this.nameTop ?? '',
      nameLeft: this.nameLeft ?? '',
      amntLine1Top: this.amntLine1Top ?? '',
      amntLine1Left: this.amntLine1Left ?? '',
      amntLine2Top: this.amntLine2Top ?? '',
      amntLine2Left: this.amntLine2Left ?? '',
      amountTop: this.amountTop ?? '',
      amountLeft: this.amountLeft ?? '',
    };

    chequePresets.push(cheque);
    localStorage.setItem('chequePresets', JSON.stringify(chequePresets));
  }
}

import { Component, input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

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
    this.width = '25.4';
    this.height = '11.4';

    this.dateTop = '0.75';
    this.dateLeft = '20';

    this.nameTop = '2';
    this.nameLeft = '1.5';

    this.amntLine1Top = '4';
    this.amntLine1Left = '1.5';

    this.amntLine2Top = '6';
    this.amntLine2Left = '1.5';

    this.amountTop = '7';
    this.amountLeft = '20';
  }
}

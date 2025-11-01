import { Component, effect, inject, input, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Cheque } from '../../models/check';
import { Message } from 'primeng/message';
import { CoreServices } from '../../services/core-services';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-print-component',
  imports: [FormsModule, InputTextModule, FloatLabel, Message, ButtonModule, Dialog],
  templateUrl: './print-component.html',
  styleUrl: './print-component.css',
})
export class PrintComponent {
  constructor() {
    effect(() => {
      const currentId = this.coreService.selectedPreset();
      if (currentId != null) {
        const preset = this.coreService.chequePresets()[currentId];

        this.width = preset.width;
        this.height = preset.height;
        this.dateTop = preset.dateTop;
        this.dateLeft = preset.dateLeft;
        this.dateSpace = preset.dateSpace;
        this.nameTop = preset.nameTop;
        this.nameLeft = preset.nameLeft;
        this.amntLine1Top = preset.amntLine1Top;
        this.amntLine1Left = preset.amntLine1Left;
        this.amntLine2Top = preset.amntLine2Top;
        this.amntLine2Left = preset.amntLine2Left;
        this.amountTop = preset.amountTop;
        this.amountLeft = preset.amountLeft;
      } else {
        this.setDefaultPreset();
      }
    });
    // effect(() => {
    //   console.log(this.date());
    // });
  }

  isMessageVisible = signal<boolean>(false);
  coreService = inject(CoreServices);
  visible: boolean = false;

  presetName: string | undefined;

  width: string | undefined;
  height: string | undefined;

  dateTop: string | undefined;
  dateLeft: string | undefined;
  dateSpace: string | undefined;

  nameTop: string | undefined;
  nameLeft: string | undefined;

  amntLine1Top: string | undefined;
  amntLine1Left: string | undefined;

  amntLine2Top: string | undefined;
  amntLine2Left: string | undefined;

  amountTop: string | undefined;
  amountLeft: string | undefined;

  date = input<string[]>();
  name = input<string>();
  amount = input<string>();
  amntInWordsLine1 = input<string>();
  amntInWordsLine2 = input<string>();

  setDefaultPreset() {
    this.presetName = 'default';
    this.width = '20';
    this.height = '10';

    this.dateTop = '0.75';
    this.dateLeft = '16';
    this.dateSpace = '1';

    this.nameTop = '2';
    this.nameLeft = '1.5';

    this.amntLine1Top = '3.5';
    this.amntLine1Left = '1.5';

    this.amntLine2Top = '5';
    this.amntLine2Left = '1.5';

    this.amountTop = '6.5';
    this.amountLeft = '14';
  }

  showDialog() {
    this.visible = true;
  }
  saveLayout() {
    this.visible = false;
    const storedPresets = localStorage.getItem('chequePresets');
    const chequePresets: Cheque[] = storedPresets ? JSON.parse(storedPresets) : [];

    const cheque: Cheque = {
      id: chequePresets.length,
      presetName: this.presetName ?? '',
      width: this.width ?? '',
      height: this.height ?? '',
      dateTop: this.dateTop ?? '',
      dateLeft: this.dateLeft ?? '',
      dateSpace: this.dateSpace ?? '',
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
    this.coreService.chequePresets.set(chequePresets);
    localStorage.setItem('chequePresets', JSON.stringify(chequePresets));

    this.coreService.selectedPreset.set(chequePresets.length - 1);
  }
  printSection(sectionId: string) {
    const content = document.getElementById(sectionId)?.innerHTML;
    if (!content) return;

    const styleTags = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((tag) => tag.outerHTML)
      .join('');

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow!.document.open();
    printWindow!.document.write(`
    <html>
      <head>
        <title>Print</title>
        ${styleTags}
        <style>
          @page { margin: 20mm; }
          body { padding: 20px; }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${content}
      </body>
    </html>
  `);
    printWindow!.document.close();
  }
}

import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { AccountNumberTxtboxComponent } from '../../components/account-number-txtbox-component/account-number-txtbox-component';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-home-page',
  imports: [AccountNumberTxtboxComponent, FormsModule, ReactiveFormsModule, DatePicker],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  @ViewChild('amountInWordsPrimary') primaryBox!: ElementRef<HTMLInputElement>;
  isDark = signal<boolean>(false);
  systemTheme = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

  setTheme() {
    if (localStorage.getItem('isDark') == 'false') {
      return;
    } else if (localStorage.getItem('isDark') == 'true' || this.systemTheme()) {
      const element = document.querySelector('html');
      element!.classList.toggle('my-app-dark');
      this.isDark.set(!this.isDark());
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
    this.isDark.set(!this.isDark());
    if (this.isDark()) {
      localStorage.setItem('isDark', 'true');
    } else {
      localStorage.setItem('isDark', 'false');
    }
  }

  onSubmit() {}
  chequeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    amountInWordsPrimary: new FormControl('', Validators.required),
    amountInWordsSecondary: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.setTheme();
    this.toggleDarkMode();
    this.chequeForm.get('amount')?.valueChanges.subscribe((value) => {
      const amount = Number(value);
      if (!isNaN(amount)) {
        const fullWords = this.numberToWords(amount) + ' Rupees Only';
        this.splitAmountInWords(fullWords);
      } else {
        this.chequeForm.patchValue(
          {
            amountInWordsPrimary: '',
            amountInWordsSecondary: '',
          },
          { emitEvent: false }
        );
      }
    });
  }

  private splitAmountInWords(fullText: string) {
    const input = this.primaryBox.nativeElement;

    input.value = fullText;

    if (input.scrollWidth <= input.clientWidth) {
      this.chequeForm.patchValue(
        {
          amountInWordsPrimary: fullText,
          amountInWordsSecondary: '',
        },
        { emitEvent: false }
      );
    } else {
      let cutIndex = fullText.length;

      while (input.scrollWidth > input.clientWidth && cutIndex > 0) {
        cutIndex--;
        while (fullText[cutIndex] != ' ') {
          cutIndex--;
        }
        input.value = fullText.substring(0, cutIndex);
      }

      this.chequeForm.patchValue(
        {
          amountInWordsPrimary: fullText.substring(0, cutIndex),
          amountInWordsSecondary: fullText.substring(cutIndex).trim(),
        },
        { emitEvent: false }
      );
    }
  }

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
}

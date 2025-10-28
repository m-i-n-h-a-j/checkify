import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { DateInputComponent } from '../../components/date-input-component/date-input-component';
import { CoreServices } from '../../services/core-services';
import { CommonModule } from '@angular/common';
import { PrintComponent } from '../../components/print-component/print-component';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, ReactiveFormsModule, DateInputComponent, CommonModule, PrintComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  @ViewChild('amountInWordsPrimary') primaryBox!: ElementRef<HTMLInputElement>;
  isDark = signal<boolean>(false);
  systemTheme = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);
  coreService = inject(CoreServices);
  isPrintSectionVisible = signal<boolean>(false);

  setDate(event: string) {
    this.chequeForm.patchValue(
      {
        date: event ?? '',
      },
      { emitEvent: false }
    );
  }

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
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    amountInWordsPrimary: new FormControl('', Validators.required),
    amountInWordsSecondary: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.setTheme();
    this.chequeForm.get('amount')?.valueChanges.subscribe((value) => {
      const amount = Number(value);
      if (!isNaN(amount)) {
        const fullWords = this.coreService.numberToWords(amount) + ' Rupees Only';
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

  showPrintSection() {
    this.isPrintSectionVisible.set(true);
  }
  scrollToSection(id: string) {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
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
}

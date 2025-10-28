import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-input-component',
  imports: [ReactiveFormsModule],
  templateUrl: './date-input-component.html',
  styleUrl: './date-input-component.css',
})
export class DateInputComponent implements OnInit {
  @ViewChild('Date1') date1!: ElementRef;
  @ViewChild('Date2') date2!: ElementRef;
  @ViewChild('Date3') date3!: ElementRef;
  @ViewChild('Date4') date4!: ElementRef;
  @ViewChild('Date5') date5!: ElementRef;
  @ViewChild('Date6') date6!: ElementRef;
  @ViewChild('Date7') date7!: ElementRef;
  @ViewChild('Date8') date8!: ElementRef;

  private renderer = inject(Renderer2);

  readonly dateChangeEvent = output<string>();

  dateForm = new FormGroup({
    date1: new FormControl('', Validators.required),
    date2: new FormControl('', Validators.required),
    date3: new FormControl('', Validators.required),
    date4: new FormControl('', Validators.required),
    date5: new FormControl('', Validators.required),
    date6: new FormControl('', Validators.required),
    date7: new FormControl('', Validators.required),
    date8: new FormControl('', Validators.required),
  });

  moveRightFrom1(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date2.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date1: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date2.nativeElement).focus(), 0);
    }

  }
  moveRightFrom2(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date3.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date2: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date3.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date1.nativeElement).focus(), 0);
    }
  }
  moveRightFrom3(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date4.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date3: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date4.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date2.nativeElement).focus(), 0);
    }
  }
  moveRightFrom4(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date5.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date4: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date5.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date3.nativeElement).focus(), 0);
    }
  }
  moveRightFrom5(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date6.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date5: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date6.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date4.nativeElement).focus(), 0);
    }
  }
  moveRightFrom6(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date7.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date6: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date7.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date5.nativeElement).focus(), 0);
    }
  }
  moveRightFrom7(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      setTimeout(() => this.renderer.selectRootElement(this.date8.nativeElement).focus(), 0);
      this.dateForm.patchValue({
        date7: event.key,
      });
    } else if (event.key == 'ArrowRight') {
      setTimeout(() => this.renderer.selectRootElement(this.date8.nativeElement).focus(), 0);
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date6.nativeElement).focus(), 0);
    }
  }
  moveRightFrom8(event: KeyboardEvent) {
    event.preventDefault();
    if (Number(event.key) / 10 < 1) {
      this.dateForm.patchValue({
        date8: event.key,
      });
    } else if (event.key == 'ArrowLeft') {
      setTimeout(() => this.renderer.selectRootElement(this.date7.nativeElement).focus(), 0);
    }
  }

  ngOnInit() {
    this.dateForm.valueChanges.subscribe((value) => {
      const combined = Object.values(value)
        .map((v) => v || '')
        .join('');
      this.dateChangeEvent.emit(combined);
    });
  }
}

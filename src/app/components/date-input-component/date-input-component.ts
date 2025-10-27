import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-input-component',
  imports: [ReactiveFormsModule],
  templateUrl: './date-input-component.html',
  styleUrl: './date-input-component.css',
})
export class DateInputComponent implements OnInit {
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

  ngOnInit() {
    this.dateForm.valueChanges.subscribe((value) => {
      const combined = Object.values(value)
        .map((v) => v || '')
        .join('');
      this.dateChangeEvent.emit(combined);
    });
  }
}

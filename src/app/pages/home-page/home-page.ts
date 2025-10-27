import { Component } from '@angular/core';
import { AccountNumberTxtboxComponent } from '../../components/account-number-txtbox-component/account-number-txtbox-component';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [AccountNumberTxtboxComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  chequeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    amountInWords: new FormControl('', Validators.required),
  });
}

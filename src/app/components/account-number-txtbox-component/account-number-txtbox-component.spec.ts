import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNumberTxtboxComponent } from './account-number-txtbox-component';

describe('AccountNumberTxtboxComponent', () => {
  let component: AccountNumberTxtboxComponent;
  let fixture: ComponentFixture<AccountNumberTxtboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNumberTxtboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNumberTxtboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

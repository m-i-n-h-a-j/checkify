import { TestBed } from '@angular/core/testing';

import { NumToText } from './num-to-text';

describe('NumToText', () => {
  let service: NumToText;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumToText);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

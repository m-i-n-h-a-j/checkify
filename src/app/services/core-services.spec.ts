import { TestBed } from '@angular/core/testing';

import { CoreServices } from './core-services';

describe('CoreServices', () => {
  let service: CoreServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

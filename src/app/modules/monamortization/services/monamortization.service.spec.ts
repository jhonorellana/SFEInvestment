import { TestBed } from '@angular/core/testing';

import { MonamortizationService } from './monamortization.service';

describe('MonamortizationService', () => {
  let service: MonamortizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonamortizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

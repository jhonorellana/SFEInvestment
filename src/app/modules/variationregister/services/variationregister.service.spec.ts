import { TestBed } from '@angular/core/testing';

import { VariationregisterService } from './variationregister.service';

describe('VariationregisterService', () => {
  let service: VariationregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariationregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

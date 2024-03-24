import { TestBed } from '@angular/core/testing';

import { BonoshisService } from './bonoshis.service';

describe('BonoshisService', () => {
  let service: BonoshisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonoshisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

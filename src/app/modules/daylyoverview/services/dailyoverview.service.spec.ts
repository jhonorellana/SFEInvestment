import { TestBed } from '@angular/core/testing';

import { DailyoverviewService } from './dailyoverview.service';

describe('DailyoverviewService', () => {
  let service: DailyoverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyoverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

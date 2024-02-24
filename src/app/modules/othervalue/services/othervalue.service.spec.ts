import { TestBed } from '@angular/core/testing';

import { OthervalueService } from './othervalue.service';

describe('OthervalueService', () => {
  let service: OthervalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthervalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

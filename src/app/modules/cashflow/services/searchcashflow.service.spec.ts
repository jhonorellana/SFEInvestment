import { TestBed } from '@angular/core/testing';

import { SearchcashflowService } from './searchcashflow.service';

describe('SearchcashflowService', () => {
  let service: SearchcashflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchcashflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

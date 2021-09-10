import { TestBed } from '@angular/core/testing';

import { FpServiceService } from './fp-service.service';

describe('FpServiceService', () => {
  let service: FpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

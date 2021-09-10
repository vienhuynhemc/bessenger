import { TestBed } from '@angular/core/testing';

import { FpProcessServiceService } from './fp-process-service.service';

describe('FpProcessServiceService', () => {
  let service: FpProcessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpProcessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

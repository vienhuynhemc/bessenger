import { TestBed } from '@angular/core/testing';

import { FpVerifyEmailService } from './fp-verify-email.service';

describe('FpVerifyEmailService', () => {
  let service: FpVerifyEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpVerifyEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

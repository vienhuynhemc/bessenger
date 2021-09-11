import { TestBed } from '@angular/core/testing';

import { FpVerifyEmailWsService } from './fp-verify-email-ws.service';

describe('FpVerifyEmailWsService', () => {
  let service: FpVerifyEmailWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpVerifyEmailWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

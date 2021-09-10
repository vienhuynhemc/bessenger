import { TestBed } from '@angular/core/testing';

import { VerifyEmailWsService } from './verify-email-ws.service';

describe('VerifyEmailWsService', () => {
  let service: VerifyEmailWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyEmailWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

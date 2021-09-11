import { TestBed } from '@angular/core/testing';

import { FpProcessServiceWsService } from './fp-process-service-ws.service';

describe('FpProcessServiceWsService', () => {
  let service: FpProcessServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpProcessServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

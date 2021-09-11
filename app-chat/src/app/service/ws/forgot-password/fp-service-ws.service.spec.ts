import { TestBed } from '@angular/core/testing';

import { FpServiceWsService } from './fp-service-ws.service';

describe('FpServiceWsService', () => {
  let service: FpServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

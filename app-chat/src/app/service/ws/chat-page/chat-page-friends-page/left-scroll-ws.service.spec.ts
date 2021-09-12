import { TestBed } from '@angular/core/testing';

import { LeftScrollWsService } from './left-scroll-ws.service';

describe('LeftScrollWsService', () => {
  let service: LeftScrollWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftScrollWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

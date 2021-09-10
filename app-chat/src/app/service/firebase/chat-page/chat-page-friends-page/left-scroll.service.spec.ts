import { TestBed } from '@angular/core/testing';

import { LeftScrollService } from './left-scroll.service';

describe('LeftScrollService', () => {
  let service: LeftScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

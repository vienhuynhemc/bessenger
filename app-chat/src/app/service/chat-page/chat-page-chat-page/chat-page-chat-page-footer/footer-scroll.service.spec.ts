import { TestBed } from '@angular/core/testing';

import { FooterScrollService } from './footer-scroll.service';

describe('FooterScrollService', () => {
  let service: FooterScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

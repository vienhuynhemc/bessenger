import { TestBed } from '@angular/core/testing';

import { FooterScrollWsService } from './footer-scroll-ws.service';

describe('FooterScrollWsService', () => {
  let service: FooterScrollWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterScrollWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

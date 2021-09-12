import { TestBed } from '@angular/core/testing';

import { MessengerFooterWsService } from './messenger-footer-ws.service';

describe('MessengerFooterWsService', () => {
  let service: MessengerFooterWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerFooterWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MessengerHeaderWsService } from './messenger-header-ws.service';

describe('MessengerHeaderWsService', () => {
  let service: MessengerHeaderWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerHeaderWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

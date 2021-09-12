import { TestBed } from '@angular/core/testing';

import { MessengerMainWsService } from './messenger-main-ws.service';

describe('MessengerMainWsService', () => {
  let service: MessengerMainWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerMainWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

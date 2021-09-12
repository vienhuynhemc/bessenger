import { TestBed } from '@angular/core/testing';

import { RecallMessengerWsService } from './recall-messenger-ws.service';

describe('RecallMessengerWsService', () => {
  let service: RecallMessengerWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecallMessengerWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

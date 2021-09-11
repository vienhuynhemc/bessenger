import { TestBed } from '@angular/core/testing';

import { RecallMessengerService } from './recall-messenger.service';

describe('RecallMessengerService', () => {
  let service: RecallMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecallMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

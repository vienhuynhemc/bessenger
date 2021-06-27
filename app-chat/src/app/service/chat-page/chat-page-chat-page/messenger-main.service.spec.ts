import { TestBed } from '@angular/core/testing';

import { MessengerMainService } from './messenger-main.service';

describe('MessengerMainService', () => {
  let service: MessengerMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

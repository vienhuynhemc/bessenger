import { TestBed } from '@angular/core/testing';

import { MessengerHeaderService } from './messenger-header.service';

describe('MessengerHeaderService', () => {
  let service: MessengerHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

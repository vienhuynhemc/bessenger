import { TestBed } from '@angular/core/testing';

import { SendAddFriendWsService } from './send-add-friend-ws.service';

describe('SendAddFriendWsService', () => {
  let service: SendAddFriendWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendAddFriendWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

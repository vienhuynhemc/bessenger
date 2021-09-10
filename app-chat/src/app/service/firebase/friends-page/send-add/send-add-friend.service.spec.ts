import { TestBed } from '@angular/core/testing';

import { SendAddFriendService } from './send-add-friend.service';

describe('SendAddFriendService', () => {
  let service: SendAddFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendAddFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

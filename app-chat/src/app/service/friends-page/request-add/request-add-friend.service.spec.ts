import { TestBed } from '@angular/core/testing';

import { RequestAddFriendService } from './request-add-friend.service';

describe('RequestAddFriendService', () => {
  let service: RequestAddFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAddFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

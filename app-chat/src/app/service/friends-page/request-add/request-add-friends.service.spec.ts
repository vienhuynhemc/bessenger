import { TestBed } from '@angular/core/testing';

import { RequestAddFriendsService } from './request-add-friends.service';

describe('RequestAddFriendsService', () => {
  let service: RequestAddFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAddFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

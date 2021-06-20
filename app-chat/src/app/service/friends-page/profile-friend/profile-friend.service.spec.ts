import { TestBed } from '@angular/core/testing';

import { ProfileFriendService } from './profile-friend.service';

describe('ProfileFriendService', () => {
  let service: ProfileFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

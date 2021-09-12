import { TestBed } from '@angular/core/testing';

import { ProfileFriendWsService } from './profile-friend-ws.service';

describe('ProfileFriendWsService', () => {
  let service: ProfileFriendWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFriendWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

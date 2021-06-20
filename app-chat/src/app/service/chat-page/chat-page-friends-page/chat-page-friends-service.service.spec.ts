import { TestBed } from '@angular/core/testing';

import { ChatPageFriendsServiceService } from './chat-page-friends-service.service';

describe('ChatPageFriendsServiceService', () => {
  let service: ChatPageFriendsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageFriendsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

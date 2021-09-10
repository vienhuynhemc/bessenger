import { TestBed } from '@angular/core/testing';

import { ChatPageFriendsLeftServiceService } from './chat-page-friends-left-service.service';

describe('ChatPageFriendsLeftServiceService', () => {
  let service: ChatPageFriendsLeftServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageFriendsLeftServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

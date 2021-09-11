import { TestBed } from '@angular/core/testing';

import { ChatPageFriendsLeftServiceWsService } from './chat-page-friends-left-service-ws.service';

describe('ChatPageFriendsLeftServiceWsService', () => {
  let service: ChatPageFriendsLeftServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageFriendsLeftServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

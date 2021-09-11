import { TestBed } from '@angular/core/testing';

import { ChatPageFriendsServiceWsService } from './chat-page-friends-service-ws.service';

describe('ChatPageFriendsServiceWsService', () => {
  let service: ChatPageFriendsServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageFriendsServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

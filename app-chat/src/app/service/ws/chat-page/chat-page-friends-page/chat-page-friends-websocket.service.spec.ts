import { TestBed } from '@angular/core/testing';

import { ChatPageFriendsWebsocketService } from './chat-page-friends-websocket.service';

describe('ChatPageFriendsWebsocketService', () => {
  let service: ChatPageFriendsWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageFriendsWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

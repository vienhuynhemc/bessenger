import { TestBed } from '@angular/core/testing';

import { ChatPageChatPageScrollWsService } from './chat-page-chat-page-scroll-ws.service';

describe('ChatPageChatPageScrollWsService', () => {
  let service: ChatPageChatPageScrollWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageChatPageScrollWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

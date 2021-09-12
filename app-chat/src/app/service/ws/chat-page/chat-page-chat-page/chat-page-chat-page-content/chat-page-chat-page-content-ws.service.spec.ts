import { TestBed } from '@angular/core/testing';

import { ChatPageChatPageContentWsService } from './chat-page-chat-page-content-ws.service';

describe('ChatPageChatPageContentWsService', () => {
  let service: ChatPageChatPageContentWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageChatPageContentWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

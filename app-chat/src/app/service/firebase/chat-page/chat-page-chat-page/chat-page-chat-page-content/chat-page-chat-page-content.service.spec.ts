import { TestBed } from '@angular/core/testing';

import { ChatPageChatPageContentService } from './chat-page-chat-page-content.service';

describe('ChatPageChatPageContentService', () => {
  let service: ChatPageChatPageContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageChatPageContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

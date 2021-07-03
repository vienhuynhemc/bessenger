import { TestBed } from '@angular/core/testing';

import { ChatPageChatPageScrollService } from './chat-page-chat-page-scroll.service';

describe('ChatPageChatPageScrollService', () => {
  let service: ChatPageChatPageScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageChatPageScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

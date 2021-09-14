import { TestBed } from '@angular/core/testing';

import { ChatPageContentWebsocketService } from './chat-page-content-websocket.service';

describe('ChatPageContentWebsocketService', () => {
  let service: ChatPageContentWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageContentWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

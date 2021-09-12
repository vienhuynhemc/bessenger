import { TestBed } from '@angular/core/testing';

import { ChatPageCreateGroupWsService } from './chat-page-create-group-ws.service';

describe('ChatPageCreateGroupWsService', () => {
  let service: ChatPageCreateGroupWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageCreateGroupWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

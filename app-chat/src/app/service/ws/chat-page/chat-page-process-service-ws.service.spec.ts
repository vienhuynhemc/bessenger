import { TestBed } from '@angular/core/testing';

import { ChatPageProcessServiceWsService } from './chat-page-process-service-ws.service';

describe('ChatPageProcessServiceWsService', () => {
  let service: ChatPageProcessServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageProcessServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

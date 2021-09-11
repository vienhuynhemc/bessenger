import { TestBed } from '@angular/core/testing';

import { ChatPageProcessServiceService } from './chat-page-process-service.service';

describe('ChatPageProcessServiceService', () => {
  let service: ChatPageProcessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageProcessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

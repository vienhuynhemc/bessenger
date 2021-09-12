import { TestBed } from '@angular/core/testing';

import { ChatPageSettingWsService } from './chat-page-setting-ws.service';

describe('ChatPageSettingWsService', () => {
  let service: ChatPageSettingWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageSettingWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

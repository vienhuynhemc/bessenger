import { TestBed } from '@angular/core/testing';

import { SettingBoxChatWsService } from './setting-box-chat-ws.service';

describe('SettingBoxChatWsService', () => {
  let service: SettingBoxChatWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingBoxChatWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

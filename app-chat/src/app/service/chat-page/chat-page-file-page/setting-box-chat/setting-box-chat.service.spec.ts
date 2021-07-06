import { TestBed } from '@angular/core/testing';

import { SettingBoxChatService } from './setting-box-chat.service';

describe('SettingBoxChatService', () => {
  let service: SettingBoxChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingBoxChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

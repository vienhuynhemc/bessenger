import { TestBed } from '@angular/core/testing';

import { ChatPageSettingService } from './chat-page-setting.service';

describe('ChatPageSettingService', () => {
  let service: ChatPageSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

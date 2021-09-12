import { TestBed } from '@angular/core/testing';

import { SelectEmojiWsService } from './select-emoji-ws.service';

describe('SelectEmojiWsService', () => {
  let service: SelectEmojiWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectEmojiWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

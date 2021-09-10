import { TestBed } from '@angular/core/testing';

import { SelectEmojiService } from './select-emoji.service';

describe('SelectEmojiService', () => {
  let service: SelectEmojiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectEmojiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

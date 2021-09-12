import { TestBed } from '@angular/core/testing';

import { EmojiWsService } from './emoji-ws.service';

describe('EmojiWsService', () => {
  let service: EmojiWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StickerWsService } from './sticker-ws.service';

describe('StickerWsService', () => {
  let service: StickerWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickerWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StickersService } from './stickers.service';

describe('StickersService', () => {
  let service: StickersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

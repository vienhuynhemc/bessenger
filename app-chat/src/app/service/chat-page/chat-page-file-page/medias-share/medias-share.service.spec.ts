import { TestBed } from '@angular/core/testing';

import { MediasShareService } from './medias-share.service';

describe('MediasShareService', () => {
  let service: MediasShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediasShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

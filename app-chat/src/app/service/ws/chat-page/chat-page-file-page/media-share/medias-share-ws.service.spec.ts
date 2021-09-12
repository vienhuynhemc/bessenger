import { TestBed } from '@angular/core/testing';

import { MediasShareWsService } from './medias-share-ws.service';

describe('MediasShareWsService', () => {
  let service: MediasShareWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediasShareWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

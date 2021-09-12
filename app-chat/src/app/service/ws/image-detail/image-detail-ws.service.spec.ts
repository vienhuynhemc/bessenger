import { TestBed } from '@angular/core/testing';

import { ImageDetailWsService } from './image-detail-ws.service';

describe('ImageDetailWsService', () => {
  let service: ImageDetailWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDetailWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

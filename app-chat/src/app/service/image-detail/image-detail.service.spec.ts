import { TestBed } from '@angular/core/testing';

import { ImageDetailService } from './image-detail.service';

describe('ImageDetailService', () => {
  let service: ImageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

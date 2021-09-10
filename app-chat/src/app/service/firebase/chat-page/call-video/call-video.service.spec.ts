import { TestBed } from '@angular/core/testing';

import { CallVideoService } from './call-video.service';

describe('CallVideoService', () => {
  let service: CallVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

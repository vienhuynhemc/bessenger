import { TestBed } from '@angular/core/testing';

import { CallVideoWsService } from './call-video-ws.service';

describe('CallVideoWsService', () => {
  let service: CallVideoWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallVideoWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

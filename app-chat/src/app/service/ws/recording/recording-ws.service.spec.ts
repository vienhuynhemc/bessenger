import { TestBed } from '@angular/core/testing';

import { RecordingWsService } from './recording-ws.service';

describe('RecordingWsService', () => {
  let service: RecordingWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordingWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

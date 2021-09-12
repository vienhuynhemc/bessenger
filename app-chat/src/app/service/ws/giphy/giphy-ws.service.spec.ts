import { TestBed } from '@angular/core/testing';

import { GiphyWsService } from './giphy-ws.service';

describe('GiphyWsService', () => {
  let service: GiphyWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiphyWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

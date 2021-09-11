import { TestBed } from '@angular/core/testing';

import { MainPageWsService } from './main-page-ws.service';

describe('MainPageWsService', () => {
  let service: MainPageWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

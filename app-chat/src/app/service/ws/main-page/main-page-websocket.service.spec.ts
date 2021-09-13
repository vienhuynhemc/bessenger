import { TestBed } from '@angular/core/testing';

import { MainPageWebsocketService } from './main-page-websocket.service';

describe('MainPageWebsocketService', () => {
  let service: MainPageWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

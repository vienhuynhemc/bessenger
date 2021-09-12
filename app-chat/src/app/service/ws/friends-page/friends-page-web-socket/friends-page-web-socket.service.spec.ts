import { TestBed } from '@angular/core/testing';

import { FriendsPageWebSocketService } from './friends-page-web-socket.service';

describe('FriendsPageWebSocketService', () => {
  let service: FriendsPageWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsPageWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

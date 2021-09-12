import { TestBed } from '@angular/core/testing';

import { RequestAddFriendsWsService } from './request-add-friends-ws.service';

describe('RequestAddFriendsWsService', () => {
  let service: RequestAddFriendsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAddFriendsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

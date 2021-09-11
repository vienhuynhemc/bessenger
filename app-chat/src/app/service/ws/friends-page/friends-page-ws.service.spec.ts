import { TestBed } from '@angular/core/testing';

import { FriendsPageWsService } from './friends-page-ws.service';

describe('FriendsPageWsService', () => {
  let service: FriendsPageWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsPageWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

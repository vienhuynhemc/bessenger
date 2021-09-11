import { TestBed } from '@angular/core/testing';

import { AddFriendsWsService } from './add-friends-ws.service';

describe('AddFriendsWsService', () => {
  let service: AddFriendsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFriendsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

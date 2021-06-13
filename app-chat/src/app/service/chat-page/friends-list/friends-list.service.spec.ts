import { TestBed } from '@angular/core/testing';

import { FriendsListService } from './friends-list.service';

describe('FriendsListService', () => {
  let service: FriendsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

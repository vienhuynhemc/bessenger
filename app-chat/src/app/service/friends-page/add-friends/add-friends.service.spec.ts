import { TestBed } from '@angular/core/testing';

import { AddFriendsService } from './add-friends.service';

describe('AddFriendsService', () => {
  let service: AddFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

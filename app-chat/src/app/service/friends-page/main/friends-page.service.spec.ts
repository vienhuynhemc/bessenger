import { TestBed } from '@angular/core/testing';

import { FriendsPageService } from './friends-page.service';

describe('FriendsPageService', () => {
  let service: FriendsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

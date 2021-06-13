import { TestBed } from '@angular/core/testing';

import { UserOnlineService } from './user-online.service';

describe('UserOnlineService', () => {
  let service: UserOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

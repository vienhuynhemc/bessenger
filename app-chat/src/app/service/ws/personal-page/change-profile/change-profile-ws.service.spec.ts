import { TestBed } from '@angular/core/testing';

import { ChangeProfileWsService } from './change-profile-ws.service';

describe('ChangeProfileWsService', () => {
  let service: ChangeProfileWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeProfileWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

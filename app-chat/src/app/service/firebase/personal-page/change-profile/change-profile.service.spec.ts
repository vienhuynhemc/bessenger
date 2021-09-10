import { TestBed } from '@angular/core/testing';

import { ChangeProfileService } from './change-profile.service';

describe('ChangeProfileService', () => {
  let service: ChangeProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

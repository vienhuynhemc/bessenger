import { TestBed } from '@angular/core/testing';

import { ChangeAvatarService } from './change-avatar.service';

describe('ChangeAvatarService', () => {
  let service: ChangeAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

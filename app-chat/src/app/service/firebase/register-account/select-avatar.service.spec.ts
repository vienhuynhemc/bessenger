import { TestBed } from '@angular/core/testing';

import { SelectAvatarService } from './select-avatar.service';

describe('SelectAvatarService', () => {
  let service: SelectAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

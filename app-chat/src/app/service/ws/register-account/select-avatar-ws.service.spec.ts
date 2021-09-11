import { TestBed } from '@angular/core/testing';

import { SelectAvatarWsService } from './select-avatar-ws.service';

describe('SelectAvatarWsService', () => {
  let service: SelectAvatarWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAvatarWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

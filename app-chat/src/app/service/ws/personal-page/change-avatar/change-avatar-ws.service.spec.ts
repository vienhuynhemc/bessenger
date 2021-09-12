import { TestBed } from '@angular/core/testing';

import { ChangeAvatarWsService } from './change-avatar-ws.service';

describe('ChangeAvatarWsService', () => {
  let service: ChangeAvatarWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeAvatarWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

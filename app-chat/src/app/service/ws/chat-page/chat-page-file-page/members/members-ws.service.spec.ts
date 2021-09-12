import { TestBed } from '@angular/core/testing';

import { MembersWsService } from './members-ws.service';

describe('MembersWsService', () => {
  let service: MembersWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

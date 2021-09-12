import { TestBed } from '@angular/core/testing';

import { ChangePassWsService } from './change-pass-ws.service';

describe('ChangePassWsService', () => {
  let service: ChangePassWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePassWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

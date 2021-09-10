import { TestBed } from '@angular/core/testing';

import { LoginWsWsService } from './login-ws-ws.service';

describe('LoginWsWsService', () => {
  let service: LoginWsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginWsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoginWsService } from './login-ws.service';

describe('LoginWsService', () => {
  let service: LoginWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegisterAccountWsService } from './register-account-ws.service';

describe('RegisterAccountWsService', () => {
  let service: RegisterAccountWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAccountWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegisterAccountService } from './register-account.service';

describe('RegisterAccountService', () => {
  let service: RegisterAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

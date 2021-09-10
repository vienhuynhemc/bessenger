import { TestBed } from '@angular/core/testing';

import { RegisterProcessService } from './register-process.service';

describe('RegisterProcessService', () => {
  let service: RegisterProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

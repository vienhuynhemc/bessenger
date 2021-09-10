import { TestBed } from '@angular/core/testing';

import { RegisterProcessWsService } from './register-process-ws.service';

describe('RegisterProcessWsService', () => {
  let service: RegisterProcessWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterProcessWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

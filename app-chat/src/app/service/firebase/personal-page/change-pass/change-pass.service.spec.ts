import { TestBed } from '@angular/core/testing';

import { ChangePassService } from './change-pass.service';

describe('ChangePassService', () => {
  let service: ChangePassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

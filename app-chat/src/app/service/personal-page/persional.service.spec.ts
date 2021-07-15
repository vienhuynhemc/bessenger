import { TestBed } from '@angular/core/testing';

import { PersionalService } from './persional.service';

describe('PersionalService', () => {
  let service: PersionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

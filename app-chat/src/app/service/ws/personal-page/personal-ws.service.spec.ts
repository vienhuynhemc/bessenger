import { TestBed } from '@angular/core/testing';

import { PersonalWsService } from './personal-ws.service';

describe('PersonalWsService', () => {
  let service: PersonalWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ContactsWsService } from './contacts-ws.service';

describe('ContactsWsService', () => {
  let service: ContactsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

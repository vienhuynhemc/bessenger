import { TestBed } from '@angular/core/testing';

import { MessengerFooterService } from './messenger-footer.service';

describe('MessengerFooterService', () => {
  let service: MessengerFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

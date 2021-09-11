import { TestBed } from '@angular/core/testing';

import { NotificationFpPageService } from './notification-fp-page.service';

describe('NotificationFpPageService', () => {
  let service: NotificationFpPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFpPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

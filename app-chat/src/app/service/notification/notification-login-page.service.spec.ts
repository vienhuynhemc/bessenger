import { TestBed } from '@angular/core/testing';

import { NotificationLoginPageService } from './notification-login-page.service';

describe('NotificationLoginPageService', () => {
  let service: NotificationLoginPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationLoginPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

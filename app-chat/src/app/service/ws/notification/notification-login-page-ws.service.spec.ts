import { TestBed } from '@angular/core/testing';

import { NotificationLoginPageWsService } from './notification-login-page-ws.service';

describe('NotificationLoginPageWsService', () => {
  let service: NotificationLoginPageWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationLoginPageWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

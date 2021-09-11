import { TestBed } from '@angular/core/testing';

import { NotificationRegisterPageWsService } from './notification-register-page-ws.service';

describe('NotificationRegisterPageWsService', () => {
  let service: NotificationRegisterPageWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationRegisterPageWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

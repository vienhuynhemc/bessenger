import { TestBed } from '@angular/core/testing';

import { NotificationRegisterPageService } from './notification-register-page.service';

describe('NotificationRegisterPageService', () => {
  let service: NotificationRegisterPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationRegisterPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

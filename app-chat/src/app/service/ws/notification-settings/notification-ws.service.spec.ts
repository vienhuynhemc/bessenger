import { TestBed } from '@angular/core/testing';

import { NotificationWsService } from './notification-ws.service';

describe('NotificationWsService', () => {
  let service: NotificationWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

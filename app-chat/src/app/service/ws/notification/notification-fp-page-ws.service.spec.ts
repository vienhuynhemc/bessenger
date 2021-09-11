import { TestBed } from '@angular/core/testing';

import { NotificationFpPageWsService } from './notification-fp-page-ws.service';

describe('NotificationFpPageWsService', () => {
  let service: NotificationFpPageWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFpPageWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

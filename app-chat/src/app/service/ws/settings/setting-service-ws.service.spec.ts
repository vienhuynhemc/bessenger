import { TestBed } from '@angular/core/testing';

import { SettingServiceWsService } from './setting-service-ws.service';

describe('SettingServiceWsService', () => {
  let service: SettingServiceWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingServiceWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

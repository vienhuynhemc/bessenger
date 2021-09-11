import { TestBed } from '@angular/core/testing';

import { MyNameWsService } from './my-name-ws.service';

describe('MyNameWsService', () => {
  let service: MyNameWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyNameWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

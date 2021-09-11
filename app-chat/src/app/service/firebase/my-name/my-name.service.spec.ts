import { TestBed } from '@angular/core/testing';

import { MyNameService } from './my-name.service';

describe('MyNameService', () => {
  let service: MyNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

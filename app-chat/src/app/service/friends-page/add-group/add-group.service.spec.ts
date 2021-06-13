import { TestBed } from '@angular/core/testing';

import { AddGroupService } from './add-group.service';

describe('AddGroupService', () => {
  let service: AddGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

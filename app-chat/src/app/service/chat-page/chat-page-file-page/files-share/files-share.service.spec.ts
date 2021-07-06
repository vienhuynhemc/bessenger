import { TestBed } from '@angular/core/testing';

import { FilesShareService } from './files-share.service';

describe('FilesShareService', () => {
  let service: FilesShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

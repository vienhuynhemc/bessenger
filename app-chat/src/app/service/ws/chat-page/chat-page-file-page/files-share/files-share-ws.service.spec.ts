import { TestBed } from '@angular/core/testing';

import { FilesShareWsService } from './files-share-ws.service';

describe('FilesShareWsService', () => {
  let service: FilesShareWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesShareWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

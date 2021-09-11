import { TestBed } from '@angular/core/testing';

import { ChatPageCreateGroupService } from './chat-page-create-group.service';

describe('ChatPageCreateGroupService', () => {
  let service: ChatPageCreateGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageCreateGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

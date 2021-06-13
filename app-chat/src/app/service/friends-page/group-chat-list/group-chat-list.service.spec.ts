import { TestBed } from '@angular/core/testing';

import { GroupChatListService } from './group-chat-list.service';

describe('GroupChatListService', () => {
  let service: GroupChatListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupChatListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

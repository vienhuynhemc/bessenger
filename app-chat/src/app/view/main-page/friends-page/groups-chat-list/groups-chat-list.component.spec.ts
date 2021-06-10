import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsChatListComponent } from './groups-chat-list.component';

describe('GroupsChatListComponent', () => {
  let component: GroupsChatListComponent;
  let fixture: ComponentFixture<GroupsChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsChatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

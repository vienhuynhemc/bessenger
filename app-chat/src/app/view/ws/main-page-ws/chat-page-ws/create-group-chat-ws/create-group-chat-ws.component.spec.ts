import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupChatWsComponent } from './create-group-chat-ws.component';

describe('CreateGroupChatWsComponent', () => {
  let component: CreateGroupChatWsComponent;
  let fixture: ComponentFixture<CreateGroupChatWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupChatWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupChatWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

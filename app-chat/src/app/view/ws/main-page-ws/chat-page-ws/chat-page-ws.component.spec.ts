import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageWsComponent } from './chat-page-ws.component';

describe('ChatPageWsComponent', () => {
  let component: ChatPageWsComponent;
  let fixture: ComponentFixture<ChatPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

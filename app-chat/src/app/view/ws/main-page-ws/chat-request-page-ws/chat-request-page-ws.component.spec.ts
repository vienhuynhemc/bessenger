import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRequestPageWsComponent } from './chat-request-page-ws.component';

describe('ChatRequestPageWsComponent', () => {
  let component: ChatRequestPageWsComponent;
  let fixture: ComponentFixture<ChatRequestPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRequestPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRequestPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

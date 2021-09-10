import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRequestPageComponent } from './chat-request-page.component';

describe('ChatRequestPageComponent', () => {
  let component: ChatRequestPageComponent;
  let fixture: ComponentFixture<ChatRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

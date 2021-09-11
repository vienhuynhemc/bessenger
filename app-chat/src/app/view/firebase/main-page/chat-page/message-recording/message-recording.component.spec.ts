import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecordingComponent } from './message-recording.component';

describe('MessageRecordingComponent', () => {
  let component: MessageRecordingComponent;
  let fixture: ComponentFixture<MessageRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengeRecordingWsComponent } from './messenge-recording-ws.component';

describe('MessengeRecordingWsComponent', () => {
  let component: MessengeRecordingWsComponent;
  let fixture: ComponentFixture<MessengeRecordingWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengeRecordingWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengeRecordingWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

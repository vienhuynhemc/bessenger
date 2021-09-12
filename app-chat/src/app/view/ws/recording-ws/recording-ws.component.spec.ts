import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingWsComponent } from './recording-ws.component';

describe('RecordingWsComponent', () => {
  let component: RecordingWsComponent;
  let fixture: ComponentFixture<RecordingWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

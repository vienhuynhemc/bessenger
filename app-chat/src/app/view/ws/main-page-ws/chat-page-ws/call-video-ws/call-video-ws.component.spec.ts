import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallVideoWsComponent } from './call-video-ws.component';

describe('CallVideoWsComponent', () => {
  let component: CallVideoWsComponent;
  let fixture: ComponentFixture<CallVideoWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallVideoWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallVideoWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

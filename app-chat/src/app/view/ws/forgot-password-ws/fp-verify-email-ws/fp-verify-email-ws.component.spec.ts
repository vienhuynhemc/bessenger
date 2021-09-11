import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpVerifyEmailWsComponent } from './fp-verify-email-ws.component';

describe('FpVerifyEmailWsComponent', () => {
  let component: FpVerifyEmailWsComponent;
  let fixture: ComponentFixture<FpVerifyEmailWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpVerifyEmailWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpVerifyEmailWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

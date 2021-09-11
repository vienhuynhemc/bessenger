import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordWsComponent } from './forgot-password-ws.component';

describe('ForgotPasswordWsComponent', () => {
  let component: ForgotPasswordWsComponent;
  let fixture: ComponentFixture<ForgotPasswordWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

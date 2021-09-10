import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailWsComponent } from './verify-email-ws.component';

describe('VerifyEmailWsComponent', () => {
  let component: VerifyEmailWsComponent;
  let fixture: ComponentFixture<VerifyEmailWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

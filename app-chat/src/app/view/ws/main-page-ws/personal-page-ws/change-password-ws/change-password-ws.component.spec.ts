import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordWsComponent } from './change-password-ws.component';

describe('ChangePasswordWsComponent', () => {
  let component: ChangePasswordWsComponent;
  let fixture: ComponentFixture<ChangePasswordWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

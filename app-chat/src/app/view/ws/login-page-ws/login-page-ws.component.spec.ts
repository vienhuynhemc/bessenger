import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageWsComponent } from './login-page-ws.component';

describe('LoginPageWsComponent', () => {
  let component: LoginPageWsComponent;
  let fixture: ComponentFixture<LoginPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

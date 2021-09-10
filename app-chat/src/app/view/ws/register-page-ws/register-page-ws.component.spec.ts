import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageWsComponent } from './register-page-ws.component';

describe('RegisterPageWsComponent', () => {
  let component: RegisterPageWsComponent;
  let fixture: ComponentFixture<RegisterPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

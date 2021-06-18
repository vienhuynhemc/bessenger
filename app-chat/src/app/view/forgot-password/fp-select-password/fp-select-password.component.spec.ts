import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpSelectPasswordComponent } from './fp-select-password.component';

describe('FpSelectPasswordComponent', () => {
  let component: FpSelectPasswordComponent;
  let fixture: ComponentFixture<FpSelectPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpSelectPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpSelectPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

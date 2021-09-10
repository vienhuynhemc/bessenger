import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpVerifyEmailComponent } from './fp-verify-email.component';

describe('FpVerifyEmailComponent', () => {
  let component: FpVerifyEmailComponent;
  let fixture: ComponentFixture<FpVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpVerifyEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

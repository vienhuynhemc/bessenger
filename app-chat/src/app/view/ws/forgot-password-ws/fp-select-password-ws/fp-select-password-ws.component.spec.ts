import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpSelectPasswordWsComponent } from './fp-select-password-ws.component';

describe('FpSelectPasswordWsComponent', () => {
  let component: FpSelectPasswordWsComponent;
  let fixture: ComponentFixture<FpSelectPasswordWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpSelectPasswordWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpSelectPasswordWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

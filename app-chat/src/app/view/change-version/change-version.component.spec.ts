import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVersionComponent } from './change-version.component';

describe('ChangeVersionComponent', () => {
  let component: ChangeVersionComponent;
  let fixture: ComponentFixture<ChangeVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

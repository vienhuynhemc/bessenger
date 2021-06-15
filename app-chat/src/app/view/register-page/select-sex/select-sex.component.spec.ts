import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSexComponent } from './select-sex.component';

describe('SelectSexComponent', () => {
  let component: SelectSexComponent;
  let fixture: ComponentFixture<SelectSexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

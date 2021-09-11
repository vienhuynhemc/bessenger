import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVersionStreetComponent } from './change-version-street.component';

describe('ChangeVersionStreetComponent', () => {
  let component: ChangeVersionStreetComponent;
  let fixture: ComponentFixture<ChangeVersionStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeVersionStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeVersionStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSexWsComponent } from './select-sex-ws.component';

describe('SelectSexWsComponent', () => {
  let component: SelectSexWsComponent;
  let fixture: ComponentFixture<SelectSexWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSexWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSexWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

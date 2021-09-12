import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSettingsWsComponent } from './status-settings-ws.component';

describe('StatusSettingsWsComponent', () => {
  let component: StatusSettingsWsComponent;
  let fixture: ComponentFixture<StatusSettingsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSettingsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSettingsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

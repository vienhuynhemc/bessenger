import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPageWsComponent } from './setting-page-ws.component';

describe('SettingPageWsComponent', () => {
  let component: SettingPageWsComponent;
  let fixture: ComponentFixture<SettingPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

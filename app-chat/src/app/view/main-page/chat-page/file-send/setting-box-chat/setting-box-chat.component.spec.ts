import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBoxChatComponent } from './setting-box-chat.component';

describe('SettingBoxChatComponent', () => {
  let component: SettingBoxChatComponent;
  let fixture: ComponentFixture<SettingBoxChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBoxChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBoxChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

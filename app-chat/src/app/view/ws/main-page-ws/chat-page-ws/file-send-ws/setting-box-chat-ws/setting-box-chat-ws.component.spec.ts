import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBoxChatWsComponent } from './setting-box-chat-ws.component';

describe('SettingBoxChatWsComponent', () => {
  let component: SettingBoxChatWsComponent;
  let fixture: ComponentFixture<SettingBoxChatWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBoxChatWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBoxChatWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

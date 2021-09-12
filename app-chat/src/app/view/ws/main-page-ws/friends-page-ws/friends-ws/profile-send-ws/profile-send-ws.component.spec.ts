import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSendWsComponent } from './profile-send-ws.component';

describe('ProfileSendWsComponent', () => {
  let component: ProfileSendWsComponent;
  let fixture: ComponentFixture<ProfileSendWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSendWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSendWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

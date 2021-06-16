import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSendComponent } from './profile-send.component';

describe('ProfileSendComponent', () => {
  let component: ProfileSendComponent;
  let fixture: ComponentFixture<ProfileSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

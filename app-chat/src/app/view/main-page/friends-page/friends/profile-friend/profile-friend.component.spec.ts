import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendComponent } from './profile-friend.component';

describe('ProfileFriendComponent', () => {
  let component: ProfileFriendComponent;
  let fixture: ComponentFixture<ProfileFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

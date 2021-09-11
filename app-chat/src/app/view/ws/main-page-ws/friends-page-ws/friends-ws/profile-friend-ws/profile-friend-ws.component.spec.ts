import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendWsComponent } from './profile-friend-ws.component';

describe('ProfileFriendWsComponent', () => {
  let component: ProfileFriendWsComponent;
  let fixture: ComponentFixture<ProfileFriendWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFriendWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFriendWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddWsComponent } from './profile-add-ws.component';

describe('ProfileAddWsComponent', () => {
  let component: ProfileAddWsComponent;
  let fixture: ComponentFixture<ProfileAddWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAddWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAddWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

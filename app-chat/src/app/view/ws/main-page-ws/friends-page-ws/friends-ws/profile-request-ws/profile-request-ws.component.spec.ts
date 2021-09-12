import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRequestWsComponent } from './profile-request-ws.component';

describe('ProfileRequestWsComponent', () => {
  let component: ProfileRequestWsComponent;
  let fixture: ComponentFixture<ProfileRequestWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRequestWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRequestWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

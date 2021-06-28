import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfferComponent } from './profile-offer.component';

describe('ProfileOfferComponent', () => {
  let component: ProfileOfferComponent;
  let fixture: ComponentFixture<ProfileOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

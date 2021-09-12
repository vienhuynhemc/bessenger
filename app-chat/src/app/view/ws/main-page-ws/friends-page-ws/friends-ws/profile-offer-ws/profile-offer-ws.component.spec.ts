import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfferWsComponent } from './profile-offer-ws.component';

describe('ProfileOfferWsComponent', () => {
  let component: ProfileOfferWsComponent;
  let fixture: ComponentFixture<ProfileOfferWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOfferWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfferWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

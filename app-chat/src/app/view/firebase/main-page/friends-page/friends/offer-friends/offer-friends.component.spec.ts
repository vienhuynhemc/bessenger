import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFriendsComponent } from './offer-friends.component';

describe('OfferFriendsComponent', () => {
  let component: OfferFriendsComponent;
  let fixture: ComponentFixture<OfferFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

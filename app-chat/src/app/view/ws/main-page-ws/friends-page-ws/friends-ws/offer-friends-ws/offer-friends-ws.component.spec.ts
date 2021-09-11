import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFriendsWsComponent } from './offer-friends-ws.component';

describe('OfferFriendsWsComponent', () => {
  let component: OfferFriendsWsComponent;
  let fixture: ComponentFixture<OfferFriendsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferFriendsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFriendsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

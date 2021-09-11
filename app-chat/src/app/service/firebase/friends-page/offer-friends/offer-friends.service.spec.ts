import { TestBed } from '@angular/core/testing';

import { OfferFriendsService } from './offer-friends.service';

describe('OfferFriendsService', () => {
  let service: OfferFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

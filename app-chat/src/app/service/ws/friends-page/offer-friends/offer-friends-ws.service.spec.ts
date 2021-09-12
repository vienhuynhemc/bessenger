import { TestBed } from '@angular/core/testing';

import { OfferFriendsWsService } from './offer-friends-ws.service';

describe('OfferFriendsWsService', () => {
  let service: OfferFriendsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferFriendsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-offer-friends',
  templateUrl: './offer-friends.component.html',
  styleUrls: ['./offer-friends.component.scss']
})
export class OfferFriendsComponent implements OnInit {

  constructor(
    public friendsPageService: FriendsPageService
    ) { }

  ngOnInit(): void {
    this.friendsPageService.selectedOffersFriendsService();
  }

}

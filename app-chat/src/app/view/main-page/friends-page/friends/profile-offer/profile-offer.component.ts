import { Component, OnInit } from '@angular/core';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-profile-offer',
  templateUrl: './profile-offer.component.html',
  styleUrls: ['./profile-offer.component.scss']
})
export class ProfileOfferComponent implements OnInit {

  constructor( public friendsPageService: FriendsPageService
  ) { }

  ngOnInit(): void {
   
  }

}

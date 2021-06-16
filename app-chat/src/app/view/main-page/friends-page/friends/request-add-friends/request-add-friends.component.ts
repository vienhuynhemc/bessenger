import { Component, OnInit } from '@angular/core';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-request-add-friends',
  templateUrl: './request-add-friends.component.html',
  styleUrls: ['./request-add-friends.component.scss']
})
export class RequestAddFriendsComponent implements OnInit {

  constructor(
    public friendsPageService: FriendsPageService
  ) { }

  ngOnInit(): void {
    this.friendsPageService.selectedRequestService();
  }

}

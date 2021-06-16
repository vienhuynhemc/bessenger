import { Component, OnInit } from '@angular/core';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-send-requset-add',
  templateUrl: './send-requset-add.component.html',
  styleUrls: ['./send-requset-add.component.scss']
})
export class SendRequsetAddComponent implements OnInit {

  constructor(
    public friendsPageService: FriendsPageService
  ) { }

  ngOnInit(): void {
    this.friendsPageService.selectedSendService();
  }


}

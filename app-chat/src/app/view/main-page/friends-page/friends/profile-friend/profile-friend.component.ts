import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit {
  myFriend = {
    name:'Melieni Sherk',
    link:'assets/images/list-friends-chat-page/ol4.jpg'
  }
  constructor() { }

  ngOnInit(): void {
  }

}

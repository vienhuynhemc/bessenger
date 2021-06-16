import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit, OnDestroy {
  myFriend = {
    name:'Melieni Sherk',
    link:'assets/images/list-friends-chat-page/ol4.jpg'
  }
  friendInfor: FriendInfor = null;
  valueFromFriendsComponent: Subscription;
  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.getFriendFromFriendsList();
    
  }
  ngOnDestroy(): void {

  }
  
   // đồng bộ dữ liệu với friends list
  getFriendFromFriendsList() {
    this.contactsService.friendInforService.subscribe(friendInfor => this.friendInfor = friendInfor);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';

@Component({
  selector: 'app-profile-send',
  templateUrl: './profile-send.component.html',
  styleUrls: ['./profile-send.component.scss']
})
export class ProfileSendComponent implements OnInit, OnDestroy {
  friendInfor: FriendInfor = null;
  private valueFromChildSubscription: Subscription;
  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsSend();
   
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
   // đồng bộ dữ liệu với friends list
   getFriendFromFriendsSend() {
    this.valueFromChildSubscription = this.contactsService.friendInforService.subscribe(friendInfor =>{ 
      this.friendInfor = friendInfor
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';

@Component({
  selector: 'app-profile-request',
  templateUrl: './profile-request.component.html',
  styleUrls: ['./profile-request.component.scss']
})
export class ProfileRequestComponent implements OnInit {
  friendInfor: FriendInfor = null;
  private valueFromChildSubscription: Subscription;
  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsRequestAdd();
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
   // đồng bộ dữ liệu với friends list
   getFriendFromFriendsRequestAdd() {
    this.valueFromChildSubscription = this.contactsService.friendInforService.subscribe(friendInfor =>{ 
      this.friendInfor = friendInfor
    });
  }

}

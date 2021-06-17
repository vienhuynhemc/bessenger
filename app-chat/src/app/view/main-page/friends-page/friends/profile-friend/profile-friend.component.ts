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
 
  imgBackground: string = null;
  random: number = -1;
  friendInfor: FriendInfor = null;
  private valueFromChildSubscription: Subscription;
 
  constructor(private contactsService: ContactsService) { }
  randomImgBackground() {
    let randomNew = 0;
    do {
      randomNew = Math.floor(Math.random() * 3);
    }while(randomNew === this.random)
    this.random = randomNew;
    if(randomNew === 0) 
      this.imgBackground = "assets/images/list-friends-friends-page/bg-profile-myfriend.jpg";
    else if(randomNew === 1)
      this.imgBackground = "assets/images/list-friends-friends-page/bg-profile-myfriend2.jpg";
    else
      this.imgBackground = "assets/images/list-friends-friends-page/bg-profile-myfriend3.jpg";
  }
  ngOnInit(): void {
    this.getFriendFromFriendsList();
    
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  
   // đồng bộ dữ liệu với friends list
  getFriendFromFriendsList() {
    this.valueFromChildSubscription = this.contactsService.friendInforService.subscribe(friendInfor =>{ 
      this.friendInfor = friendInfor,
      this.randomImgBackground()
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/friends-page/profile-friend/profile-friend.service';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit, OnDestroy {
  listFiends: FriendInfor[];
  imgBackground: string = null;
  random: number = -1;
  friendInfor: FriendInfor;
  private valueFromChildSubscription: Subscription;
  iDUrl:any;
  valueSub: Subscription;
  constructor(private contactsService: ContactsService,
    private profileFriendService: ProfileFriendService
    ) { }
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
    this.friendInfor = new FriendInfor()
    this.valueFromChildSubscription = this.contactsService.friendInforService.subscribe(id =>{
      this.randomImgBackground()
        this.profileFriendService.getInforFriend(id).on('value', (data) => {
          if(data.val() !== null) {
            this.friendInfor.id = id;
            this.friendInfor.img = data.val().link_hinh;
            this.friendInfor.name = data.val().ten;
          }
        });
    });
   
  }
}

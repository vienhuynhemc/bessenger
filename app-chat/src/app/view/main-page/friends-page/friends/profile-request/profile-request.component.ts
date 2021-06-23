import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/friends-page/request_infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/friends-page/profile-friend/profile-friend.service';
import { RequestAddFriendsService } from 'src/app/service/friends-page/request-add/request-add-friends.service';

@Component({
  selector: 'app-profile-request',
  templateUrl: './profile-request.component.html',
  styleUrls: ['./profile-request.component.scss']
})
export class ProfileRequestComponent implements OnInit, OnDestroy {
  friendInfor: RequestInfor;
  private valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private profileFriendService: ProfileFriendService,
    public friendsPageService: FriendsPageService,
    private requestAddService: RequestAddFriendsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsRequestAdd();
   
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
   
  }

   // đồng bộ dữ liệu với friends list
   getFriendFromFriendsRequestAdd() {
    this.friendInfor = new RequestInfor();
    this.friendInfor.id = 1;
    this.valueFromChildSubscription =
      this.contactsService.friendInforService.subscribe((id) => {
        
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInfor.id = 1;
        } else {
          this.requestAddService.getInforRequest(id).once('value', (data) => {
            if (data.val() != null) {
              this.friendInfor.id = id;
              this.friendInfor.img = data.val().link_hinh;
              this.friendInfor.name = data.val().ten;
            } else {
              this.router.navigate(['/**'])
              this.contactsService.setFriendInforService(null);
            }
           
          });
        }
      
      });
  }

}

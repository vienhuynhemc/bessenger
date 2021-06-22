import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/friends-page/profile-friend/profile-friend.service';
import { FriendsComponent } from '../contacts/friends.component';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss'],
})
export class ProfileFriendComponent implements OnInit, OnDestroy {
  listFiends: FriendInfor[];
  random: number = -1;
  friendInfor: FriendInfor;
  private valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor(
    private contactsService: ContactsService,
    private profileFriendService: ProfileFriendService,
    public friendsPageService: FriendsPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFriendFromFriendsList();
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  // lấy ra người muốn hủy kết bạn
  onClickUnFriend(id: string, name: string) {
    this.friendsPageService.setIDUnFriend(id);
    this.friendsPageService.setNameUnFriend(name)
  }
  // đồng bộ dữ liệu với friends list
  getFriendFromFriendsList() {
    this.friendInfor = new FriendInfor();
    this.friendInfor.id = 1;
    let checkLoop = 0;
    this.valueFromChildSubscription =
      this.contactsService.friendInforService.subscribe((id) => {
        // kiểm tra 404
        checkLoop = 0;
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInfor.id = 1;
        } else {
          this.profileFriendService.getInforFriend(id).once('value', (data) => {
            if (data.val() != null) {
              this.friendInfor.id = id;
              this.friendInfor.img = data.val().link_hinh;
              this.friendInfor.name = data.val().ten;
              checkLoop++;
            } 
            if(checkLoop == 0) {
              this.router.navigate(['/**']);
            }
          });
        }
        // loading
        setTimeout(() => {
          this.friendsPageService.setLoading(false);
        }, 0);
      });
  }
}

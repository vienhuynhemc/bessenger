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
    private router: Router,
  ) {}
    // chuyển đến trang tin nhắn
    onClickMessage(id: string) {
      let countCheck = 0;
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.profileFriendService.getConversation().once('value', (data) => {
        data.forEach(element_x => {
            console.log(element_x.key)
            if(countCheck != -1) {
              element_x.forEach(element => {
                  if(element.key == parseIDUser || element.key == id)
                    countCheck++;
              });
              if(countCheck == 2) {
                this.profileFriendService.getKindConversation(element_x.key).once('value',(data) => {
                    if(data.val().loai_cuoc_tro_truyen == 'don') {
                      this.router.navigate(['/bessenger/tin-nhan/' + element_x.key]);
                      countCheck = -1;
                    }
                })
              } else 
              countCheck = 0;
          }
        });
      })
    }
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
            } else {
              this.router.navigate(['/**'])
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

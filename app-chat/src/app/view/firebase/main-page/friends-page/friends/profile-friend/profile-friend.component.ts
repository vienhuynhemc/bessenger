import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/firebase/friends-page/profile-friend/profile-friend.service';
import { FriendsComponent } from '../contacts/friends.component';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss'],
})
export class ProfileFriendComponent implements OnInit, OnDestroy {
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
    let idCheck
    this.valueFromChildSubscription =
      this.contactsService.friendInforService.subscribe((id) => {
       
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInfor.id = 1;
        } else {
          idCheck = id;
          this.profileFriendService.getInforFriend(id).on('value', (data) => {
            
            if(idCheck == data.key) {
              if (data.val() != null) {
                this.friendInfor.id = id;
                this.friendInfor.img = data.val().link_hinh;
                this.friendInfor.name = data.val().ten;
                this.friendInfor.sex = data.val().gioi_tinh
              } else {
                this.router.navigate(['/**'])
                this.contactsService.setFriendInforService(null);
              }
           }
          });
        }
        
       
      });
  }
}

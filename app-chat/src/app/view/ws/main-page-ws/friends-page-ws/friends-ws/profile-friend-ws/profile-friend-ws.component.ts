import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInforWS } from 'src/app/models/ws/friends-page/friend_infor_ws';
import { ContactsWsService } from 'src/app/service/ws/friends-page/contacts/contacts-ws.service';
import { FriendsPageWsService } from 'src/app/service/ws/friends-page/friends-page-ws.service';
import { ProfileFriendWsService } from 'src/app/service/ws/friends-page/profile-friend/profile-friend-ws.service';

@Component({
  selector: 'app-profile-friend-ws',
  templateUrl: './profile-friend-ws.component.html',
  styleUrls: ['./profile-friend-ws.component.scss']
})
export class ProfileFriendWsComponent implements OnInit, OnDestroy {

  friendInforWS: FriendInforWS;
  private valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor(
    private contactsServiceWS: ContactsWsService,
    private profileFriendServiceWS: ProfileFriendWsService,
    public friendsPageServiceWS: FriendsPageWsService,
    private router: Router,
  ) {}
    // chuyển đến trang tin nhắn
    onClickMessage(id: string) {
      let countCheck = 0;
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
      this.profileFriendServiceWS.getConversation().once('value', (data) => {
        data.forEach(element_x => {
            if(countCheck != -1) {
              element_x.forEach(element => {
                  if(element.key == parseIDUser || element.key == id)
                    countCheck++;
              });
              if(countCheck == 2) {
                this.profileFriendServiceWS.getKindConversation(element_x.key).once('value',(data) => {
                    if(data.val().loai_cuoc_tro_truyen == 'don') {
                      this.router.navigate(['/bessenger-ws/tin-nhan/' + element_x.key]);
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
    this.friendsPageServiceWS.setIDUnFriend(id);
    this.friendsPageServiceWS.setNameUnFriend(name)
  }
 
  // đồng bộ dữ liệu với friends list
  getFriendFromFriendsList() {
    this.friendInforWS = new FriendInforWS();
    this.friendInforWS.id = 1;
    let idCheck
    this.valueFromChildSubscription =
      this.contactsServiceWS.friendInforService.subscribe((id) => {
       
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInforWS.id = 1;
        } else {
          idCheck = id;
          this.profileFriendServiceWS.getInforFriend(id).on('value', (data) => {
            
            if(idCheck == data.key) {
              if (data.val() != null) {
                this.friendInforWS.id = id;
                this.friendInforWS.img = data.val().link_hinh;
                this.friendInforWS.name = data.val().ten;
                this.friendInforWS.sex = data.val().gioi_tinh
              } else {
                this.router.navigate(['/**'])
                this.contactsServiceWS.setFriendInforService(null);
              }
           }
          });
        }
        
       
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/friends-page/request_infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/friends-page/profile-friend/profile-friend.service';
import { RequestAddFriendsService } from 'src/app/service/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/friends-page/send-add/send-add-friend.service';

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
    private requestAddService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService
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

   // đồng bộ dữ liệu với request list
   getFriendFromFriendsRequestAdd() {
    this.friendInfor = new RequestInfor();
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
          this.requestAddService.getInforRequest(id).once('value', (data) => {
            if(idCheck == data.key) {
              if (data.val() != null) {
                this.friendInfor.id = id;
                this.friendInfor.img = data.val().link_hinh;
                this.friendInfor.name = data.val().ten;
              } else {
                this.router.navigate(['/**'])
                this.contactsService.setFriendInforService(null);
              }
            }
          });
        }
      
      });
  }

  // chấp nhận kết bạn
  acceptRequest(id : string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestAddService.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    // Thêm vào bạn bè của user đang đăng nhập
    this.contactsService.addFriend(parseIDUser,id).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // thêm vào user gửi lời mời kết bạn
    this.contactsService.addFriend(id,parseIDUser).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    
  }

  // từ chối kết bạn
  refuseRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestAddService.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestInforWS } from 'src/app/models/ws/friends-page/request_infor_ws';
import { ContactsWsService } from 'src/app/service/ws/friends-page/contacts/contacts-ws.service';
import { FriendsPageWsService } from 'src/app/service/ws/friends-page/friends-page-ws.service';
import { RequestAddFriendsWsService } from 'src/app/service/ws/friends-page/request-add/request-add-friends-ws.service';
import { SendAddFriendWsService } from 'src/app/service/ws/friends-page/send-add/send-add-friend-ws.service';

@Component({
  selector: 'app-profile-request-ws',
  templateUrl: './profile-request-ws.component.html',
  styleUrls: ['./profile-request-ws.component.scss']
})
export class ProfileRequestWsComponent implements OnInit, OnDestroy {

  friendInforWS: RequestInforWS;
  private valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor(
    private contactsServiceWS: ContactsWsService,
    private router: Router,
    public friendsPageServiceWS: FriendsPageWsService,
    private requestAddServiceWS: RequestAddFriendsWsService,
    private sendsListServiceWS: SendAddFriendWsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsRequestAdd();
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.requestAddServiceWS.getMembersConversation().once('value', (conver) =>{ 
        // duyệt qua tất cả các cuộc trò chuyện
        // lấy ra danh sách nhóm chat để kiểm tra
        let groupChatsList = []
        this.requestAddServiceWS.getGroupChat().once('value', (group) => {
          if(group.val() != null) {
            group.forEach(itemG => {
              if(itemG.val().ton_tai ==0)
                groupChatsList.push(itemG.key)
            });
          }
          if(conver.val() != null) {
            let check = false;
            conver.forEach(itemConver => {
              // tìm ra id và iduser trong các cuộc trò chuyện
              let memberList = []
              if(itemConver.val() != null) {
                // tìm ra tất cả thành viên trong 1 cuộc trò chuyện
                itemConver.forEach(memberConver => {
                  memberList.push({id: memberConver.key, status: memberConver.val().trang_thai})
                });
              }
              // nếu trùng id và iduser và không phải là nhóm chat
              if(((memberList[0].id == id && memberList[1].id == parseIDUser) || (memberList[0].id == parseIDUser && memberList[1].id == id)) && !groupChatsList.includes(itemConver.key)) {
                this.requestAddServiceWS.updateMembersConversation(itemConver.key, parseIDUser).update({
                  trang_thai: "khong_cho"
                })
                check = true;
                // trễ 0.5s để chờ db update trạng thái mới chuyển trang
                setTimeout(() => {
                  this.router.navigate(['/bessenger-ws/tin-nhan/' + itemConver.key]);
                }, 500);
              }
            });
            // nếu không có sẵn cuộc trò truyện thì tự tạo
            if(!check) {
               // thêm loại cuộc trò chuyện vào cuộc trò chuyện
              let keyConverNew = this.requestAddServiceWS.getKindConversation().push();
              keyConverNew.update({
                bieu_tuong_cam_xuc: "khong",
                loai_cuoc_tro_truyen: "don",
                mau: "#3275f7"
              })
               // thêm thành viên cuộc trò chuyện
              this.requestAddServiceWS.getMembersConversation().child(keyConverNew.key).child(parseIDUser).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "khong_cho"
              })
              this.requestAddServiceWS.getMembersConversation().child(keyConverNew.key).child(id).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "cho"
              })
              setTimeout(() => {
                this.router.navigate(['/bessenger-ws/tin-nhan/' + keyConverNew.key]);
              }, 500);
            }
          }
        })
       
    })
  }

   // đồng bộ dữ liệu với request list
   getFriendFromFriendsRequestAdd() {
    this.friendInforWS = new RequestInforWS();
    this.friendInforWS.id = 1;
    let idCheck
    this.valueFromChildSubscription =
      this.contactsServiceWS.friendInforService.subscribe((id) => {
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInforWS.id = 1;
          idCheck = -1;
        } else {
          idCheck = id;
          this.requestAddServiceWS.getInforRequest(id).on('value', (data) => {
            if(idCheck == data.key) {
              if (data.val() != null) {
                this.friendInforWS.id = id;
                this.friendInforWS.img = data.val().link_hinh;
                this.friendInforWS.name = data.val().ten;
              } else {
                this.router.navigate(['/**'])
                this.contactsServiceWS.setFriendInforService(null);
              }
            }
          });
        }
      
      });
  }

  moveLinkRequest(link: string) {
    this.router.navigate(['/bessenger-ws/ban-be/loi-moi/' + link])
  }

  // chấp nhận kết bạn
  acceptRequest(id : string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestAddServiceWS.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    // Thêm vào bạn bè của user đang đăng nhập
    this.contactsServiceWS.addFriend(parseIDUser,id).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // thêm vào user gửi lời mời kết bạn
    this.contactsServiceWS.addFriend(id,parseIDUser).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // di chuyển đến đường dẫn mặc định không có id
    this.moveLinkRequest('')
  }

  // từ chối kết bạn
  refuseRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestAddServiceWS.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
     // di chuyển đến đường dẫn mặc định không có id
    this.moveLinkRequest('')
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { SendInfor } from 'src/app/models/firebase/friends-page/send_infor';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-profile-send',
  templateUrl: './profile-send.component.html',
  styleUrls: ['./profile-send.component.scss']
})
export class ProfileSendComponent implements OnInit, OnDestroy {
  friendInfor: SendInfor ;
  private valueFromChildSubscription: Subscription;
  constructor(
    private contactsService: ContactsService,
    private sendAddService: SendAddFriendService,
    private router: Router,
    private requestListService: RequestAddFriendsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsSend();
   
  }
  
  
 

  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }

   // đồng bộ dữ liệu với sends list
   getFriendFromFriendsSend() {
    this.friendInfor = new SendInfor();
    this.friendInfor.id = 1;
    let idCheck
    this.valueFromChildSubscription =
      this.contactsService.friendInforService.subscribe((id) => {
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInfor.id = 1;
          idCheck = -1
        } else {
          idCheck = id;
          this.sendAddService.getInforSend(id).on('value', (data) => {
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

  //  chuyển đường dẫn
  moveLinkSends(link: string) {
    this.router.navigate(['/bessenger/ban-be/da-gui/' + link]);
  }

  undoSendRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(id, parseIDUser).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendAddService.editSendService(id,parseIDUser).update({
      ton_tai: 1
    })
    this.moveLinkSends('')
  }

  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.sendAddService.getMembersConversation().once('value', (conver) =>{ 
        // duyệt qua tất cả các cuộc trò chuyện
        // lấy ra danh sách nhóm chat để kiểm tra
        let groupChatsList = []
        this.sendAddService.getGroupChat().once('value', (group) => {
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
                this.sendAddService.updateMembersConversation(itemConver.key, parseIDUser).update({
                  trang_thai: "khong_cho"
                })
                check = true;
                // trễ 0.5s để chờ db update trạng thái mới chuyển trang
                setTimeout(() => {
                  this.router.navigate(['/bessenger/tin-nhan/' + itemConver.key]);
                }, 500);
              }
            });
            // nếu không có sẵn cuộc trò truyện thì tự tạo
            if(!check) {
             
               // thêm loại cuộc trò chuyện vào cuộc trò chuyện
              let keyConverNew = this.sendAddService.getKindConversation().push();
              keyConverNew.update({
                bieu_tuong_cam_xuc: "khong",
                loai_cuoc_tro_truyen: "don",
                mau: "#3275f7"
              })
               // thêm thành viên cuộc trò chuyện
              this.sendAddService.getMembersConversation().child(keyConverNew.key).child(parseIDUser).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "khong_cho"
              })
              this.sendAddService.getMembersConversation().child(keyConverNew.key).child(id).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "cho"
              })
             
              setTimeout(() => {
                this.router.navigate(['/bessenger/tin-nhan/' + keyConverNew.key]);
              }, 500);
            }
          }
        })
       
    })
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddFriendsInforWS } from 'src/app/models/ws/friends-page/add_friends_ws';
import { AddFriendsWsService } from 'src/app/service/ws/friends-page/add-friends/add-friends-ws.service';
import { ContactsWsService } from 'src/app/service/ws/friends-page/contacts/contacts-ws.service';
import { FriendsPageWsService } from 'src/app/service/ws/friends-page/friends-page-ws.service';
import { RequestAddFriendsWsService } from 'src/app/service/ws/friends-page/request-add/request-add-friends-ws.service';
import { SendAddFriendWsService } from 'src/app/service/ws/friends-page/send-add/send-add-friend-ws.service';

@Component({
  selector: 'app-profile-add-ws',
  templateUrl: './profile-add-ws.component.html',
  styleUrls: ['./profile-add-ws.component.scss']
})
export class ProfileAddWsComponent implements OnInit, OnDestroy {

  addInforWS: AddFriendsInforWS;
  private valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor(
    private contactsServiceWS: ContactsWsService,
    private router: Router,
    public friendsPageServiceWS: FriendsPageWsService,
    private requestListServiceWS: RequestAddFriendsWsService,
    private sendsListServiceWS: SendAddFriendWsService,
    private addListServiceWS: AddFriendsWsService
  ) {}

  ngOnInit(): void {
    this.getFriendFromFriendsRequestAdd();
  }

  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }

  // đồng bộ dữ liệu với request list
  getFriendFromFriendsRequestAdd() {
    this.addInforWS = new AddFriendsInforWS();
    this.addInforWS.id = 1;
    let idCheck;
    this.valueFromChildSubscription =
      this.contactsServiceWS.addInforService.subscribe((id) => {
        // kiểm tra 404
        if (id == null || id.id == null) {
          // id == 1 là đường dẫn không có id
          this.addInforWS.id = 1;
        } else {
          idCheck = id.id;
          this.addListServiceWS.getInforAddFriends(id.id).on('value', (data) => {
            if (idCheck == data.key) {
              if (data.val() != null) {
                this.addInforWS.id = id.id;
                this.addInforWS.img = data.val().link_hinh;
                this.addInforWS.name = data.val().ten;
                this.addInforWS.checkAddOrUndo = id.addOrUndo;
              } else {
                this.router.navigate(['/**']);
                this.contactsServiceWS.setFriendInforService(null);
              }
            }
          });
        }
      });
  }
  // thêm bạn
  onClickAddFriends(item: AddFriendsInforWS, index: number) {
    console.log(this.friendsPageServiceWS.saveAddList)
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    let indexCheck;
    if(this.friendsPageServiceWS.addList.length > 0) {
      this.friendsPageServiceWS.addList.forEach((element, indexT) => {
        if (element.id == item.id) {
          indexCheck = indexT;
          element.checkAddOrUndo = 'thu_hoi';
        }
      });
      let checkAdd = false;
      // cập nhật danh sách lưu đã thêm
        this.friendsPageServiceWS.saveAddList.forEach((element) => {
          if (element.id == item.id) {
            element.checkAddOrUndo = this.friendsPageServiceWS.addList[indexCheck].checkAddOrUndo;
            checkAdd = true;
          }
        });
        if(!checkAdd){
          this.friendsPageServiceWS.saveAddList.push({
            id: item.id,
            checkAddOrUndo: this.friendsPageServiceWS.addList[indexCheck].checkAddOrUndo,
          });
        }
    }
   
    // cập nhật bảng yêu cầu kết bạn
    this.requestListServiceWS.acceptRequestService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });
    this.addInforWS.checkAddOrUndo = 'thu_hoi';
  }

  // thu hồi yêu cầu kết bạn
  onClickUndoAddFriends(item: AddFriendsInforWS, index: number) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    let indexCheck;
    if(this.friendsPageServiceWS.addList.length > 0) {
      this.friendsPageServiceWS.addList.forEach((element, indexT) => {
        if (element.id == item.id) {
          indexCheck = indexT;
          element.checkAddOrUndo = 'them';
        }
      });
      let checkAdd = false;
      // cập nhật danh sách lưu đã thêm
        this.friendsPageServiceWS.saveAddList.forEach((element) => {
          if (element.id == item.id) {
            element.checkAddOrUndo = this.friendsPageServiceWS.addList[indexCheck].checkAddOrUndo;
            checkAdd = true;
          }
        });
        if(!checkAdd){
          this.friendsPageServiceWS.saveAddList.push({
            id: item.id,
            checkAddOrUndo: this.friendsPageServiceWS.addList[indexCheck].checkAddOrUndo,
          });
        }
    }
    // cập nhật bảng yêu cầu kết bạn
    this.requestListServiceWS.acceptRequestService(item.id, parseIDUser).update({
      ton_tai: 1,
    });
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(item.id, parseIDUser).update({
      ton_tai: 1,
    });

    this.addInforWS.checkAddOrUndo = 'them';
  }

  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.requestListServiceWS.getMembersConversation().once('value', (conver) => {
      // duyệt qua tất cả các cuộc trò chuyện
      // lấy ra danh sách nhóm chat để kiểm tra
      let groupChatsList = [];
      this.requestListServiceWS.getGroupChat().once('value', (group) => {
        if (group.val() != null) {
          group.forEach((itemG) => {
            if (itemG.val().ton_tai == 0) groupChatsList.push(itemG.key);
          });
        }
        if (conver.val() != null) {
          let check = false;
          conver.forEach((itemConver) => {
            // tìm ra id và iduser trong các cuộc trò chuyện
            let memberList = [];
            if (itemConver.val() != null) {
              // tìm ra tất cả thành viên trong 1 cuộc trò chuyện
              itemConver.forEach((memberConver) => {
                memberList.push({
                  id: memberConver.key,
                  status: memberConver.val().trang_thai,
                });
              });
            }
            // nếu trùng id và iduser và không phải là nhóm chat
            if (
              ((memberList[0].id == id && memberList[1].id == parseIDUser) ||
              (memberList[0].id == parseIDUser &&
                memberList[1].id == id ))
                &&
                !groupChatsList.includes(itemConver.key)
            ) {
              this.requestListServiceWS
                .updateMembersConversation(itemConver.key, parseIDUser)
                .update({
                  trang_thai: 'khong_cho',
                });
              check = true;
              // trễ 0.5s để chờ db update trạng thái mới chuyển trang
              setTimeout(() => {
                this.router.navigate(['/bessenger-ws/tin-nhan/' + itemConver.key]);
              }, 500);
            }
          });
          // nếu không có sẵn cuộc trò truyện thì tự tạo
          if (!check) {
            // thêm loại cuộc trò chuyện vào cuộc trò chuyện
            let keyConverNew = this.requestListServiceWS
              .getKindConversation()
              .push();
            keyConverNew.update({
              bieu_tuong_cam_xuc: "khong",
              loai_cuoc_tro_truyen: "don",
              mau: "#3275f7"
            });
            // thêm thành viên cuộc trò chuyện
            this.requestListServiceWS
              .getMembersConversation()
              .child(keyConverNew.key)
              .child(parseIDUser)
              .update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: 'khong_cho',
              });
            this.requestListServiceWS
              .getMembersConversation()
              .child(keyConverNew.key)
              .child(id)
              .update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: 'cho',
              });

            setTimeout(() => {
              this.router.navigate(['/bessenger-ws/tin-nhan/' + keyConverNew.key]);
            }, 500);
          }
        }
      });
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferFriendsInfor } from 'src/app/models/firebase/friends-page/offer_friends';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { OfferFriendsService } from 'src/app/service/firebase/friends-page/offer-friends/offer-friends.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-profile-offer',
  templateUrl: './profile-offer.component.html',
  styleUrls: ['./profile-offer.component.scss']
})
export class ProfileOfferComponent implements OnInit, OnDestroy {
  offerInfor: OfferFriendsInfor;
  valueFromChildSubscription: Subscription;
  iDUrl: any;
  valueSub: Subscription;
  constructor( public friendsPageService: FriendsPageService,
    private contactsService: ContactsService,
    private router: Router,
    private requestListService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService,
    private offersListService: OfferFriendsService
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsRequestAdd();
  }
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  // đồng bộ dữ liệu với request list
  getFriendFromFriendsRequestAdd() {
    this.offerInfor = new OfferFriendsInfor();
    this.offerInfor.id = 1;
    let idCheck;
    this.valueFromChildSubscription =
      this.contactsService.offerInforService.subscribe((id) => {
       
        // kiểm tra 404
        if (id == null || id.id == null) {
          // id == 1 là đường dẫn không có id
          this.offerInfor.id = 1;
        } else {
          idCheck = id.id;
          this.offersListService.getInforOfferFriends(id.id).on('value', (data) => {
            if (idCheck == data.key) {
              if (data.val() != null) {
                this.offerInfor.id = id.id;
                this.offerInfor.img = data.val().link_hinh;
                this.offerInfor.name = data.val().ten;
                this.offerInfor.checkAddOrUndo = id.addOrUndo;
              } else {
                this.router.navigate(['/**']);
                this.contactsService.setFriendInforService(null);
              }
            }
          });
        }
      });
  }

  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.requestListService.getMembersConversation().once('value', (conver) => {
      // duyệt qua tất cả các cuộc trò chuyện
      // lấy ra danh sách nhóm chat để kiểm tra
      let groupChatsList = [];
      this.requestListService.getGroupChat().once('value', (group) => {
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
              this.requestListService
                .updateMembersConversation(itemConver.key, parseIDUser)
                .update({
                  trang_thai: 'khong_cho',
                });
              check = true;
              // trễ 0.5s để chờ db update trạng thái mới chuyển trang
              setTimeout(() => {
                this.router.navigate(['/bessenger/tin-nhan/' + itemConver.key]);
              }, 500);
            }
          });
          // nếu không có sẵn cuộc trò truyện thì tự tạo
          if (!check) {
            // thêm loại cuộc trò chuyện vào cuộc trò chuyện
            let keyConverNew = this.requestListService
              .getKindConversation()
              .push();
            keyConverNew.update({
              bieu_tuong_cam_xuc: "khong",
              loai_cuoc_tro_truyen: "don",
              mau: "#3275f7"
            });
            // thêm thành viên cuộc trò chuyện
            this.requestListService
              .getMembersConversation()
              .child(keyConverNew.key)
              .child(parseIDUser)
              .update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: 'khong_cho',
              });
            this.requestListService
              .getMembersConversation()
              .child(keyConverNew.key)
              .child(id)
              .update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: 'cho',
              });

            setTimeout(() => {
              this.router.navigate(['/bessenger/tin-nhan/' + keyConverNew.key]);
            }, 500);
          }
        }
      });
    });
  }

   // thêm bạn
   onClickAddFriends(item: OfferFriendsInfor, index: number) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let indexCheck;
    if(this.friendsPageService.offerList.length > 0) {
      this.friendsPageService.offerList.forEach((element, indexT) => {
        if (element.id == item.id) {
          indexCheck = indexT;
          element.checkAddOrUndo = 'thu_hoi';
        }
      });
      let checkAdd = false;
      this.friendsPageService.saveOfferList.forEach((element) => {
        if (element.id == item.id) {
          element.checkAddOrUndo = this.friendsPageService.offerList[indexCheck].checkAddOrUndo;
          checkAdd = true;
        }
      });
      if(!checkAdd){
        this.friendsPageService.saveOfferList.push({
          id: item.id,
          checkAddOrUndo: this.friendsPageService.offerList[indexCheck].checkAddOrUndo,
        });
      }
    }
   
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });
    this.offerInfor.checkAddOrUndo = 'thu_hoi';
  }

  // thu hồi yêu cầu kết bạn
  onClickUndoAddFriends(item: OfferFriendsInfor, index: number) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let indexCheck;
    if(this.friendsPageService.offerList.length > 0) {
      this.friendsPageService.offerList.forEach((element, indexT) => {
        if (element.id == item.id) {
          indexCheck = indexT;
          element.checkAddOrUndo = 'them';
        }
      });
      let checkAdd = false;
      this.friendsPageService.saveOfferList.forEach((element) => {
        if (element.id == item.id) {
          element.checkAddOrUndo = this.friendsPageService.offerList[indexCheck].checkAddOrUndo;
          checkAdd = true;
        }
      });
      if(!checkAdd){
        this.friendsPageService.saveOfferList.push({
          id: item.id,
          checkAddOrUndo: this.friendsPageService.offerList[indexCheck].checkAddOrUndo,
        });
      }
    }
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ton_tai: 1,
    });
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id, parseIDUser).update({
      ton_tai: 1,
    });

    this.offerInfor.checkAddOrUndo = 'them';
  }

}

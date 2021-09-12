import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { FriendInforWS } from 'src/app/models/ws/friends-page/friend_infor_ws';

@Injectable({
  providedIn: 'root'
})
export class ContactsWsService {
  private friendSource = new BehaviorSubject<FriendInforWS>(null);
  friendInforService = this.friendSource.asObservable();
  // add
  private addSource = new BehaviorSubject<any>(null);
  addInforService = this.addSource.asObservable();
  // de xuat
  private offerSource = new BehaviorSubject<any>(null);
  offerInforService = this.offerSource.asObservable();
  constructor(
    private db: AngularFireDatabase,
    
  ) {
    
  }
  // add
  setAddInforService(id: string, addOrUndo: string) {
    this.addSource.next({
      id: id,
      addOrUndo: addOrUndo
    })
  }
// offer
  setOfferInforService(id: string, addOrUndo: string) {
    this.offerSource.next({
      id: id,
      addOrUndo: addOrUndo
    })
  }
  // thay đổi thông tin
  setFriendInforService(id: any) {
    this.friendSource.next(id);
  }
  // get list id dựa vào id đang đăng nhập
  getListIDFriendsByIDUser(idUser: any): any {
    
    return this.db.database.ref('ban_be_ws').child(idUser);
  }

  // hủy kết bạn
  unFriendByIDUser(idUnfriend: string, idUser: string) {
    return this.db.database.ref('ban_be_ws').child(idUser).child(idUnfriend);
  }
  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListFriendsInforByIDFriends(idUser: any) {
    let friendInfor = new FriendInforWS();
    const ref = this.db.database.ref('tai_khoan_ws/' + idUser);
    ref.on('value', (data) => {
      friendInfor.id = idUser;
      friendInfor.img = data.val().link_hinh;
      friendInfor.name = data.val().ten;
      friendInfor.sex = data.val().gioi_tinh;
      friendInfor.date = data.val().ngay_tao;
      friendInfor.email = data.val().email;
      this.db.database.ref('lan_cuoi_dang_nhap_ws').child(idUser).on('value', (last)=> {
        if(last.val() != null)
          friendInfor.lastOnline = last.val().lan_cuoi_dang_nhap
        else
          friendInfor.lastOnline = 0;
      })
    });
  
    return friendInfor;
  }

  getListFriendsInforByIDFriendsOneShot(idUser: any) {
    let friendInfor = new FriendInforWS();
    const ref = this.db.database.ref('tai_khoan_ws/' + idUser);
    ref.once('value', (data) => {
      friendInfor.id = idUser;
      friendInfor.img = data.val().link_hinh;
      friendInfor.name = data.val().ten;
      friendInfor.sex = data.val().gioi_tinh;
      friendInfor.date = data.val().ngay_tao;
      friendInfor.email = data.val().email;
      this.db.database.ref('lan_cuoi_dang_nhap_ws').child(idUser).on('value', (last)=> {
        if(last.val() != null)
          friendInfor.lastOnline = last.val().lan_cuoi_dang_nhap
        else
          friendInfor.lastOnline = 0;
      })
    });
  
    return friendInfor;
  }
  getFriendByID(idUser:any) {
    return this.db.database.ref('tai_khoan_ws/' + idUser);
  }

  
  addFriend(idUser: string, idSend: string) {
    return this.db.database.ref('ban_be_ws/'+ idUser + '/' +idSend)
  }
}

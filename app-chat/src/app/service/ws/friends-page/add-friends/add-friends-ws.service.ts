import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddFriendsInforWS } from 'src/app/models/ws/friends-page/add_friends_ws';

@Injectable({
  providedIn: 'root'
})
export class AddFriendsWsService {
  constructor(private db: AngularFireDatabase) { }

  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListAddInforByID(idUser: any) {
    let requestInfor = new AddFriendsInforWS();
    const ref = this.db.database.ref('tai_khoan_ws').child(idUser);
    ref.on('value', (data) => {
      requestInfor.id = idUser;
      requestInfor.img = data.val().link_hinh;
      requestInfor.name = data.val().ten;
      requestInfor.sex = data.val().gioi_tinh;
      requestInfor.date = data.val().ngay_tao;
    
    });
    return requestInfor
  }

  // lấy ra thông tin người dùng theo id
  getInforAddFriends(idUser: any) {
    return this.db.database.ref('tai_khoan_ws').child(idUser);
  }

  getAllAccount() {
    return this.db.database.ref('tai_khoan_ws');
  }

  // get list id dựa vào id đang đăng nhập
  getListFriendsByIDUser(idUser: any): any {
    return this.db.database.ref('ban_be_ws').child(idUser);
  }

  getRequestInforByIDUser(idUser: any) {
    return this.db.database.ref('loi_moi_ket_ban_ws').child(idUser)
  }

  getSendInforByIDUser(idUser: any) {
    return this.db.database.ref('da_gui_ket_ban_ws').child(idUser)
  }
}

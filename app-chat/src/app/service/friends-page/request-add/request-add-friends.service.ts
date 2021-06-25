import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { RequestInfor } from 'src/app/models/friends-page/request_infor';

import { FriendsPageService } from '../friends-page.service';

@Injectable({
  providedIn: 'root'
})
export class RequestAddFriendsService {
 
  constructor(private db: AngularFireDatabase, private friendsPageService: FriendsPageService) { }
  getRequestInforByIDUser(idUser: any) {
    return this.db.database.ref('loi_moi_ket_ban/' + idUser)
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListRequestInforByIDRequest(idUser: any) {
    let requestInfor = new RequestInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      requestInfor.id = idUser;
      requestInfor.img = data.val().link_hinh;
      requestInfor.name = data.val().ten;
      requestInfor.sex = data.val().gioi_tinh;
      requestInfor.date = data.val().ngay_tao;
    
    });
    return requestInfor
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object chỉ lấy 1 lần
  getListRequestInforByIDRequestOneShot(idUser: any) {
    let requestInfor = new RequestInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      requestInfor.id = idUser;
      requestInfor.img = data.val().link_hinh;
      requestInfor.name = data.val().ten;
      requestInfor.sex = data.val().gioi_tinh;
      requestInfor.date = data.val().ngay_tao;
    
    });
    return requestInfor
  }
  
  // chấp nhận lời mời kết bạn
  acceptRequestService(idUser: string, idRequest: string) {
    return this.db.database.ref('loi_moi_ket_ban/').child(idUser).child(idRequest);
  }
  
  getInforRequest(idUser: any) {
    return this.db.database.ref('tai_khoan/' + idUser);
  }

}

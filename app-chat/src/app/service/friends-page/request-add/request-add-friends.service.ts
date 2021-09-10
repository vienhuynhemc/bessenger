import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { RequestInfor } from 'src/app/models/firebase/friends-page/request_infor';

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
  
  // lấy ra thông tin người dùng theo id
  getInforRequest(idUser: any) {
    return this.db.database.ref('tai_khoan/' + idUser);
  }

  // lấy ra thanh viên cuộc trò chuyện
  getMembersConversation() {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen/');
  }

  // lấy ra nhóm chat
  getGroupChat() {
    return this.db.database.ref('thong_tin_tro_chuyen_nhom/');
  }
  // cập nhật cuộc trò chuyện
  updateMembersConversation(idConver: string, idUser: string) {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen/').child(idConver).child(idUser)
  }
  
  // loại cuộc trò chuyện
  getKindConversation() {
    return this.db.database.ref('cuoc_tro_chuyen/');
  }
}

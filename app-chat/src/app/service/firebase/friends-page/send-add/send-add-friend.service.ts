import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SendInfor } from 'src/app/models/firebase/friends-page/send_infor';
import { FriendsPageService } from '../friends-page.service';

@Injectable({
  providedIn: 'root'
})
export class SendAddFriendService {

  constructor(private db: AngularFireDatabase, private friendsPageService: FriendsPageService) { }

  getSendInforByIDUser(idUser: any) {
    return this.db.database.ref('da_gui_ket_ban/' + idUser)
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListSendInforByIDSend(idUser: any) {
    let sendInfor = new SendInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      sendInfor.id = idUser;
      sendInfor.img = data.val().link_hinh;
      sendInfor.name = data.val().ten;
      sendInfor.sex = data.val().gioi_tinh;
      sendInfor.date = data.val().ngay_tao;
    
    });
    return sendInfor
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object chỉ lấy 1 lần
  getListSendInforByIDSendOneShot(idUser: any) {
    let sendInfor = new SendInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      sendInfor.id = idUser;
      sendInfor.img = data.val().link_hinh;
      sendInfor.name = data.val().ten;
      sendInfor.sex = data.val().gioi_tinh;
      sendInfor.date = data.val().ngay_tao;
    
    });
    return sendInfor
  }

  getInforSend(idUser: any) {
    return this.db.database.ref('tai_khoan/' + idUser);
  }

  // chấp nhận lời mời kết bạn
  editSendService(idUser: string, idSend: string) {
    return this.db.database.ref('da_gui_ket_ban/').child(idSend).child(idUser);
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

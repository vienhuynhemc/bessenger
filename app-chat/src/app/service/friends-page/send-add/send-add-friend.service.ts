import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SendInfor } from 'src/app/models/friends-page/send_infor';
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
  add() {
    return this.db.database.ref('tai_khoan/' + '-McTnz0jyH2Tyl6SFLjc').set({
      email: 
"czeus305@gmail.com",
gioi_tinh: 
"Nam",
hinh: 
"/tai_khoan/-McjcqZczX5DbFif_J7d.png",
lan_cuoi_dang_nhap: 
1624590208842,
link_hinh: 
"https://firebasestorage.googleapis.com/v0/b/bessenger-6b25f.appspot.com/o/tai_khoan%2F-McjcqZczX5DbFif_J7d.png?alt=media&token=f6cf66ae-c9cb-4aec-aa53-ef8e36148363",
mat_khau: 
"12345",
ngay_tao: 
1624296876363,
ten: 
"Husky Cỏ",

    });
  }
  
}

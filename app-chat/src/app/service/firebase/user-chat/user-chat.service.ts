// lấy dữ liệu từ api
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// dùng observable xử lý bất đồng bộ
import { Observable, of } from 'rxjs';
import { BoxChat } from 'src/app/models/firebase/box_chat';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
// chứa các phương thức lấy dữ liệu từ DB
export class UserChatService {
  // đường dẫn đến name trong firebase
  private dbPathTable = '?????????????????????';
  usersRef: AngularFireList<BoxChat> = null;
  idGroupList: AngularFireList<Number> = null;
  
  // lấy từ DB về danh sách bạn bè nhắn tin gần nhất, amount: số lượng muốn lấy lên
  getUsersChatList(groupid:number): AngularFireList<BoxChat> {
    // có DB rồi thêm vào sau
    return this.usersRef
 
  }

  // trả về danh sách id các chat box, iduser truyền vào là id đăng nhập vào web, amount số lượng muốn lấy ra
  getConversationsIDListByIdUser(idUser:number, amount:number):AngularFireList<Number> {
    // có DB rồi thêm vào sau
    return  this.idGroupList= this.db.list(this.dbPathTable, ref => { 
      return ref.child('table').child("time").orderByValue().limitToLast(amount);
  });
   
  }


  constructor(public db: AngularFireDatabase) {
    
   }
}

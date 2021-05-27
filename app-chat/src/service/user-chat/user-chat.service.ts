import { Injectable } from '@angular/core';
import { UserChat } from 'src/models/user_chat';
// dùng observable xử lý bất đồng bộ
import { Observable } from 'rxjs';
import { of } from 'rxjs';
// lấy dữ liệu từ api
import { HttpClient, HttpHeaders } from '@angular/common/http';
// firebass
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
// chứa các phương thức xử lý liên quan đến các danh sách các tin nhắn gần nhất
export class UserChatService {
  // đường dẫn đến name trong firebase
  private dbPathTable = '?????????????????????';
  usersRef: AngularFireList<UserChat> = null;

  // lấy từ DB về danh sách bạn bè nhắn tin gần nhất, amount: số lượng muốn lấy lên
  getUsersChatList(amount:number): AngularFireList<UserChat> {
    // lấy ra list phần tử trong DB theo tên 
      return  this.usersRef= this.db.list(this.dbPathTable, ref => { 
          return ref.child('table').child("time").orderByValue().limitToLast(20);
      });
 
  }
  
  constructor(private http:HttpClient, public db: AngularFireDatabase) {
    
   }
}

import { Injectable } from '@angular/core';
// dùng observable xử lý bất đồng bộ
import { Observable } from 'rxjs';
import { of } from 'rxjs'
// user
import { UserChat } from 'src/models/user_chat';
// firebass
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// user online
import { UserOnline } from 'src/models/user_online';
@Injectable({
  providedIn: 'root'
})
// chứa các phương thức xử lý liên quan đến các user đang online
export class UserOnlineService {
   // đường dẫn đến table trong firebase
   private dbPathTable = '?????????????????????';
   usersOnlineRef: AngularFireList<UserChat> = null;
 
   // lấy từ DB về danh sách những user đang online, bắt đầu từ start và kết thúc end
   getUsersOnline(start:number, end:number): AngularFireList<UserChat> {
     // lấy ra list phần tử trong DB theo tên table
       return  this.usersOnlineRef= this.db.list(this.dbPathTable, ref => { 
        //  lấy table từ vị trí start đến end với status trong table = online, table là tên bảng muốn lấy ra sau này nhớ nhập vào
           return ref.child("table").child("status").equalTo('online').startAt(start).endAt(end);
       });
  
   }
  constructor(public db: AngularFireDatabase) { }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BoxChat } from 'src/app/models/box_chat';
// user online
import { UserOnline } from 'src/app/models/user_online';
@Injectable({
  providedIn: 'root'
})
export class FriendsListService {
 // đường dẫn đến name trong firebase
 private dbPathTable = '?????????????????????';
 usersRef: AngularFireList<BoxChat> = null;
 idGroupList: AngularFireList<Number> = null;
 usersOnlineRef: AngularFireList<UserOnline> = null;
 // lấy từ DB về danh sách bạn bè nhắn tin gần nhất, amount: số lượng muốn lấy lên
 getUsersChatListService(groupid:number): AngularFireList<BoxChat> {
   // có DB rồi thêm vào sau
   return this.usersRef

 }

 // trả về danh sách id các chat box, iduser truyền vào là id đăng nhập vào web, amount số lượng muốn lấy ra
 getConversationsIDListByIdUserService(idUser:number, amount:number):AngularFireList<Number> {
   // có DB rồi thêm vào sau
   return  this.idGroupList= this.db.list(this.dbPathTable, ref => { 
     return ref.child('table').child("time").orderByValue().limitToLast(amount);
 });
 }

 // lấy từ DB về danh sách những user đang online theo id danh sách bạn bè, bắt đầu từ start và kết thúc end
 getUsersOnlineService(start:number, end:number, idFriendsList:number): AngularFireList<UserOnline> {
  // có DB hoàn thiện sau
    return  this.usersOnlineRef= this.db.list(this.dbPathTable, ref => { 
     //  lấy table từ vị trí start đến end với status trong table = online, table là tên bảng muốn lấy ra sau này nhớ nhập vào
        return ref.child("table").child("status").equalTo('online').startAt(start).endAt(end);
    });
}
  constructor(public db: AngularFireDatabase) { }
}

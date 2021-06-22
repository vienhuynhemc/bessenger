import { Injectable } from '@angular/core';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
  snapshotChanges,
} from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { FriendsPageService } from '../friends-page.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private friendSource = new BehaviorSubject<FriendInfor>(null);
  friendInforService = this.friendSource.asObservable();
  idMutualFriend: string = '';
  constructor(
    private db: AngularFireDatabase,
    private friendsPageService: FriendsPageService
  ) {}

  // thay đổi thông tin
  setFriendInforService(id: any) {
    this.friendSource.next(id);
  }
  // get list id dựa vào id đang đăng nhập
  getListIDFriendsByIDUser(idUser: any): any {
    return this.db.database.ref('ban_be').child(idUser);
  }

  // hủy kết bạn
  unFriendByIDUser(idUnfriend: string, idUser: string) {
    return this.db.database.ref('ban_be').child(idUser).child(idUnfriend);
  }
  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListFriendsInforByIDFriends(idUser: any) {
    let friendInfor = new FriendInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      friendInfor.id = idUser;
      friendInfor.img = data.val().link_hinh;
      friendInfor.name = data.val().ten;
      setTimeout(() => {
        this.friendsPageService.setLoading(false)
      }, 0);
    });
  
    return friendInfor;
  }
  getFriendByID(idUser:any) {
    return this.db.database.ref('tai_khoan/' + idUser);
  }

   // bạn chung
   setIDMutualFriend(id: string) {
    this.idMutualFriend = id;
  }
  getIDMutualFriend() {
    return this.idMutualFriend
  }
}

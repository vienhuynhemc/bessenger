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

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private friendSource = new BehaviorSubject<FriendInfor>(null);
  friendInforService = this.friendSource.asObservable();
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {}

  // thay đổi thông tin
  setFriendInforService(id: any) {
    this.friendSource.next(id);
  }
  // get list id dựa vào id đang đăng nhập
  getListIDFriendsByIDUser(): any {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    return this.db.database.ref('ban_be').child(parseIDUser);
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListFriendsInforByIDFriends(idUser: any) {
    let friendInfor = new FriendInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.on('value', (data) => {
      friendInfor.id = idUser;
      friendInfor.img = data.val().link_hinh;
      friendInfor.name = data.val().ten;
    });
    return friendInfor;
  }
}

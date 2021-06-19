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
  friendListSource = new BehaviorSubject<string>('');
  friendListService = this.friendListSource.asObservable();
  friendInfor : FriendInfor[];
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {}

  // thay đổi thông tin
  setFriendInforService(infor: FriendInfor) {
    this.friendSource.next(infor);
  }

  // lấy danh sách id bạn bè dựa vào id của user đăng nhập hiện tại
  getListIDFriendsByIDUser(): FriendInfor[] {
    // lấy id đăng nhập hiện tại trong localStorage
    this.friendInfor = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.db.list('ban_be/' + parseIDUser).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload })
        )
      )
    ).subscribe(customers => {
        customers.forEach(element => {
          let temp = this.getListFriendsInforByIDFriends(element.key);
          if(temp != null)
            this.friendInfor.push(temp)
        });
       
    });
   
     return this.friendInfor
  }

  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListFriendsInforByIDFriends(idUser: any) {
    // lấy id đăng nhập hiện tại trong localStorage
    let friendInfor = new FriendInfor();
    const ref = this.db.database.ref('tai_khoan/' + idUser);
    ref.get().then((snapshots) => {
      friendInfor.id = idUser;
      friendInfor.img = snapshots.val().link_hinh;
      friendInfor.name = snapshots.val().ten;
      return friendInfor;
    });
    return friendInfor;
  }
}

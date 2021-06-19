import { Injectable } from '@angular/core';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private friendSource = new BehaviorSubject<FriendInfor>(null);
  friendInforService = this.friendSource.asObservable();
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase,
    
  ) {}

  // thay đổi thông tin
  setFriendInforService(infor: FriendInfor) {
    this.friendSource.next(infor);
  }

  // lấy danh sách id bạn bè dựa vào id của user đăng nhập hiện tại
  getListIDFriendsByIDUser(): Observable<any> {
    // lấy id đăng nhập hiện tại trong localStorage
    let idUser = localStorage.getItem('id_user');
    if (idUser == null) {
      return null;
    } else {
      return null;
    }
  }
  
  // lấy ra list object bạn bè dựa vào id của mỗi object
  getListFriendsInforByIDFriends(listIDFriends: any) {
   
    return null;
  }
}

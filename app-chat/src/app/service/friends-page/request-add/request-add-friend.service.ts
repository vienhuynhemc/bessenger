import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class RequestAddFriendService {
  // danh sách lời mời kết bạn
  requestListService: AngularFireList<any> = null;

  constructor(public db: AngularFireDatabase) { }

  // lấy từ DB danh sách lời mời kết bạn
  getRequestAddFriendsService():AngularFireList<any> {
    return this.requestListService;
  }
}

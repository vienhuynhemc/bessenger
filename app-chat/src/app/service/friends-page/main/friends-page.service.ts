import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class FriendsPageService {
  // danh sách bạn bè
  friendsListService: AngularFireList<any> = null;
  constructor(public db: AngularFireDatabase) { }

  // lấy từ DB danh sách bạn bè
  getFriendsListService(): AngularFireList<any> {
   
    return this.friendsListService;
  }
  
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  constructor(public db: AngularFireDatabase) { }

  // thêm bạn vào DB
  insertFriendService(friend: void):void {

  }
}

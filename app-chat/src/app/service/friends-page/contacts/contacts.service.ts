import { Injectable } from '@angular/core';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private friendSource = new BehaviorSubject<FriendInfor>(null);
  friendInforService = this.friendSource.asObservable();
  constructor() { }

  // thay đổi thông tin 
  setFriendInforService(infor: FriendInfor) {
    this.friendSource.next(infor);
  }

 
}

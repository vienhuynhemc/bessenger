import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileFriendService {

  constructor( private db: AngularFireDatabase) { }
  getInforFriend(idUser: any) {
    return this.db.database.ref('tai_khoan/' + idUser);
  }
}

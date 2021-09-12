import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileFriendWsService {

  constructor( private db: AngularFireDatabase) { }
  getInforFriend(idUser: any) {
    return this.db.database.ref('tai_khoan_ws/' + idUser);
  }
  getConversation() {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws');
  }
  getKindConversation(id: string) {
    return this.db.database.ref('cuoc_tro_chuyen_ws/' + id);
  }
}

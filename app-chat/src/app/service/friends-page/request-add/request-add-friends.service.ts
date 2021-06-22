import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FriendsPageService } from '../friends-page.service';

@Injectable({
  providedIn: 'root'
})
export class RequestAddFriendsService {
  requestList: any[];
  constructor(private db: AngularFireDatabase, private friendsPageService: FriendsPageService) { }
  getRequestInforByIDUser(idUser: any) {
    return this.db.database.ref('loi_moi_ket_ban/' + idUser)
  }
  // danh sách bạn bè
  getRequestList() {
    return this.requestList;
  }
}

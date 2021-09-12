import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GiphyWsService {

  constructor(private db: AngularFireDatabase) { }
  accessAccount() {
    return this.db.database.ref('tai_khoan_ws')
  }
}

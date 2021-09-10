import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private db: AngularFireDatabase) { }
  accessAccount() {
    return this.db.database.ref('tai_khoan')
  }
}

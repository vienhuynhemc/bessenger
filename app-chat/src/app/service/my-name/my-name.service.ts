import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyNameService {

  public myName: string;
  public layTen: Subscription;

  constructor(
    private db: AngularFireDatabase
  ) { }

  public getName() {
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/tai_khoan/" + mtk).snapshotChanges();
  }

}

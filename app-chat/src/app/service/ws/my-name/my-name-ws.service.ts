import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyNameWsService {

  public myName: string;
  public layTen: Subscription;

  constructor(
    private db: AngularFireDatabase
  ) { }

  public getName() {
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    return this.db.object("/tai_khoan_ws/" + mtk).snapshotChanges();
  }

}

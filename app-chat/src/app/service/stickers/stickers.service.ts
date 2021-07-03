import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StickersService {
  isShowShop: boolean;
  constructor(private db: AngularFireDatabase) { }

  // hiển thị shop
  openShop() {
    this.isShowShop = !this.isShowShop;
  }

  themNhanDan() {

  }
}

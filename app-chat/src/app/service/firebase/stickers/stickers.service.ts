import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StickersService {
  isShowShop: boolean = false;
  isShowBoxGiphy: boolean = false;
  isShowBoxSticker: boolean = false;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  // hiển thị shop
  openShop() {
    this.isShowShop = !this.isShowShop;
  }
  // hiển thị sticker
  openSticker() {
    this.isShowBoxSticker = !this.isShowBoxSticker;
  }
  // hiển thị giphy
  openGiphy() {
    this.isShowBoxGiphy = !this.isShowBoxGiphy;
  }
  accessAccount() {
    return this.db.database.ref('tai_khoan')
  }
  // truy cập vào sử dụng nhãn dán
  accessUseSticker() {
    return this.db.database.ref('su_dung_nhan_dan');
  }
  // truy cập vào nhãn dán
  accessStickers() {
    return this.db.database.ref('nhan_dan');
  }
  addStickerFirst(id: string) {
    this.accessStickers().once('value', (sticker) => {
      let loop = 0
      sticker.forEach(element => {
          if(loop < 5 && element.val().ton_tai == 0) {
            this.db.database.ref('su_dung_nhan_dan').child(id).child(element.key).set({
              ngay_tao: Number(new Date()),
              ton_tai: 0
            })
            loop++;
          }
      });
    })
  }
  accessAccessHistorySticker() {
    return this.db.database.ref('lich_su_su_dung_nhan_dan');
  }
 
}

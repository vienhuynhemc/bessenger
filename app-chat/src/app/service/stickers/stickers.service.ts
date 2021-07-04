import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StickersService {
  isShowShop: boolean = false;
  isShowBoxGiphy: boolean = false;
  isShowBoxSticker: boolean = false;
  constructor(private db: AngularFireDatabase) { }

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
  // themNhanDan() {
  //   let post = this.db.database.ref('nhan_dan');
  //   let newKey = post.push();
  //   newKey.set({
  //     anh:'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.1997-6/83695669_476407373022859_502350503200423936_n.png?_nc_cat=111&ccb=1-3&_nc_sid=0572db&_nc_ohc=qOaf0_7CB18AX-Nc9sY&_nc_ht=scontent-hkg4-2.xx&oh=61cae224fbcff58ff7df9b17959f0f70&oe=60E598EB',
  //     anh_mo_ta:'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.1997-6/83871157_483514928978770_3707512917772468224_n.png?_nc_cat=110&ccb=1-3&_nc_sid=0572db&_nc_ohc=g7aG5ywUCbgAX_cA28R&tn=ezhNzfhhsiuYycKO&_nc_ht=scontent-hkg4-2.xx&oh=2295a36ccddc3fc109c66343e1cf05c4&oe=60E54C67',
  //     ten_loai:'Tình yêu dịu dàng',
  //     ton_tai: 0
  //   })
  // }
}

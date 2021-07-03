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
  // truy cập vào sử dụng nhãn dán
  accessUseSticker() {
    return this.db.database.ref('su_dung_nhan_dan');
  }
  // truy cập vào nhãn dán
  accessStickers() {
    return this.db.database.ref('nhan_dan');
  }
  themNhanDan() {
    let post = this.db.database.ref('nhan_dan').child('-MdenH-ssaWooJ39FGUF').child('danh_sach_nhan_dan');
    let newKey = post.push();
    newKey.set({
      src:'https://scontent.xx.fbcdn.net/v/t39.1997-6/116015199_608463983084743_1423387831326742760_n.webp?_nc_cat=106&ccb=1-3&_nc_sid=0572db&_nc_ohc=ilW-trgKcaAAX-0WkeX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=724a9c80f40fe88b51ef1b128a8e400b&oe=60E49F34'
    })
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

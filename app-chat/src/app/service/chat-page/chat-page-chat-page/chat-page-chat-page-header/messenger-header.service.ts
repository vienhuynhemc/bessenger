import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ObjectChat } from 'src/app/models/chat-page/chat-page-chat-page/header/object_chat';
import { ObjectChatThanhVien } from './../../../../models/chat-page/chat-page-chat-page/header/object_chat_thanh_vien';

@Injectable({
  providedIn: 'root'
})
export class MessengerHeaderService {

  // Đối tượng đang chat 
  public object_chat: ObjectChat;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.object_chat = new ObjectChat();
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
  }

  public update(): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    setTimeout(() => {
      // Kiểm tra online
      let currentTime = Number(new Date());
      if (this.object_chat != null) {
        let isOnline = false;
        if (this.object_chat.thanh_vien != null) {
          for (let j = 0; j < this.object_chat.thanh_vien.length; j++) {
            if (this.object_chat.thanh_vien[j].ma_tai_khoan != ma_tai_khoan) {
              let last_time = this.object_chat.thanh_vien[j].lan_cuoi_dang_nhap;
              let overTime = currentTime - last_time;
              if (overTime < 10000) {
                isOnline = true;
                break;
              }
            }
          }
        }
        this.object_chat.is_online = isOnline;
      }
      this.update();
    }, 5000);
  }

  public dienThongTinCoBan(object: Object): void {
    this.object_chat.loai = object['loai_cuoc_tro_truyen'];
    this.object_chat.mau = object['mau'];
    this.object_chat.bieu_tuong_cam_xuc = object['bieu_tuong_cam_xuc'];
  }

  public getObjectChat(ma_cuoc_tro_chuyen: string) {
    return this.db.object("/cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).snapshotChanges();
  }

  public getObjectChatThanhVien(ma_cuoc_tro_chuyen: string) {
    return this.db.object("/thanh_vien_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).snapshotChanges();
  }

  public getThongTinTroChuyenNhom(ma_cuoc_tro_chuyen: string) {
    return this.db.object("/thong_tin_tro_chuyen_nhom/" + ma_cuoc_tro_chuyen).snapshotChanges();
  }

  public dienThongTinNhom(object: Object) {
    if (object != null) {
      if (object['ton_tai'] == 0) {
        this.object_chat.ten_nhom = object['ten-nhom'];
        this.object_chat.ma_tai_khoan_so_huu = object['chu_so_huu'];
      }
    } else {
      this.object_chat.ten_nhom = null;
      this.object_chat.ma_tai_khoan_so_huu = null;
    }
  }

  public dienThanhVien(object: Object) {
    let array: ObjectChatThanhVien[] = [];
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      let objectChatThanhVien = new ObjectChatThanhVien();
      objectChatThanhVien.ma_tai_khoan = ma_thanh_vien;
      objectChatThanhVien.ngay_tham_gia = data_thanh_vien['ngay_tham_gia'];
      array.push(objectChatThanhVien);
    });
    this.object_chat.thanh_vien = array;
  }

  public getDataThanhVien() {
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public dienThongTinThanhVien(object: Object) {
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].ma_tai_khoan == ma_thanh_vien) {
          this.object_chat.thanh_vien[i].lan_cuoi_dang_nhap = data_thanh_vien['lan_cuoi_dang_nhap'];
          this.object_chat.thanh_vien[i].hinh = data_thanh_vien['link_hinh'];
          this.object_chat.thanh_vien[i].ten = data_thanh_vien['ten'];
        }
      }
    });
  }

}

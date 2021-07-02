import { ObjectDangNhap } from './../../../../models/chat-page/chat-page-chat-page/content/object_dang_nhap';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatPageCuocTroChuyen } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen';
import { ChatPageObjectTinNhanFriend } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_object_tin_nhan_friend';
import { ChatPageTinhTrangXem } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_tinh_trang_xem';
import { ChatPageTinNhan } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_tin_nhan';
import { ObjectChatContent } from './../../../../models/chat-page/chat-page-chat-page/content/object_chat_content';

@Injectable({
  providedIn: 'root'
})
export class ChatPageChatPageContentService {

  // Đối tượng đang chat 
  public object_chat: ObjectChatContent;
  // Danh sách mã tài khoản bạn bè
  public ban_bes: string[];
  // oninput
  public onInput: boolean;
  // Đối tượng tượng đang nhập
  public dang_nhaps: ObjectDangNhap[];

  constructor
    (
      private db: AngularFireDatabase
    ) {
    this.object_chat = new ObjectChatContent();
    this.object_chat.cuoc_tro_truyen = new ChatPageCuocTroChuyen();
    this.dang_nhaps = [];
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
    // Hàm cập nhật đang nhập 3s 1 lần
    this.updateDangNhap();
  }

  public updateOnInput(id: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let hinh = "";
    let ten = "";
    if (this.object_chat.thanh_vien != null) {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].ma_tai_khoan == ma_tai_khoan) {
          hinh = this.object_chat.thanh_vien[i].link_hinh_dai_dien;
          ten = this.object_chat.thanh_vien[i].getName();
          break;
        }
      }
    }
    setTimeout(() => {
      let current = Number(new Date());
      this.db.object("/trang_thai_dang_nhap/" + id + "/" + ma_tai_khoan).update({ lan_cuoi_dang_nhap: current, hinh: hinh, ten: ten })
      if (this.onInput) {
        this.updateOnInput(id);
      }
    }, 2500);
  }

  public getDangNhap(id: string) {
    return this.db.object("/trang_thai_dang_nhap/" + id).snapshotChanges();
  }

  public dienThongTinDangNhap(object: Object) {
    if (object != null) {
      let array: ObjectDangNhap[] = [];
      let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
      Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
        if (ma_thanh_vien != ma_tai_khoan) {
          let o = new ObjectDangNhap();
          o.ma_tai_khoan = ma_thanh_vien;
          o.lan_cuoi_dang_nhap = data_thanh_vien['lan_cuoi_dang_nhap'];
          o.hinh = data_thanh_vien['hinh'];
          o.ten = data_thanh_vien['ten'];
          array.push(o);
        }
      });
      // Xem thử ông nào quá 2s thì xóa
      let currentTime = Number(new Date());
      let count = 0;
      while (count < array.length) {
        if (currentTime - array[count].lan_cuoi_dang_nhap > 2000) {
          array.splice(count, 1);
        } else {
          count++;
        }
      }
      this.dang_nhaps = array;
    }
  }

  public updateDangNhap() {
    setTimeout(() => {
      // Xem thử ông nào quá 2s thì xóa
      let currentTime = Number(new Date());
      let count = 0;
      while (count < this.dang_nhaps.length) {
        if (currentTime - this.dang_nhaps[count].lan_cuoi_dang_nhap > 2000) {
          this.dang_nhaps.splice(count, 1);
        } else {
          count++;
        }
      }
      this.updateDangNhap();
    }, 3000);
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

  public getBanBe() {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/ban_be/" + ma_tai_khoan).snapshotChanges();
  }

  public getCreateFriends(): string {
    return this.object_chat.getCreateFriends(this.ban_bes);
  }

  public layBanBe(object: Object) {
    let ban_bes: string[] = [];
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      if (data_thanh_vien['ton_tai'] == 0) {
        ban_bes.push(ma_thanh_vien);
      }
    });
    this.ban_bes = ban_bes;
  }

  public dienThongTinCoBan(object: Object): void {
    this.object_chat.cuoc_tro_truyen.loai_cuoc_tro_truyen = object['loai_cuoc_tro_truyen'];
    this.object_chat.cuoc_tro_truyen.mau = object['mau'];
    this.object_chat.cuoc_tro_truyen.bieu_tuong_cam_xuc = object['bieu_tuong_cam_xuc'];
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
        this.object_chat.cuoc_tro_truyen.ten_nhom = object['ten-nhom'];
        this.object_chat.cuoc_tro_truyen.ma_tai_khoan_chu_so_huu = object['chu_so_huu'];
        this.object_chat.cuoc_tro_truyen.ngay_tao = object['ngay_tao'];
        this.object_chat.cuoc_tro_truyen.ton_tai = object['ton_tai'];
      }
    } else {
      this.object_chat.cuoc_tro_truyen.ten_nhom = null;
      this.object_chat.cuoc_tro_truyen.ma_tai_khoan_chu_so_huu = null;
      this.object_chat.cuoc_tro_truyen.ngay_tao = null;
      this.object_chat.cuoc_tro_truyen.ton_tai = null;
    }
  }

  public dienThanhVien(object: Object) {
    let array: ChatPageObjectTinNhanFriend[] = [];
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      let objectChatThanhVien = new ChatPageObjectTinNhanFriend();
      objectChatThanhVien.ma_tai_khoan = ma_thanh_vien;
      objectChatThanhVien.ngay_tham_gia = data_thanh_vien['ngay_tham_gia'];
      objectChatThanhVien.trang_thai = data_thanh_vien['trang_thai'];
      objectChatThanhVien.roi_chua = data_thanh_vien['roi_chua'];
      objectChatThanhVien.ngay_roi_di = data_thanh_vien['ngay_roi_di'];
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
          this.object_chat.thanh_vien[i].link_hinh_dai_dien = data_thanh_vien['link_hinh'];
          this.object_chat.thanh_vien[i].ten = data_thanh_vien['ten'];
        }
      }
    });
  }

  public getTinNhan(id: string) {
    return this.db.object("/chi_tiet_cuoc_tro_chuyen/" + id).snapshotChanges();
  }

  public dienTinNhan(value: object) {
    let tin_nhans: ChatPageTinNhan[] = [];
    Object.entries(value).forEach(([ma_tin_nhan, data_tin_nhan]) => {
      let tin_nhan = new ChatPageTinNhan();
      tin_nhan.ma_tin_nhan = ma_tin_nhan;
      tin_nhan.dia_chi_file = data_tin_nhan['dia_chi_file'];
      tin_nhan.link_file = data_tin_nhan['link_file'];
      tin_nhan.loai_tin_nhan = data_tin_nhan['loai_tin_nhan'];
      tin_nhan.ma_tai_khoan = data_tin_nhan['ma_tai_khoan'];
      tin_nhan.ma_tin_nhan_phan_hoi = data_tin_nhan['ma_tin_nhan_phan_hoi'];
      tin_nhan.ngay_gui = data_tin_nhan['ngay_gui'];
      tin_nhan.noi_dung = data_tin_nhan['noi_dung'];
      let tinhTrangXem: object = data_tin_nhan['tinh_trang_xem'];
      let tinh_trang_xems: ChatPageTinhTrangXem[] = [];
      if (tinhTrangXem != null) {
        Object.entries(tinhTrangXem).forEach(([ma_tai_khoan, data]) => {
          let o = new ChatPageTinhTrangXem();
          o.ma_tai_khoan = ma_tai_khoan;
          o.ngay_xem = data['ngay_xem'];
          o.xem_chua = data['xem_chua'];
          o.ngay_nhan = data['ngay_nhan'];
          tinh_trang_xems.push(o);
        });
        tin_nhan.tinh_trang_xem = tinh_trang_xems;
        tin_nhans.push(tin_nhan);
      }
    });
    this.object_chat.cuoc_tro_truyen.tin_nhan = tin_nhans;
  }

}

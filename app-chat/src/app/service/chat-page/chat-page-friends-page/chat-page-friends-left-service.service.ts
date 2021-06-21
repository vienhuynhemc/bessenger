import { ChatPageObjectTinNhanFriend } from './../../../models/chat-page/chat-page-friends-page/chat_page_object_tin_nhan_friend';
import { ChatPageCuocTroChuyen } from './../../../models/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatPageProcessServiceService } from '../chat-page-process-service.service';
import { ChatPageFriendsObjectLeft } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_friends_object_left';

@Injectable({
  providedIn: 'root'
})
export class ChatPageFriendsLeftServiceService {

  // Danh sách all cuộc trò truyện
  public allCuocTroTruyen: ChatPageCuocTroChuyen[];
  // Danh sách các box chat để hiển thị ra
  public allBoxData: ChatPageFriendsObjectLeft[];

  constructor(
    private db: AngularFireDatabase,
    private main_page_process_service: ChatPageProcessServiceService
  ) {
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
  }

  public getLength(): number {
    if (this.allBoxData != null) {
      return this.allBoxData.length;
    }
    return 0;
  }

  public update(): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    setTimeout(() => {
      // Kiểm tra online
      let currentTime = Number(new Date());
      for (let i = 0; i < this.allBoxData.length; i++) {
        let isOnline = false;
        for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
          if (this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan != ma_tai_khoan) {
            let last_time = this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap;
            let overTime = currentTime - last_time;
            if (overTime < 10000) {
              isOnline = true;
              break;
            }
          }
        }
        this.allBoxData[i].trang_thai_online = isOnline;
      }
      this.update();
    }, 5000);
  }

  // Get index đang được chọn
  public getIndexSeleced(): number {
    let index = -1;
    if (this.allBoxData != null) {
      for (let i = 0; i < this.allBoxData.length; i++) {
        if (this.allBoxData[i].box_chat_dang_duoc_chon) {
          return i;
        }
      }
    }
    return index;
  }

  public updateSelected(ma_cuoc_tro_chuyen: string) {
    // Select
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == ma_cuoc_tro_chuyen) {
        this.allBoxData[i].box_chat_dang_duoc_chon = true;
      } else {
        this.allBoxData[i].box_chat_dang_duoc_chon = false;
      }
    }
    // cập nhật là bản thân đã xem tin này rồi
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    this.db.object("/thanh_vien_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen + "/" + ma_tai_khoan).update({ tai_khoan_da_xem_chua: "roi" });
  }

  public checkUrl(ma_cuoc_tro_chuyen: string): boolean {
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == ma_cuoc_tro_chuyen) {
        return true;
      }
    }
    return false;
  }

  public dienTinNhanCuoiCung(key: string, value: object) {
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == key) {
        let tin_nhan: object = null;
        let ngay_gui_gan_nhat: number = 0;
        Object.entries(value).forEach(([ma_tin_nhan, data_tin_nhan]) => {
          if (data_tin_nhan['ngay_gui'] > ngay_gui_gan_nhat) {
            ngay_gui_gan_nhat = data_tin_nhan['ngay_gui'];
            tin_nhan = data_tin_nhan;
          }
        });
        if (tin_nhan != null) {
          this.allBoxData[i].loai_tin_nhan_cuoi_cung = tin_nhan['loai_tin_nhan'];
          if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "gui_hinh") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = "gửi một Hình";
          } else if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "gui_text") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = tin_nhan['noi_dung'];
          } else if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "gui_video") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = "gửi một Video";
          } else if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "gui_ghi_am") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = "gửi một đoạn Ghi âm";
          } else if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "gui_file") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = "gửi một File";
          } else if (this.allBoxData[i].loai_tin_nhan_cuoi_cung == "phan_hoi") {
            this.allBoxData[i].noi_dun_tin_nhan_cuoi_cung = "phản hồi một tin nhắn";
          }
          this.allBoxData[i].ma_tai_khoan_tin_nhan_cuoi_cung = tin_nhan['ma_tai_khoan'];
          this.allBoxData[i].ngay_tao_tin_nhan_cuoi_cung = tin_nhan['ngay_gui'];
        }
        return;
      }
    }
  }

  public dienTenVaHinhChoTaiKhoanTrongBoxData(key: string, value: object) {
    for (let i = 0; i < this.allBoxData.length; i++) {
      for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
        if (this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan == key) {
          this.allBoxData[i].thong_tin_thanh_vien[j].ten = value['ten'];
          this.allBoxData[i].thong_tin_thanh_vien[j].link_hinh_dai_dien = value['link_hinh'];
          this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap = value['lan_cuoi_dang_nhap'];
          break;
        }
      }
    }
  }

  public getBoxData(key: string, value: object): ChatPageFriendsObjectLeft {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let boxData = new ChatPageFriendsObjectLeft();
    for (let i = 0; i < this.allCuocTroTruyen.length; i++) {
      if (this.allCuocTroTruyen[i].ma_cuoc_tro_chuyen == key) {
        // clone chat page cuoc tro chuyen
        let chatPageCuocTroChuyen = new ChatPageCuocTroChuyen();
        chatPageCuocTroChuyen.ma_cuoc_tro_chuyen = this.allCuocTroTruyen[i].ma_cuoc_tro_chuyen;
        chatPageCuocTroChuyen.loai_cuoc_tro_truyen = this.allCuocTroTruyen[i].loai_cuoc_tro_truyen;
        chatPageCuocTroChuyen.ngay_tao = this.allCuocTroTruyen[i].ngay_tao;
        chatPageCuocTroChuyen.ten_nhom = this.allCuocTroTruyen[i].ten_nhom;
        boxData.cuoc_tro_truyen = chatPageCuocTroChuyen;
        // Điền các thông tin đầu tiên cho các thành viên
        let thong_tin_thanh_vien: ChatPageObjectTinNhanFriend[] = [];
        let isOke = false;
        Object.entries(value).forEach(([key2, value2]) => {
          let chat_page_object_tin_nhan_friend = new ChatPageObjectTinNhanFriend();
          chat_page_object_tin_nhan_friend.ma_tai_khoan = key2;
          chat_page_object_tin_nhan_friend.tai_khoan_da_xem_chua = value2['tai_khoan_da_xem_chua'];
          thong_tin_thanh_vien.push(chat_page_object_tin_nhan_friend);
          if (!isOke) {
            if (key2 == ma_tai_khoan) {
              isOke = true;
            }
          }
        });
        if (!isOke) return null;
        boxData.thong_tin_thanh_vien = thong_tin_thanh_vien;
        break;
      }
    }
    return boxData;
  }

  public getAllTaiKhoan() {
    setTimeout(() => {
      this.main_page_process_service.setLoading(true);
    }, 0);
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public getAllChiTietCuocTroChuyen() {
    setTimeout(() => {
      this.main_page_process_service.setLoading(true);
    }, 0);
    return this.db.object("/chi_tiet_cuoc_tro_chuyen").snapshotChanges();
  }

  public getAllCuocTroChuyen() {
    setTimeout(() => {
      this.main_page_process_service.setLoading(true);
    }, 0);
    return this.db.object("/cuoc_tro_chuyen").snapshotChanges();
  }

  public getAllCuocTroChuyenNhom() {
    setTimeout(() => {
      this.main_page_process_service.setLoading(true);
    }, 0);
    return this.db.object("/thong_tin_tro_chuyen_nhom").snapshotChanges();
  }

  public dienThongTinNhom(ma_nhom: string, value: object) {
    for (let i = 0; i < this.allCuocTroTruyen.length; i++) {
      if (this.allCuocTroTruyen[i].loai_cuoc_tro_truyen == 'nhom') {
        if (this.allCuocTroTruyen[i].ma_cuoc_tro_chuyen == ma_nhom) {
          this.allCuocTroTruyen[i].ten_nhom = value['ten-nhom'];
          this.allCuocTroTruyen[i].ngay_tao = value['ngay_tao'];
          break;
        }
      }
    }
  }

  public getThanhVienCuocTroTruyen() {
    setTimeout(() => {
      this.main_page_process_service.setLoading(true);
    }, 0);
    return this.db.object("/thanh_vien_cuoc_tro_chuyen").snapshotChanges();
  }

}

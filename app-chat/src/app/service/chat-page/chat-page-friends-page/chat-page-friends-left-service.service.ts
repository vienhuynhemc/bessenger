import { ChatPageTinhTrangXem } from './../../../models/chat-page/chat-page-friends-page/chat_page_tinh_trang_xem';
import { ChatPageTinNhan } from './../../../models/chat-page/chat-page-friends-page/chat_page_tin_nhan';
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

  // ma_cuoc_tro_chuyen hien hien tai
  public now_ma_cuoc_tro_chuyen: string;

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

  public updateSelected() {
    // Select
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == this.now_ma_cuoc_tro_chuyen) {
        this.allBoxData[i].box_chat_dang_duoc_chon = true;
      } else {
        this.allBoxData[i].box_chat_dang_duoc_chon = false;
      }
    }
  }

  public seen(ma_cuoc_tro_chuyen: string) {
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == ma_cuoc_tro_chuyen) {
        if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan != null) {
          let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
          let currentTime = Number(new Date());
          for (let j = 0; j < this.allBoxData[i].cuoc_tro_truyen.tin_nhan.length; j++) {
            if (this.isChuaXem(this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem)) {
              let url = "/chi_tiet_cuoc_tro_chuyen/" + this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen + "/" + this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ma_tin_nhan + "/tinh_trang_xem/" + ma_tai_khoan;
              this.db.database.ref(url).update({ xem_chua: "roi", ngay_xem: currentTime });
            }
          }
          break;
        }
      }
    }
  }

  public isChuaXem(array: ChatPageTinhTrangXem[]): boolean {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    for (let i = 0; i < array.length; i++) {
      if (array[i].ma_tai_khoan == ma_tai_khoan) {
        if (array[i].xem_chua == "roi") {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  public checkUrl(ma_cuoc_tro_chuyen: string): boolean {
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == ma_cuoc_tro_chuyen) {
        return true;
      }
    }
    return false;
  }

  public dienTinNhan(key: string, value: object) {
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == key) {
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
          Object.entries(tinhTrangXem).forEach(([ma_tai_khoan, data]) => {
            let o = new ChatPageTinhTrangXem();
            o.ma_tai_khoan = ma_tai_khoan;
            o.ngay_xem = data['ngay_xem'];
            o.xem_chua = data['xem_chua'];
            tinh_trang_xems.push(o);
          });
          tin_nhan.tinh_trang_xem = tinh_trang_xems;
          tin_nhans.push(tin_nhan);
        });
        this.allBoxData[i].cuoc_tro_truyen.tin_nhan = tin_nhans;
        return;
      }
    }
  }

  public sort(): void {
    // sort lại theo ngày gửi của tin nhắn cuối cùng
    this.allBoxData = this.allBoxData.sort((boxData1, boxData2) => {
      let last_time_boxData1 = boxData1.getLastTime();
      let last_time_boxData2 = boxData2.getLastTime();
      return last_time_boxData2 - last_time_boxData1;
    });
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
      if (this.allBoxData[i].cuoc_tro_truyen.ma_tai_khoan_chu_so_huu == key) {
        this.allBoxData[i].cuoc_tro_truyen.ten_nguoi_so_huu = value['ten'];
      }
      if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan != null) {
        for (let j = 0; j < this.allBoxData[i].cuoc_tro_truyen.tin_nhan.length; j++) {
          for (let k = 0; k < this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem.length; k++) {
            if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].ma_tai_khoan == key) {
              this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].ten = value['ten'];
              this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].hinh =  value['link_hinh'];
            }
          }
          if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ma_tai_khoan == key) {
            this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ten = value['ten'];
          }
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
        chatPageCuocTroChuyen.ton_tai = this.allCuocTroTruyen[i].ton_tai;
        chatPageCuocTroChuyen.ma_tai_khoan_chu_so_huu = this.allCuocTroTruyen[i].ma_tai_khoan_chu_so_huu;
        chatPageCuocTroChuyen.ten_nguoi_so_huu = this.allCuocTroTruyen[i].ten_nguoi_so_huu;
        boxData.cuoc_tro_truyen = chatPageCuocTroChuyen;
        // Điền các thông tin đầu tiên cho các thành viên
        let thong_tin_thanh_vien: ChatPageObjectTinNhanFriend[] = [];
        let isOke = false;
        Object.entries(value).forEach(([key2, value2]) => {
          let chat_page_object_tin_nhan_friend = new ChatPageObjectTinNhanFriend();
          chat_page_object_tin_nhan_friend.ma_tai_khoan = key2;
          chat_page_object_tin_nhan_friend.ngay_tham_gia = value2['ngay_tham_gia'];
          thong_tin_thanh_vien.push(chat_page_object_tin_nhan_friend);
          if (!isOke) {
            if (key2 == ma_tai_khoan) {
              isOke = true;
            }
          }
        });
        if (!isOke) return null;
        boxData.thong_tin_thanh_vien = thong_tin_thanh_vien;
        boxData.box_chat_dang_duoc_chon = false;
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
        if (this.allCuocTroTruyen[i].ma_cuoc_tro_chuyen == ma_nhom && value['ton_tai'] == 0) {
          this.allCuocTroTruyen[i].ten_nhom = value['ten-nhom'];
          this.allCuocTroTruyen[i].ngay_tao = value['ngay_tao'];
          this.allCuocTroTruyen[i].ma_tai_khoan_chu_so_huu = value['chu_so_huu'];
          this.allCuocTroTruyen[i].ton_tai = value['ton_tai'];
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

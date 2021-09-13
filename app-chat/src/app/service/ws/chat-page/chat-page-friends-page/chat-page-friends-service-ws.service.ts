import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { count } from 'rxjs/operators';
import { ChatPageBanBeWS } from 'src/app/models/ws/chat-page/chat-page-friends-page/chat_page_ban_be_ws';
import { SettingWS } from 'src/app/models/ws/settings/setting_ws';
import { ChatPageProcessServiceWsService } from '../chat-page-process-service-ws.service';
import { ChatPageFriendsWebsocketService } from './chat-page-friends-websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatPageFriendsServiceWsService {
  // Danh sách bạn bè 
  public ban_bes: ChatPageBanBeWS[];
  // Danh sách các mã cuộc trò chuyện đơn
  public maCuocTroChuyenDons: string[];
  // cai dat
  public settingsOfUser: SettingWS = new SettingWS();
  // Trạng thái online
  public isOnline;

  // service
  public layListBanbe: Subscription;
  public layTroChuyenDon: Subscription;
  public layThanhVienCuocTroChuyen: Subscription;
  public layThongTinThanhVien: Subscription;
  public layLanCuoiDangNhap: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private main_page_process_service: ChatPageProcessServiceWsService,
   
  ) {
  
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
  }

  public dienBanBeOnline(object: Object) {
    let banBes: ChatPageBanBeWS[] = [];
    if (object != null) {
      Object.entries(object).forEach(([key, value]) => {
        if (value['ton_tai'] == "0") {
          let cpbb: ChatPageBanBeWS = new ChatPageBanBeWS();
          cpbb.ma_tai_khoan = key;
          banBes.push(cpbb);
        }
      });
    }
    this.ban_bes = banBes;
    setTimeout(() => {
      this.main_page_process_service.setLoading(false);
    }, 0);
  }

  public dienTroChuyenDonOnline(object: Object) {
    let cuocTroChuyenDons: string[] = [];
    if (object != null) {
      Object.entries(object).forEach(([key, value]) => {
        if (value['loai_cuoc_tro_truyen'] == 'don') {
          cuocTroChuyenDons.push(key);
        };
      });
    }
    this.maCuocTroChuyenDons = cuocTroChuyenDons;
    setTimeout(() => {
      this.main_page_process_service.setLoading(false);
    }, 0);
  }

  public dienThanhVienCuocTroChuyenOnline(object: Object) {
    if (object != null) {
      Object.entries(object).forEach(([key, value]) => {
        // Duyện đúng mã trò truyện đơn thì check thử nó có chứa 2 tài khoản không
        if (this.checkContain(key)) {
          this.handleThanhVienCuocTroChuyenDon(value, key);
        }
      });
    }
  }

  public getLanCuoiDangNhap() {
    return this.db.object("/lan_cuoi_dang_nhap_ws").snapshotChanges();
  }

  public dienLanCuoiDangNhap(object: Object) {
    let count = 0;
    if (this.ban_bes != null && object != null) {
      Object.entries(object).forEach(([key, value]) => {
        for (let i = 0; i < this.ban_bes.length; i++) {
          if (this.ban_bes[i].ma_tai_khoan == key) {
            this.ban_bes[i].lan_cuoi_dang_nhap = value['lan_cuoi_dang_nhap'];
            count++;
            break;
          }
        }
      });
      // Thằng nào chưa có thì cho nó là 0
      if (count != this.ban_bes.length) {
        for (let i = 0; i < this.ban_bes.length; i++) {
          if (this.ban_bes[i].lan_cuoi_dang_nhap == null) {
            this.ban_bes[i].lan_cuoi_dang_nhap = 0;
          }
        }
      }
    }
  }

  public update(): void {
    setTimeout(() => {
      let currentTime = Number(new Date());
      if (this.ban_bes != null) {
        let count = 0;
        for (let i = 0; i < this.ban_bes.length; i++) {
          this.db.database.ref('cai_dat_ws').child(this.ban_bes[i].ma_tai_khoan).on('value', set =>{
            if(set.val().trang_thai_hoat_dong == 'tat') {
              this.ban_bes[i].trang_thai_online = false;
              count++;
            } else {
              let lan_cuoi_dang_nhap = this.ban_bes[i].lan_cuoi_dang_nhap;
              let overTime = currentTime - lan_cuoi_dang_nhap;
              if (overTime > 10000) {
                this.ban_bes[i].trang_thai_online = false;
                count++;
              } else {
                this.ban_bes[i].trang_thai_online = true;
                this.isOnline = true;
              }
            }
          })
        }
        if (count == this.ban_bes.length) {
          this.isOnline = false;
        }
      }
      this.update();
    }, 5000);
  }

  public getListFriend() {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    return this.db.object("/ban_be_ws/" + ma_tai_khoan).snapshotChanges();
  }

  public getCuocTroChuyenDon() {
    return this.db.object("/cuoc_tro_chuyen_ws").snapshotChanges();
  }

  public getTaiKhoan() {
    return this.db.object("/tai_khoan_ws").snapshotChanges();
  }

  public getThanhVienCuocTroChuyenDon() {
    return this.db.object("/thanh_vien_cuoc_tro_chuyen_ws").snapshotChanges();
  }

  // Check 1 string có ở trong 1 string[]
  public checkContain(value: string): boolean {
    for (let i = 0; i < this.maCuocTroChuyenDons.length; i++) {
      if (this.maCuocTroChuyenDons[i] == value) {
        return true;
      }
    }
    return false;
  }

  // Nhận vô 1 Json object, check thử có có chứa 2 tài khoản hay không
  public handleThanhVienCuocTroChuyenDon(jsonObject: object, ma_cuoc_tro_chuyen: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    let isOKeA = false;
    let isOKeB = false;
    let index = -1;
    Object.entries(jsonObject).forEach(([key, value]) => {
      if (key == ma_tai_khoan) {
        isOKeA = true;
      } else {
        index = this.checkMaTaiKhoanInChatPageBanBe(key)
        if (index != -1) {
          isOKeB = true;
        }
      }
    });
    if (isOKeA && isOKeB) {
      this.ban_bes[index].ma_cuoc_tro_chuyen = ma_cuoc_tro_chuyen;
    }
  }

  public createNhungBanBeChuaCoCuocTroChuyen(): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    let currentTime = Number(new Date());
    for (let i = 0; i < this.ban_bes.length; i++) {
      if (this.ban_bes[i].ma_cuoc_tro_chuyen == null) {
        let object = this.db.list("/cuoc_tro_chuyen_ws").push({ loai_cuoc_tro_truyen: "don", bieu_tuong_cam_xuc: "khong", mau: "#3275f7" });
        this.db.object("/thanh_vien_cuoc_tro_chuyen_ws/" + object.key + "/" + ma_tai_khoan).update({ ngay_tham_gia: currentTime, trang_thai: "khong_cho" });
        this.db.object("/thanh_vien_cuoc_tro_chuyen_ws/" + object.key + "/" + this.ban_bes[i].ma_tai_khoan).update({ ngay_tham_gia: currentTime, trang_thai: "khong_cho" });
        this.ban_bes[i].ma_cuoc_tro_chuyen = object.key;
      }
    }
  }

  // Check thử 1 string có phải là mã tài khoản trong list chatpageBanBe
  public checkMaTaiKhoanInChatPageBanBe(key: string) {
    for (let i = 0; i < this.ban_bes.length; i++) {
      if (this.ban_bes[i].ma_cuoc_tro_chuyen == null && this.ban_bes[i].ma_tai_khoan == key) {
        return i;
      }
    }
    return -1;
  }

  public getHinhDaiDienVaLanCuoiDangNhapChoChatPageBanBe(key: string, value: object) {
    if (this.ban_bes != null) {
      for (let i = 0; i < this.ban_bes.length; i++) {
        if (this.ban_bes[i].ma_tai_khoan == key) {
          this.ban_bes[i].link_hinh_dai_dien = value['link_hinh'];
          this.ban_bes[i].ten = value['ten'];
          this.ban_bes[i].email = value['email'];
          // Tạo luôn tên giới hạn
          this.ban_bes[i].getTenGioiHan();
          break;
        }
      }
    }
  }

  // lấy ra cài đặt
  getSettings() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.db.database.ref('cai_dat_ws').child(idUser).on('value', set => {
      this.settingsOfUser = new SettingWS()
      this.settingsOfUser.ma_tai_khoan = set.key;
      this.settingsOfUser.trang_thai_hoat_dong = set.val().trang_thai_hoat_dong;
      this.settingsOfUser.khong_lam_phien = set.val().khong_lam_phien;
      this.settingsOfUser.hien_thi_ban_xem_truoc = set.val().hien_thi_ban_xem_truoc;
      this.settingsOfUser.am_thanh_thong_bao = set.val().am_thanh_thong_bao;
    })
  }
}

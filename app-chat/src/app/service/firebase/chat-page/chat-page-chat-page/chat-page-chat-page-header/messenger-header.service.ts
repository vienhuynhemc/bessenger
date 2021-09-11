import { ChatPageChatPageContentService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ObjectChat } from 'src/app/models/firebase/chat-page/chat-page-chat-page/header/object_chat';
import { MyNameService } from '../../../my-name/my-name.service';
import { ObjectChatThanhVien } from 'src/app/models/firebase/chat-page/chat-page-chat-page/header/object_chat_thanh_vien';

@Injectable({
  providedIn: 'root'
})
export class MessengerHeaderService {

  // Đối tượng đang chat 
  public object_chat: ObjectChat;

  // Service
  public layAllCuocTroChuyen: Subscription;
  public layThongTinNhom: Subscription;
  public layThanhVien: Subscription;
  public layThongTinThanhVien: Subscription;
  public layLanCuoiDangNhap: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private content_service: ChatPageChatPageContentService,
    private my_name_service: MyNameService
  ) {
    this.object_chat = new ObjectChat();
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
  }

  public getLanCuoiDangNhap() {
    return this.db.object("/lan_cuoi_dang_nhap").snapshotChanges();
  }

  public roiKhoiNhom(mctc: string) {
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(mctc,
      "đã rời khởi nhóm", "thong_bao", this.my_name_service.myName);
    // Rời nhóm
    let currentTime = Number(new Date());
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    this.db.object("/thanh_vien_cuoc_tro_chuyen/" + mctc + "/" + ma_tai_khoan).update({ roi_chua: "roi", ngay_roi_di: currentTime });
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
                if(this.object_chat.thanh_vien[j].trang_thai_hoat_dong == 'tat') {
                  isOnline = false;
                } else {
                  if (this.object_chat.loai == 'nhom') {
                    if (this.object_chat.thanh_vien[j].roi_chua == 'chua') {
                      let last_time = this.object_chat.thanh_vien[j].lan_cuoi_dang_nhap;
                      let overTime = currentTime - last_time;
                      if (overTime < 10000) {
                        isOnline = true;
                      }
                    }
                  } else {
                    let last_time = this.object_chat.thanh_vien[j].lan_cuoi_dang_nhap;
                    let overTime = currentTime - last_time;
                    if (overTime < 10000) {
                      isOnline = true;
                     
                    }
                  }
                }
              if(isOnline)
                break;
            }
          }
        }
        this.object_chat.is_online = isOnline;
      }
      this.update();
    }, 5000);
  }

  public dienThongTinCoBan(object: Object): void {
    if (object != null) {
      this.object_chat.loai = object['loai_cuoc_tro_truyen'];
      this.object_chat.mau = object['mau'];
      this.object_chat.mau_duoi = object['duoi'];
      this.object_chat.mau_tren = object['mau_tren'];
      if (this.object_chat.mau == '#3275f7') {
        this.object_chat.mau = 'linear-gradient(0deg,#3275f7, #3275f7)';
        this.object_chat.mau_tren = "#3275f7";
        this.object_chat.mau_duoi = "#3275f7";
      }
      this.object_chat.bieu_tuong_cam_xuc = object['bieu_tuong_cam_xuc'];
    }
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
        this.object_chat.ten_nhom = object['ten_nhom'];
        this.object_chat.ma_tai_khoan_so_huu = object['chu_so_huu'];
      }
    } else {
      this.object_chat.ten_nhom = null;
      this.object_chat.ma_tai_khoan_so_huu = null;
    }
  }

  public dienThanhVien(object: Object) {
    let array: ObjectChatThanhVien[] = [];
    if (object != null) {
      Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
        let objectChatThanhVien = new ObjectChatThanhVien();
        objectChatThanhVien.ma_tai_khoan = ma_thanh_vien;
        objectChatThanhVien.ngay_tham_gia = data_thanh_vien['ngay_tham_gia'];
        objectChatThanhVien.ngay_roi_di = data_thanh_vien['ngay_roi_di'];
        objectChatThanhVien.roi_chua = data_thanh_vien['roi_chua'];
        array.push(objectChatThanhVien);
      });
    }
    this.object_chat.thanh_vien = array;
    // Có được thành viên rồi check thử bản thân rời khỏi cuộc trò chuyện này hay chưa
    this.object_chat.getIsRoiChua();
    // Kiểm tra đã rời hết chưa
    this.object_chat.getIsRoiHetChua();
  }

  public getDataThanhVien() {
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public dienLanCuoiDangNhap(object: Object) {
    let count = 0;
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].ma_tai_khoan == ma_thanh_vien) {
          this.object_chat.thanh_vien[i].lan_cuoi_dang_nhap = data_thanh_vien['lan_cuoi_dang_nhap'];
          count++;
          break;
        }
      }
    });
    if (count != this.object_chat.thanh_vien.length) {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].lan_cuoi_dang_nhap == null) {
          this.object_chat.thanh_vien[i].lan_cuoi_dang_nhap = 0;
        }
      }
    }
  }

  public dienThongTinThanhVien(object: Object) {
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].ma_tai_khoan == ma_thanh_vien) {
          this.object_chat.thanh_vien[i].hinh = data_thanh_vien['link_hinh'];
          this.object_chat.thanh_vien[i].ten = data_thanh_vien['ten'];
          this.db.database.ref('cai_dat').child(ma_thanh_vien).on('value', set => {
            this.object_chat.thanh_vien[i].trang_thai_hoat_dong = set.val().trang_thai_hoat_dong;
          })
        }
      }
    });
    // Điền xong dữ liêu thành viên thì getimgs
    this.object_chat.getImgs();
    // Lấy tên
    this.object_chat.getName();
  }

}

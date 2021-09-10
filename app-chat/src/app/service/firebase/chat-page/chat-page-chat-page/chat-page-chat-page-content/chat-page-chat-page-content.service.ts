import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CamXucTinNhan } from 'src/app/models/firebase/chat-page/chat-page-chat-page/content/select-emoji/cam_xuc_tin_nhan';
import { EmojiMessenger } from 'src/app/models/firebase/chat-page/chat-page-chat-page/content/select-emoji/emoji_messenger';
import { ChatPageCuocTroChuyen } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen';
import { ChatPageObjectTinNhanFriend } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_object_tin_nhan_friend';
import { ChatPageTinhTrangXem } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_tinh_trang_xem';
import { ChatPageTinNhan } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_tin_nhan';
import { FileUpload } from 'src/app/models/firebase/file-upload/file_upload';
import { finalize } from 'rxjs/operators';
import { MyNameService } from '../../../my-name/my-name.service';
import { ObjectChatContent } from 'src/app/models/firebase/chat-page/chat-page-chat-page/content/object_chat_content';
import { ObjectDangNhap } from 'src/app/models/firebase/chat-page/chat-page-chat-page/content/object_dang_nhap';

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

  // service
  public layAllBanBe: Subscription;
  public layLoaiCuocTroChuyen: Subscription;
  public layThongTinNhom: Subscription;
  public layThanhVien: Subscription;
  public layThongTinTaiKhoan: Subscription;
  public layTinNhan: Subscription;
  public layNhungOngDangNhap: Subscription;
  public layLanCuoiOnline: Subscription;

  constructor
    (
      private db: AngularFireDatabase,
      // pipi html
      public sanitized: DomSanitizer,

      private storage: AngularFireStorage,

      public my_name_service: MyNameService,
      
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
          ten = this.object_chat.thanh_vien[i].ten_da_duoc_xu_ly;
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
      // ông nào rời nhóm rồi cũng xóa
      let currentTime = Number(new Date());
      let count = 0;
      while (count < array.length) {
        if (currentTime - array[count].lan_cuoi_dang_nhap > 2000 || this.object_chat.checkRoiChua(array[count].ma_tai_khoan)) {
          array.splice(count, 1);
        } else {
          array[count].getNoiDung();
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
              this.db.database.ref('cai_dat').child(this.object_chat.thanh_vien[j].ma_tai_khoan).on('value', set => {
                if(set.val().trang_thai_hoat_dong == 'tat')
                  isOnline = false;
                else {
                  if (this.object_chat.cuoc_tro_truyen.loai_cuoc_tro_truyen == 'nhom') {
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
              })
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

  public sumitTinNhan(ma_cuoc_tro_chuyen: string, tin_nhan: string, loai: string, ten: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let currentTime = Number(new Date());
    // Tin nhắn
    this.db.list("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).push(
      {
        dia_chi_file: "",
        link_file: "",
        loai_tin_nhan: loai,
        ["ma_tai_khoan"]: ma_tai_khoan,
        ten: ten,
        ma_tin_nhan_phan_hoi: "",
        ngay_gui: currentTime,
        noi_dung: tin_nhan,
      }
    ).then((ref) => {
      // Lấy all thành viên
      let array: Object[] = [];
      array.push({ ma_tai_khoan: ma_tai_khoan, ngay_nhan: 0, ngay_xem: currentTime, xem_chua: "roi", ten: ten });
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        array.push({ ma_tai_khoan: this.object_chat.thanh_vien[i].ma_tai_khoan, ngay_nhan: 0, ngay_xem: 0, xem_chua: "chua", ten: this.object_chat.thanh_vien[i].ten });
      }
      for (let i = 0; i < array.length; i++) {
        this.db.object("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen + "/" + ref.key + "/tinh_trang_xem/" + array[i]['ma_tai_khoan']).update(
          {
            ngay_nhan: array[i]['ngay_nhan'],
            ngay_xem: array[i]['ngay_xem'],
            xem_chua: array[i]['xem_chua'],
            ten: array[i]['ten'],
          }
        )
      };
    });
  }

  public sumitTinNhanThongBaoTaoNhom(ma_cuoc_tro_chuyen: string, tin_nhan: string, loai: string, ten: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let currentTime = Number(new Date());
    // Tin nhắn
    this.db.list("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).push(
      {
        dia_chi_file: "",
        link_file: "",
        loai_tin_nhan: loai,
        ["ma_tai_khoan"]: ma_tai_khoan,
        ten: ten,
        ma_tin_nhan_phan_hoi: "",
        ngay_gui: currentTime,
        noi_dung: tin_nhan,
      }
    ).then((ref) => {
      // Lấy all thành viên
      let array: Object[] = [];
      array.push({ ma_tai_khoan: ma_tai_khoan, ngay_nhan: 0, ngay_xem: currentTime, xem_chua: "roi", ten: ten });
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        array.push({ ma_tai_khoan: this.object_chat.thanh_vien[i].ma_tai_khoan, ngay_nhan: 0, ngay_xem: 0, xem_chua: "chua", ten: this.object_chat.thanh_vien[i].ten });
      }
      for (let i = 0; i < array.length; i++) {
        this.db.object("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen + "/" + ref.key + "/tinh_trang_xem/" + array[i]['ma_tai_khoan']).update(
          {
            ngay_nhan: array[i]['ngay_nhan'],
            ngay_xem: array[i]['ngay_xem'],
            xem_chua: array[i]['xem_chua'],
            ten: array[i]['ten'],
          }
        )
      };
    });
  }

  public sumitTinNhanBTCX(ma_cuoc_tro_chuyen: string, tin_nhan: string, loai: string, ten: string, alt: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let currentTime = Number(new Date());
    // Tin nhắn
    this.db.list("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).push(
      {
        dia_chi_file: "",
        link_file: "",
        loai_tin_nhan: loai,
        ["ma_tai_khoan"]: ma_tai_khoan,
        ten: ten,
        ma_tin_nhan_phan_hoi: "",
        ngay_gui: currentTime,
        noi_dung: tin_nhan,
        alt: alt,
      }
    ).then((ref) => {
      // Lấy all thành viên
      let array: Object[] = [];
      array.push({ ma_tai_khoan: ma_tai_khoan, ngay_nhan: 0, ngay_xem: currentTime, xem_chua: "roi", ten: ten });
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        array.push({ ma_tai_khoan: this.object_chat.thanh_vien[i].ma_tai_khoan, ngay_nhan: 0, ngay_xem: 0, xem_chua: "chua", ten: this.object_chat.thanh_vien[i].ten });
      }
      for (let i = 0; i < array.length; i++) {
        this.db.object("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen + "/" + ref.key + "/tinh_trang_xem/" + array[i]['ma_tai_khoan']).update(
          {
            ngay_nhan: array[i]['ngay_nhan'],
            ngay_xem: array[i]['ngay_xem'],
            xem_chua: array[i]['xem_chua'],
            ten: array[i]['ten'],
          }
        )
      };
    });
  }


  public getBanBe() {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/ban_be/" + ma_tai_khoan).snapshotChanges();
  }

  public layBanBe(object: Object) {
    let ban_bes: string[] = [];
    if (object != null) {
      Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
        if (data_thanh_vien['ton_tai'] == 0) {
          ban_bes.push(ma_thanh_vien);
        }
      });
    }
    this.ban_bes = ban_bes;
  }

  public dienThongTinCoBan(object: Object): void {
    if (object != null) {
      this.object_chat.cuoc_tro_truyen.loai_cuoc_tro_truyen = object['loai_cuoc_tro_truyen'];
      this.object_chat.cuoc_tro_truyen.mau = object['mau'];
      this.object_chat.cuoc_tro_truyen.mau_tren = object['mau_tren'];
      this.object_chat.cuoc_tro_truyen.mau_duoi = object['duoi'];
      this.object_chat.cuoc_tro_truyen.bieu_tuong_cam_xuc = object['bieu_tuong_cam_xuc'];
      if (this.object_chat.cuoc_tro_truyen.mau == '#3275f7') {
        this.object_chat.cuoc_tro_truyen.mau = 'linear-gradient(0deg,#3275f7, #3275f7)';
        this.object_chat.cuoc_tro_truyen.mau_tren = "#3275f7";
        this.object_chat.cuoc_tro_truyen.mau_duoi = "#3275f7";
      }
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
    if (object != null) {
      Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
        let objectChatThanhVien = new ChatPageObjectTinNhanFriend();
        objectChatThanhVien.ma_tai_khoan = ma_thanh_vien;
        objectChatThanhVien.ngay_tham_gia = data_thanh_vien['ngay_tham_gia'];
        objectChatThanhVien.trang_thai = data_thanh_vien['trang_thai'];
        objectChatThanhVien.roi_chua = data_thanh_vien['roi_chua'];
        objectChatThanhVien.ngay_roi_di = data_thanh_vien['ngay_roi_di'];
        array.push(objectChatThanhVien);
      });
    }
    this.object_chat.thanh_vien = array;
    // Có được thành viên kiểm tra rời chưa
    this.object_chat.getIsRoiChua();
  }

  public getDataThanhVien() {
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public dienThongTinThanhVien(object: Object) {
    Object.entries(object).forEach(([ma_thanh_vien, data_thanh_vien]) => {
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        if (this.object_chat.thanh_vien[i].ma_tai_khoan == ma_thanh_vien) {
          this.object_chat.thanh_vien[i].link_hinh_dai_dien = data_thanh_vien['link_hinh'];
          this.object_chat.thanh_vien[i].ten = data_thanh_vien['ten'];
          // Có tên rồi thì getName cho chính bản thân nó
          this.object_chat.thanh_vien[i].getName();
          // Có tên rồi thì lấy status connect để đổ ra cho đỡ lag
          this.object_chat.getCreateFriends(this.ban_bes);
        }
      }
    });
    // Điền thông tin thành viên xong thì get img để đổ ra cho bớt lag
    this.object_chat.getImgAvatars();
  }

  public dienLanCUoiOnline(object: Object) {
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

  public getLanCuoiOnline() {
    return this.db.object("/lan_cuoi_dang_nhap").snapshotChanges();
  }

  public getTinNhan(id: string) {
    return this.db.object("/chi_tiet_cuoc_tro_chuyen/" + id).snapshotChanges();
  }

  public dienTinNhan(value: object, maCuocTroChuyen:string) {
    let tin_nhans: ChatPageTinNhan[] = [];
    if (value != null) {
      Object.entries(value).forEach(([ma_tin_nhan, data_tin_nhan]) => {
        let tin_nhan = new ChatPageTinNhan();
        tin_nhan.ma_tin_nhan = ma_tin_nhan;
        tin_nhan.dia_chi_file = data_tin_nhan['dia_chi_file'];
        tin_nhan.link_file = data_tin_nhan['link_file'];
        tin_nhan.loai_tin_nhan = data_tin_nhan['loai_tin_nhan'];
        tin_nhan.ma_tai_khoan = data_tin_nhan['ma_tai_khoan'];
        tin_nhan.ma_tin_nhan_phan_hoi = data_tin_nhan['ma_tin_nhan_phan_hoi'];
        tin_nhan.ngay_gui = data_tin_nhan['ngay_gui'];
        tin_nhan.ngay_thu_hoi = data_tin_nhan['ngay_thu_hoi'];
        tin_nhan.noi_dung = data_tin_nhan['noi_dung'];
        tin_nhan.ten = data_tin_nhan['ten'];
        if(tin_nhan.loai_tin_nhan == 'gui_hinh') {
          tin_nhan.danh_sach_url_anh = []
          this.accessluu_fileFireStorage(maCuocTroChuyen,tin_nhan.noi_dung).listAll().then((result)=>{
              result.items.forEach(element => {
                element.getDownloadURL().then((url)=> {
                  tin_nhan.danh_sach_url_anh.push(url)
                })
              });
            })
        }
        // Tình trạng xem
        let tinhTrangXem: object = data_tin_nhan['tinh_trang_xem'];
        let tinh_trang_xems: ChatPageTinhTrangXem[] = [];
        if (tinhTrangXem != null) {
          Object.entries(tinhTrangXem).forEach(([ma_tai_khoan, data]) => {
            let o = new ChatPageTinhTrangXem();
            o.ma_tai_khoan = ma_tai_khoan;
            o.ngay_xem = data['ngay_xem'];
            o.xem_chua = data['xem_chua'];
            o.ngay_nhan = data['ngay_nhan'];
            o.ten = data['ten'];
            o.is_roi_chua = this.taiKhoanTinhTrangXemRoiChua(o.ma_tai_khoan);
            o.getNoiDung();
            tinh_trang_xems.push(o);
          });
          tin_nhan.tinh_trang_xem = tinh_trang_xems;
          // Oke h làm một số chuyện trc cho đỡ lag
          // Nếu là loại thông báo thì get Noi dung thong bao
          if (tin_nhan.loai_tin_nhan == 'thong_bao') {
            tin_nhan.getNoiDungThongBao();
          }
          // Kiểm tra có phải là bản thân ko
          tin_nhan.getIsBanThan();
          // Lấy thời gian của tin nhắn
          tin_nhan.getTime();
          // Lấy tình trạng đã gửi
          tin_nhan.getIsDaGui();
          // Lấy tình trạng đã chuyển
          tin_nhan.getIsDaChuyen();
          // Lấy tình trạng có người xem
          tin_nhan.getIsCoNguoiXem();
          // Lấy tên đã được sử lý
          tin_nhan.getTen();
          // Lấy nội dung html
          tin_nhan.getNoiDungHTMLTinNhan(this.sanitized);
          // Emoji
          let cam_xuc_tin_nhan: object = data_tin_nhan['cam_xuc_tin_nhan'];
          let camXucs: CamXucTinNhan[] = [];
          if (cam_xuc_tin_nhan != null) {
            Object.entries(cam_xuc_tin_nhan).forEach(([k, v]) => {
              let cx = new CamXucTinNhan();
              cx.ma_tai_khoan = k;
              cx.ten = v['ten'];
              cx.loai_cam_xuc = v['loai'];
              cx.url = v['url'];
              camXucs.push(cx);
            });
            tin_nhan.cam_xuc_tin_nhan = camXucs;
            // is exits dscx
            tin_nhan.getIsExitsDSCX();
            // tooltip p
            tin_nhan.getToolTipP();
            // exits all
            tin_nhan.getIsExitsCX();
          }
          // add      
          tin_nhans.push(tin_nhan);
        }
      });
    }
    // Xem ông nào đang bật biểu tưởng cảm xúc thì bật ổng dậy
    // Rồi gán lại tin nhắn mới
    this.handleOpenSelectEmojiAndUpdate(tin_nhans);
    // Lọc lại tin nhắn lấy những tin nhắn trước thời gian ta đã rời đi
    if (this.object_chat.is_roi_chua) {
      this.fillter();
    }
    // Có được list tin nhắn hoàn thiện ta tính số người đã xem được ở từng tin nhắn
    for (let i = 0; i < this.object_chat.cuoc_tro_truyen.tin_nhan.length; i++) {
      this.object_chat.cuoc_tro_truyen.tin_nhan[i].getSoNguoiXemDangOViTriTinNhanNay(i, this.object_chat.cuoc_tro_truyen.tin_nhan);
    }
    // Sau đó tạo các tin nhắn thời gian kèm cặp vào cách nhau 15p
    this.addTimeSpace();
    // Tính margin và border
    this.handleBorderAndMargin();
  }

  public handleOpenSelectEmojiAndUpdate(tin_nhans: ChatPageTinNhan[]) {
    let mtks: string = null;
    if (this.object_chat.cuoc_tro_truyen.tin_nhan != null && this.object_chat.cuoc_tro_truyen.tin_nhan.length > 0) {
      for (let i = 0; i < this.object_chat.cuoc_tro_truyen.tin_nhan.length; i++) {
        if (this.object_chat.cuoc_tro_truyen.tin_nhan[i].is_show_select_emoji) {
          mtks = this.object_chat.cuoc_tro_truyen.tin_nhan[i].ma_tin_nhan;
          break;
        }
      }
    }
    if (mtks != null) {
      for (let i = 0; i < tin_nhans.length; i++) {
        if (tin_nhans[i].ma_tin_nhan == mtks) {
          tin_nhans[i].is_show_select_emoji = true;
          break;
        }
      }
    }
    this.object_chat.cuoc_tro_truyen.tin_nhan = tin_nhans;
  }

  public taiKhoanTinhTrangXemRoiChua(mtk: string): boolean {
    for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
      if (this.object_chat.thanh_vien[i].ma_tai_khoan == mtk) {
        if (this.object_chat.thanh_vien[i].roi_chua == 'roi') {
          return true;
        }
      }
    }
    return false;
  }

  public fillter() {
    let i = this.object_chat.cuoc_tro_truyen.tin_nhan.length - 1;
    let timeRoiDi = this.object_chat.time_roi_di;
    while (i > -1) {
      if (this.object_chat.cuoc_tro_truyen.tin_nhan[i].ngay_gui > timeRoiDi) {
        this.object_chat.cuoc_tro_truyen.tin_nhan.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }

  public handleBorderAndMargin() {
    let count = 0;
    for (let i = 0; i < this.object_chat.cuoc_tro_truyen.tin_nhan.length; i++) {
      // Tính xem nó có border top va bottom ko
      // Thằng đầu tiên có border top
      if (count == 0) {
        this.object_chat.cuoc_tro_truyen.tin_nhan[i].isHaveBorderTop = true;
      } else {
        this.object_chat.cuoc_tro_truyen.tin_nhan[i].getIsHaveBorderTop(this.object_chat.cuoc_tro_truyen.tin_nhan[count - 1]);
      }
      // Kiểm tra borderbottom
      if (count > 0) {
        this.object_chat.cuoc_tro_truyen.tin_nhan[count - 1].getIsHaveBorderBottom(this.object_chat.cuoc_tro_truyen.tin_nhan[i]);
      }
      // Tính margin top cho tin nhắn
      // Thằng đàu tiên luôn margin top 0px
      if (count == 0) {
        this.object_chat.cuoc_tro_truyen.tin_nhan[i].marginTop = "0px";
      } else {
        this.object_chat.cuoc_tro_truyen.tin_nhan[i].getMarginTopTinNhan(this.object_chat.cuoc_tro_truyen.tin_nhan[count - 1]);
      }
      count++;
    }
    // Thằng cuối cùng sẽ có border bottom
    if (count > 0) {
      this.object_chat.cuoc_tro_truyen.tin_nhan[count - 1].isHaveBorderBottom = true;
    }
  }

  public addTimeSpace() {
    let i = 0;
    // Thời gian hiện tại
    let nowTime = 0;
    while (i < this.object_chat.cuoc_tro_truyen.tin_nhan.length) {
      let time = this.object_chat.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
      // > 15 minutes?
      if (time - nowTime > 15 * 60000) {
        let object = new ChatPageTinNhan();
        object.noi_dung = this.getTimeSpaceString(time);
        object.loai_tin_nhan = 'thoi_gian';
        nowTime = time;
        this.object_chat.cuoc_tro_truyen.tin_nhan.splice(i, 0, object);
        i += 2;
      } else {
        i++;
      }
    }
  }

  public getTimeSpaceString(time: number) {
    let date = new Date(time);
    let year = date.getFullYear();
    let thang = date.getMonth() + 1;
    let ngay = date.getDate();
    let gio = date.getHours();
    let phut = date.getMinutes();
    return `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}, ${ngay.toString().length > 1 ? ngay : "0" + ngay} Tháng ${thang.toString().length > 1 ? thang : "0" + thang}, ${year}`;
  }


  // lưu image vào lưu_file trong storage firebase
  public saveImageluu_fileInStorage(image: FileUpload, idConversation: string, keyImage:string) {
    let filePath: string = '/luu_file/' + idConversation + "/" + keyImage + '/';
    let newKey = Number(new Date());
    let ref = this.storage.ref(filePath+newKey+image.file.name).put(image.file);
    return ref;
  }

  // save file vao storage firebase
  public saveFileluu_fileStorage(file: FileUpload, idConversation: string, newKey:string, typeFile:string) {
    let filePath: string = '/luu_file/' + idConversation + "/";
    let ref = this.storage.ref(filePath+newKey+file.file.name).put(file.file);
    let check100Percent = false;
    ref.percentageChanges().subscribe((percent) => {
      if (percent == 100) {
        ref.snapshotChanges().pipe(finalize(() => {
          this.storage.ref(filePath+newKey+file.file.name).getDownloadURL().subscribe((downloadURL) => {
            if(!check100Percent) {
              this.submitMessageFile(idConversation, downloadURL, typeFile,this.my_name_service.myName,file.name)
              check100Percent = true;
            }
          })
        })).subscribe();
      }
    })
  }
  // lưu link image vao danh sach file trong db
  public submitMessageFile(ma_cuoc_tro_chuyen: string, tin_nhan: string, loai: string, ten: string, tenFile:string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let currentTime = Number(new Date());
    // Tin nhắn
    this.db.list("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen).push(
      {
        dia_chi_file: "",
        // xet link file la ten file
        link_file: tenFile,
        loai_tin_nhan: loai,
        ["ma_tai_khoan"]: ma_tai_khoan,
        ten: ten,
        ma_tin_nhan_phan_hoi: "",
        ngay_gui: currentTime,
        noi_dung: tin_nhan,
      }
    ).then((ref) => {
      // Lấy all thành viên
      let array: Object[] = [];
      array.push({ ma_tai_khoan: ma_tai_khoan, ngay_nhan: 0, ngay_xem: currentTime, xem_chua: "roi", ten: ten });
      for (let i = 0; i < this.object_chat.thanh_vien.length; i++) {
        array.push({ ma_tai_khoan: this.object_chat.thanh_vien[i].ma_tai_khoan, ngay_nhan: 0, ngay_xem: 0, xem_chua: "chua", ten: this.object_chat.thanh_vien[i].ten });
      }
      for (let i = 0; i < array.length; i++) {
        this.db.object("/chi_tiet_cuoc_tro_chuyen/" + ma_cuoc_tro_chuyen + "/" + ref.key + "/tinh_trang_xem/" + array[i]['ma_tai_khoan']).update(
          {
            ngay_nhan: array[i]['ngay_nhan'],
            ngay_xem: array[i]['ngay_xem'],
            xem_chua: array[i]['xem_chua'],
            ten: array[i]['ten'],
          }
        )
      };
      // lưu vào danh sách file đã gửi, không lưu file ghi âm
      if(loai != 'gui_ghi_am') {
        this.db.database.ref('file_da_gui').child(ma_cuoc_tro_chuyen).child(ref.key).set({
          ma_tai_khoan: ma_tai_khoan,
          ten_file: tenFile,
          url: tin_nhan,
          loai_tin_nhan: loai,
          ngay_gui: currentTime,
          ton_tai: 0
        })
      }
    });
  }
// truy cập vào ảnh trong firestorage
  public accessluu_fileFireStorage(idCoversation:string, idImage: string){
    return this.storage.storage.ref('/luu_file/' + idCoversation + '/' + idImage +'/');
  }
  public openSelectEmoji(tin_nhan: ChatPageTinNhan) {
    if (tin_nhan.is_show_select_emoji) {
      tin_nhan.is_show_select_emoji = false;
    } else {
      for (let i = 0; i < this.object_chat.cuoc_tro_truyen.tin_nhan.length; i++) {
        this.object_chat.cuoc_tro_truyen.tin_nhan[i].is_show_select_emoji = false;
      }
      tin_nhan.is_show_select_emoji = true;
    }
  }

  public selectEmoji(cx: EmojiMessenger, item: ChatPageTinNhan, mtctc: string) {
    item.is_show_select_emoji = false;
    // get data
    let url = cx.img;
    let loai = cx.ten;
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    let ten = this.my_name_service.myName;
    // is exits
    let isExits = false;
    if (item.is_exits_dscx) {
      for (let i = 0; i < item.cam_xuc_tin_nhan.length; i++) {
        if (item.cam_xuc_tin_nhan[i].ma_tai_khoan == ma_tai_khoan && item.cam_xuc_tin_nhan[i].loai_cam_xuc == loai) {
          isExits = true;
          break;
        }
      }
    } else {
      isExits = false;
    }
    if (!isExits) {
      // add to firebase
      this.db.object("/chi_tiet_cuoc_tro_chuyen/" + mtctc + "/" + item.ma_tin_nhan + "/cam_xuc_tin_nhan/" + ma_tai_khoan).update({
        ten: ten,
        url: url,
        loai: loai,
      });
    } else {
      //remove
      this.db.object("/chi_tiet_cuoc_tro_chuyen/" + mtctc + "/" + item.ma_tin_nhan + "/cam_xuc_tin_nhan/" + ma_tai_khoan).remove();
    }
  }


}

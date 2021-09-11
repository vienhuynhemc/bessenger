import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { ChatPageCuocTroChuyen } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen';
import { ChatPageFriendsObjectLeft } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_friends_object_left';
import { ChatPageObjectTinNhanFriend } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_object_tin_nhan_friend';
import { ChatPageTinhTrangXem } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_tinh_trang_xem';
import { ChatPageTinNhan } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_tin_nhan';
import { ChatPageProcessServiceService } from '../chat-page-process-service.service';
import { LeftScrollService } from './left-scroll.service';

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
  public search: string;

  // Service
  public layAllCuocTroChuyen: Subscription;
  public layAllCuocTroChuyenNhom: Subscription;
  public layThanhVienCuocTroChuyenLeft: Subscription;
  public layAllChiTietCuocTroChuyen: Subscription;
  public layThongTinThanhVien: Subscription;
  public layLanCuoiDangNhap: Subscription;

  // index
  public indexNotSearch: number = -1;

  // Length hiện đang được đổ ra
  public nowLengthShow: number;

  // Bộ 3 index next pre select
  public indexNext: number;
  public indexPre: number;
  public indexSelect: number;
  public isLoadFirst: boolean;

  constructor(
    private db: AngularFireDatabase,
    private main_page_process_service: ChatPageProcessServiceService,
    // scroll
    private left_srcoll_service: LeftScrollService
  ) {
    this.search = "";
    // Hàm update lại ban_bes 5s 1 lần
    this.update();
  }

  public getLanCuoiDangNhap() {
    return this.db.object("/lan_cuoi_dang_nhap").snapshotChanges();
  }

  public changeSearch(event) {
    // Cập nhật lại length hiện đang được show ra
    let count = 0;
    if (this.allBoxData != null) {
      for (let i = 0; i < this.allBoxData.length; i++) {
        if (this.compareSearch(i)) {
          count++;
        }
      }
    }
    this.nowLengthShow = count;
    // Cập nhật lại bộ 3 kia
    this.updateBo3Index();
  }

  public updateBo3Index() {
    this.getIndexSeleced();
    this.getIndexPre();
    this.getIndexNext();
  }

  public dienLanCuoiDangNhap(object: Object) {
    if (this.allBoxData != null) {
      Object.entries(object).forEach(([key2, value2]) => {
        for (let i = 0; i < this.allBoxData.length; i++) {
          for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
            if (this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan == key2) {
              this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap = value2['lan_cuoi_dang_nhap'];
            }
          }
        }
      });
      for (let i = 0; i < this.allBoxData.length; i++) {
        for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
          if (this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap == null) {
            this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap = 0;
          }
        }
      }
    }
  }

  public compareSearch(i: number): boolean {
    if (this.allBoxData != null && this.allBoxData.length > 0) {
      if (this.allBoxData[i] != null) {
        if (this.allBoxData[i].name != null) {
          if (this.allBoxData[i].name.noi_dung_goc != null) {
            if (this.allBoxData[i].name.noi_dung_goc.trim().toLowerCase().includes(this.search.trim().toLowerCase())) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  public update(): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    setTimeout(() => {
      // Kiểm tra online
      let currentTime = Number(new Date());
      if (this.allBoxData != null) {
        for (let i = 0; i < this.allBoxData.length; i++) {
          let isOnline = false;
          for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
            if (this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan != ma_tai_khoan) {
              this.db.database.ref('cai_dat').child(this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan).on('value', set => {
                if(set.val().trang_thai_hoat_dong == 'bat') {
                  if (this.allBoxData[i].cuoc_tro_truyen.loai_cuoc_tro_truyen == 'nhom') {
                    if (this.allBoxData[i].thong_tin_thanh_vien[j].roi_chua == 'chua') {
                      let last_time = this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap;
                      let overTime = currentTime - last_time;
                      if (overTime < 10000) {
                        isOnline = true;
                      }
                    }
                  } else {
                    let last_time = this.allBoxData[i].thong_tin_thanh_vien[j].lan_cuoi_dang_nhap;
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
          this.allBoxData[i].trang_thai_online = isOnline;
        }
      }
      this.update();
    }, 5000);
  }

  // Get index đang được chọn
  public getIndexSeleced() {
    let index = -1;
    if (this.allBoxData != null) {
      let select = -1;
      for (let i = 0; i < this.allBoxData.length; i++) {
        if (this.allBoxData[i].box_chat_dang_duoc_chon) {
          select = i;
          break;
        }
      }
      if (!this.compareSearch(select)) {
        index = -1;
      } else {
        let count = 0;
        for (let i = 0; i <= select; i++) {
          if (!this.compareSearch(i)) {
            count++;
          }
        }
        index = select - count;
      }
    }
    this.indexSelect = index;
  }

  public getIndexPre() {
    let index = -1;
    if (this.allBoxData != null) {
      let select = -1;
      for (let i = 0; i < this.allBoxData.length; i++) {
        if (this.allBoxData[i].box_chat_dang_duoc_chon) {
          select = i;
          break;
        }
      }
      let count = -1;
      for (let i = select - 1; i > -1; i--) {
        if (this.compareSearch(i)) {
          count = i;
          break;
        }
      }
      index = count;
    }
    this.indexPre = index;
  }


  public getIndexNext() {
    let index = -1;
    if (this.allBoxData != null) {
      let select = -1;
      for (let i = 0; i < this.allBoxData.length; i++) {
        if (this.allBoxData[i].box_chat_dang_duoc_chon) {
          select = i;
          break;
        }
      }
      let count = -1;
      for (let i = select + 1; i < this.allBoxData.length; i++) {
        if (this.compareSearch(i)) {
          count = i;
          break;
        }
      }
      index = count;
    }
    this.indexNext = index;
  }

  public updateSelected() {
    // Select
    let isOke = false;
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen == this.now_ma_cuoc_tro_chuyen) {
        this.allBoxData[i].box_chat_dang_duoc_chon = true;
        // Cập nhật index not search
        this.indexNotSearch = i;
        isOke = true;
      } else {
        this.allBoxData[i].box_chat_dang_duoc_chon = false;
      }
    }
    if (!isOke) {
      this.indexNotSearch = -1;
    }
    // update to left srcoll
    this.left_srcoll_service.indexNotSearch = this.indexNotSearch;
    this.updateScroll();
    // update bộ 3 index
    this.updateBo3Index();
  }

  public updateScroll() {
    let danh_sach_ban_ben_duoi = document.getElementById("danh_sach_ban_be_ben_duoi");
    if (danh_sach_ban_ben_duoi != null) {
      if (this.indexNotSearch != -1) {
        if (this.indexNotSearch < 3) {
          danh_sach_ban_ben_duoi.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          danh_sach_ban_ben_duoi.scrollTo({ top: (this.indexNotSearch - 2) * 76, behavior: "smooth" });
        }
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

  public da_nhan() {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan != null) {
        let currentTime = Number(new Date());
        for (let j = 0; j < this.allBoxData[i].cuoc_tro_truyen.tin_nhan.length; j++) {
          if (this.isNhanChua(this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem)) {
            let url = "/chi_tiet_cuoc_tro_chuyen/" + this.allBoxData[i].cuoc_tro_truyen.ma_cuoc_tro_chuyen + "/" + this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ma_tin_nhan + "/tinh_trang_xem/" + ma_tai_khoan;
            this.db.database.ref(url).update({ xem_chua: "dang", ngay_nhan: currentTime });
          }
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

  public isNhanChua(array: ChatPageTinhTrangXem[]): boolean {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    for (let i = 0; i < array.length; i++) {
      if (array[i].ma_tai_khoan == ma_tai_khoan) {
        if (array[i].xem_chua == "roi" || array[i].xem_chua == "dang") {
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

  public dienAllTinNhan(object: Object) {
    if (object != null) {
      Object.entries(object).forEach(([key, value]) => {
        this.dienTinNhan(key, value);
      });
    }
    // ông nào ko có tin nhắn -> những cuộc trò chuyện đơn
    // Ta sẽ getIsReaded
    for (let i = 0; i < this.allBoxData.length; i++) {
      if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan == null) {
        this.allBoxData[i].getIsReaded();
      }
    }
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
          tin_nhan.ten = data_tin_nhan['ten'];
          tin_nhan.ma_tin_nhan_phan_hoi = data_tin_nhan['ma_tin_nhan_phan_hoi'];
          tin_nhan.ngay_gui = data_tin_nhan['ngay_gui'];
          tin_nhan.noi_dung = data_tin_nhan['noi_dung'];
          tin_nhan.alt = data_tin_nhan['alt'];
          let tinhTrangXem: object = data_tin_nhan['tinh_trang_xem'];
          let tinh_trang_xems: ChatPageTinhTrangXem[] = [];
          if (tinhTrangXem != null) {
            Object.entries(tinhTrangXem).forEach(([ma_tai_khoan, data]) => {
              let o = new ChatPageTinhTrangXem();
              o.ma_tai_khoan = ma_tai_khoan;
              o.ngay_xem = data['ngay_xem'];
              o.xem_chua = data['xem_chua'];
              o.ngay_nhan = data['ngay_nhan'];
              o.is_roi_chua = this.taiKhoanTinhTrangXemRoiChua(o.ma_tai_khoan, i);
              tinh_trang_xems.push(o);
            });
            tin_nhan.tinh_trang_xem = tinh_trang_xems;
            tin_nhans.push(tin_nhan);
          }
        });
        this.allBoxData[i].cuoc_tro_truyen.tin_nhan = tin_nhans;
        // Điền tin nhắn cho boxData[i] thì lấy luôn nội dung của nó để đổ ra view cho đỡ lag
        // Lấy vị trí bản thân
        this.allBoxData[i].getViTriBanThan();
        // Lấy vị trí tin nhắn cuối cùng
        this.allBoxData[i].getIndexTinNhanCuoiCung();
        // Lấy nội dung tin nhắn cuối cùng
        this.allBoxData[i].getNoiDungCuoiCung();
        // Tin nhắn cuối cùng được đọc chưa
        this.allBoxData[i].getIsReaded();
    
        // Kiểm tra thử vị trí cuối cùng có phải là của bản thân hay không
        this.allBoxData[i].isMe();
        // Kiểm tra xem ông nào nhậ nchuwa
        this.allBoxData[i].getIsDaNhan();
        // Kiểm tra bản thân rời khỏi cuộc trò chuyện chưa
        this.allBoxData[i].getIsRoiChua();

        return;
      }
    }
  }

  public taiKhoanTinhTrangXemRoiChua(mtk: string, index: number): boolean {
    for (let i = 0; i < this.allBoxData[index].thong_tin_thanh_vien.length; i++) {
      if (this.allBoxData[index].thong_tin_thanh_vien[i].ma_tai_khoan == mtk) {
        if (this.allBoxData[index].thong_tin_thanh_vien[i].roi_chua == 'roi') {
          return true;
        }
      }
    }
    return false;
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
    if (this.allBoxData != null) {
      for (let i = 0; i < this.allBoxData.length; i++) {
        // Điền dữ liệu tài khoản cho thành viên
        for (let j = 0; j < this.allBoxData[i].thong_tin_thanh_vien.length; j++) {
          if (this.allBoxData[i].thong_tin_thanh_vien[j].ma_tai_khoan == key) {
            this.allBoxData[i].thong_tin_thanh_vien[j].ten = value['ten'];
            this.allBoxData[i].thong_tin_thanh_vien[j].link_hinh_dai_dien = value['link_hinh'];
            // khi thông tin thành viên có link hình thì cập nhật lại img avatar ở cuộc trò chuyện để đổ 
            // ra view ko bị lag
            // img 
            this.allBoxData[i].getImgAvatar();
            // Tên - tên nhóm - hoặc người nếu là đơn
            this.allBoxData[i].getName();
            break;
          }
        }
        // Điền duẽ liệu tài khoản cho cuoc_tro_chuyen
        if (this.allBoxData[i].cuoc_tro_truyen.ma_tai_khoan_chu_so_huu == key) {
          this.allBoxData[i].cuoc_tro_truyen.ten_nguoi_so_huu = value['ten'];
        }
        // Điền dữ liệu tài khoản cho tin nhắn
        if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan != null) {
          for (let j = 0; j < this.allBoxData[i].cuoc_tro_truyen.tin_nhan.length; j++) {
            // Tình trạng xem
            for (let k = 0; k < this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem.length; k++) {
              if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].ma_tai_khoan == key) {
                this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].ten = value['ten'];
                this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].tinh_trang_xem[k].hinh = value['link_hinh'];
              }
            }
            // Tin nhắn
            if (this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ma_tai_khoan == key) {
              this.allBoxData[i].cuoc_tro_truyen.tin_nhan[j].ten = value['ten'];
            }
          }
          // Điền hết tình trạgn xem của tin nhắn thì get imgseened
          this.allBoxData[i].getImgUserSeened();
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
        // oke khi có bản thân và bản thân phải ko chờ
        let isOke = false;
        Object.entries(value).forEach(([key2, value2]) => {
          let chat_page_object_tin_nhan_friend = new ChatPageObjectTinNhanFriend();
          chat_page_object_tin_nhan_friend.ma_tai_khoan = key2;
          chat_page_object_tin_nhan_friend.ngay_tham_gia = value2['ngay_tham_gia'];
          chat_page_object_tin_nhan_friend.ngay_roi_di = value2['ngay_roi_di'];
          chat_page_object_tin_nhan_friend.roi_chua = value2['roi_chua'];
          thong_tin_thanh_vien.push(chat_page_object_tin_nhan_friend);
          if (!isOke) {
            if (key2 == ma_tai_khoan) {
              if (value2['trang_thai'] == 'khong_cho') {
                isOke = true;
              }
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
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public getAllChiTietCuocTroChuyen() {
    return this.db.object("/chi_tiet_cuoc_tro_chuyen").snapshotChanges();
  }

  public getAllCuocTroChuyen() {
    return this.db.object("/cuoc_tro_chuyen").snapshotChanges();
  }

  public getAllCuocTroChuyenNhom() {
    return this.db.object("/thong_tin_tro_chuyen_nhom").snapshotChanges();
  }

  public dienThongTinNhom(ma_nhom: string, value: object) {
    for (let i = 0; i < this.allCuocTroTruyen.length; i++) {
      if (this.allCuocTroTruyen[i].loai_cuoc_tro_truyen == 'nhom') {
        if (this.allCuocTroTruyen[i].ma_cuoc_tro_chuyen == ma_nhom && value['ton_tai'] == 0) {
          this.allCuocTroTruyen[i].ten_nhom = value['ten_nhom'];
          this.allCuocTroTruyen[i].ngay_tao = value['ngay_tao'];
          this.allCuocTroTruyen[i].ma_tai_khoan_chu_so_huu = value['chu_so_huu'];
          this.allCuocTroTruyen[i].ton_tai = value['ton_tai'];
          break;
        }
      }
    }
  }

  public getThanhVienCuocTroTruyen() {
    return this.db.object("/thanh_vien_cuoc_tro_chuyen").snapshotChanges();
  }

}

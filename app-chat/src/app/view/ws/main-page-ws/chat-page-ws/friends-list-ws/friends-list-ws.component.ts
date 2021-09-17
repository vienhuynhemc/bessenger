import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPageCuocTroChuyenWS } from 'src/app/models/ws/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen_ws';
import { ChatPageFriendsObjectLeftWS } from 'src/app/models/ws/chat-page/chat-page-friends-page/chat_page_friends_object_left_ws';
import { ChatPageCreateGroupWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/chat-page-create-group-ws.service';
import { ChatPageFriendsLeftServiceWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/chat-page-friends-left-service-ws.service';
import { ChatPageFriendsServiceWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/chat-page-friends-service-ws.service';
import { LeftScrollWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/left-scroll-ws.service';
import { ChatPageProcessServiceWsService } from 'src/app/service/ws/chat-page/chat-page-process-service-ws.service';
import { SettingServiceWsService } from 'src/app/service/ws/settings/setting-service-ws.service';

@Component({
  selector: 'app-friends-list-ws',
  templateUrl: './friends-list-ws.component.html',
  styleUrls: ['./friends-list-ws.component.scss']
})
export class FriendsListWsComponent implements OnInit {

  constructor
    (
      private router: Router,
      private route: ActivatedRoute,
      public chat_page_friends_service: ChatPageFriendsServiceWsService,
      private main_page_process_service: ChatPageProcessServiceWsService,
      public chat_page_friend_left_service: ChatPageFriendsLeftServiceWsService,
      public chat_page_create_ground: ChatPageCreateGroupWsService,
      // Scroll ban đầu
      public left_scroll: LeftScrollWsService,
      private settingsService: SettingServiceWsService
    ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen = id;
      if (id != 'danh-sach') {
        if (this.chat_page_friend_left_service.allBoxData != null) {
          if (this.chat_page_friend_left_service.checkUrl(id)) {
            this.chat_page_friend_left_service.seen(id);
          } else {
            this.router.navigate(["/**"]);
          }
        }
      }
      if (this.chat_page_friend_left_service.allBoxData != null) {
        this.chat_page_friend_left_service.updateSelected();
      }
      this.chat_page_friends_service.getSettings();
    });
    // Lấy thông tin
    // Data websocket
    this.chat_page_friend_left_service.actionWs();
    // Nếu như service của trang chưa được chạy lần nào
    // => đó là lần chạy đầu tiên ta phải lấy dữ liêu đầu tiên
    if (this.chat_page_friends_service.ban_bes == null) {
      this.getDataOnline();
    }
    if (this.chat_page_friend_left_service.allBoxData == null) {
      this.getDataLeft();
    }
    // Đăng ký resize để nó tự động scroll xuống thằng đang chọn ngay lúc ban đầu
    // Đừng lo khi nào giao diện thay đổi mới chạy hàm của thằng này
    this.left_scroll.register(document.getElementById("danh-sach-box-chat"))
  }


  // GET data online
  public getDataOnline(): void {
    // lấy danh sách ma_tai_khoan bạn bè của tài khoản này
    if (this.chat_page_friends_service.layListBanbe == null) {
      this.getListFriendDataOnline();
    } else {
      this.chat_page_friends_service.layListBanbe.unsubscribe();
      this.getListFriendDataOnline();
    }
  }

  public getLanCuoiDangNhap() {
    this.chat_page_friends_service.layLanCuoiDangNhap = this.chat_page_friends_service.getLanCuoiDangNhap().subscribe(data => {
      this.chat_page_friends_service.dienLanCuoiDangNhap(data.payload.toJSON());
    })
  }

  public getListFriendDataOnline() {
    this.chat_page_friends_service.layListBanbe = this.chat_page_friends_service.getListFriend().subscribe(data => {
      this.chat_page_friends_service.dienBanBeOnline(data.payload.toJSON());
      // Một khi điền bạn bè thì sẽ có list bạn bè mới , ta cập nhật lại list online dựa trên list bạn bè mới này
      if (this.chat_page_friends_service.layLanCuoiDangNhap == null) {
        this.getLanCuoiDangNhap();
      } else {
        this.chat_page_friends_service.layLanCuoiDangNhap.unsubscribe();
        this.getLanCuoiDangNhap();
      }
      // 2. đã có list ma_tai_khoan bạn bè, h sẽ lấy mã các cuộc trò chuyện mà là cuộc trò chuyện đơn ra
      if (this.chat_page_friends_service.layTroChuyenDon == null) {
        this.getTroChuyenDonDataOnline();
      } else {
        this.chat_page_friends_service.layTroChuyenDon.unsubscribe();
        this.getTroChuyenDonDataOnline();
      }
    });
  }
  public getTroChuyenDonDataOnline() {
    this.chat_page_friends_service.layTroChuyenDon = this.chat_page_friends_service.getCuocTroChuyenDon().subscribe(data => {
      this.chat_page_friends_service.dienTroChuyenDonOnline(data.payload.toJSON());
      // 3. Có được list ma_cac_cuoc_tro_chuyen đơn, giờ ta check thành viên của chúng xem thử có 2 người này không ?
      // Có thì thêm ma_cuoc_tro_chuyen_vao_ban_be_không thì tạo mới cuộc trò chuyện
      if (this.chat_page_friends_service.layThanhVienCuocTroChuyen == null) {
        this.getThanhVienCuoCTroChuyenDataOnline();
      } else {
        this.chat_page_friends_service.layThanhVienCuocTroChuyen.unsubscribe();
        this.getThanhVienCuoCTroChuyenDataOnline();
      }
    });
  }
  public getThanhVienCuoCTroChuyenDataOnline() {
    this.chat_page_friends_service.layThanhVienCuocTroChuyen = this.chat_page_friends_service.getThanhVienCuocTroChuyenDon().subscribe(data => {
      this.chat_page_friends_service.dienThanhVienCuocTroChuyenOnline(data.payload.toJSON());
      // Sau khi fill các mã trò truyện xong nếu bạn bè nào chưa có mã cuộc trò truyện thì ta tạo cho nó
      this.chat_page_friends_service.createNhungBanBeChuaCoCuocTroChuyen();
      // Oke rồi ta update tên và hình đại diện cho bạn bè[]
      if (this.chat_page_friends_service.layThongTinThanhVien == null) {
        this.layThongTinThanhVienOnline();
      } else {
        this.chat_page_friends_service.layThongTinThanhVien.unsubscribe();
        this.layThongTinThanhVienOnline();
      }
    });
  }
  public layThongTinThanhVienOnline() {
    this.chat_page_friends_service.layThongTinThanhVien = this.chat_page_friends_service.getTaiKhoan().subscribe(data => {
      let object = data.payload.toJSON();
      Object.entries(object).forEach(([key, value]) => {
        this.chat_page_friends_service.getHinhDaiDienVaLanCuoiDangNhapChoChatPageBanBe(key, value);
      });
      setTimeout(() => {
        this.main_page_process_service.setLoading(false);
      }, 0);
    });
  }
  //////////////////

  // Data left ////////////
  public getDataLeft(): void {
    // lấy all ma_cuoc_tro_chuyen luon
    if (this.chat_page_friend_left_service.layAllCuocTroChuyen == null) {
      this.getAllCuocTroChuyenLeft();
    } else {
      this.chat_page_friend_left_service.layAllCuocTroChuyen.unsubscribe();
      this.getAllCuocTroChuyenLeft();
    }
  }
  public getAllCuocTroChuyenLeft() {
    // first
    this.chat_page_friend_left_service.isLoadFirst = false;
    this.chat_page_friend_left_service.layAllCuocTroChuyen = this.chat_page_friend_left_service.getAllCuocTroChuyen().subscribe(data => {
      let object = data.payload.toJSON();
      let allCuocTroTruyen: ChatPageCuocTroChuyenWS[] = [];
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          let chatPageCuocTroChuyen = new ChatPageCuocTroChuyenWS();
          chatPageCuocTroChuyen.ma_cuoc_tro_chuyen = key;
          chatPageCuocTroChuyen.loai_cuoc_tro_truyen = value['loai_cuoc_tro_truyen'];
          allCuocTroTruyen.push(chatPageCuocTroChuyen);
        });
      }
      this.chat_page_friend_left_service.allCuocTroTruyen = allCuocTroTruyen;
      // Có được danh sách các cuộc trò truyện
      // Ta hãy fill tên và ngày tạo cho các nhóm có loai là nhóm
      if (this.chat_page_friend_left_service.layAllCuocTroChuyenNhom == null) {
        this.getAllCuocTroChuyenNhom();
      } else {
        this.chat_page_friend_left_service.layAllCuocTroChuyenNhom.unsubscribe();
        this.getAllCuocTroChuyenNhom();
      }
    });
  }
  public getAllCuocTroChuyenNhom() {
    this.chat_page_friend_left_service.layAllCuocTroChuyenNhom = this.chat_page_friend_left_service.getAllCuocTroChuyenNhom().subscribe(data => {
      let object = data.payload.toJSON();
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          this.chat_page_friend_left_service.dienThongTinNhom(key, value);
        });
      }
      // Fill xong thông tin nhóm giờ điền thành viên cho nó :v
      // Những ông nào có chứa bản thân thì mới lấy
      if (this.chat_page_friend_left_service.layThanhVienCuocTroChuyenLeft == null) {
        this.getThanhVienCuocTroChuyenLeft();
      } else {
        this.chat_page_friend_left_service.layThanhVienCuocTroChuyenLeft.unsubscribe();
        this.getThanhVienCuocTroChuyenLeft();
      }
    });
  }
  public getLanCuoiDangNhapDataLeft() {
    this.chat_page_friend_left_service.layLanCuoiDangNhap = this.chat_page_friend_left_service.getLanCuoiDangNhap().subscribe(data => {
      this.chat_page_friend_left_service.dienLanCuoiDangNhap(data.payload.toJSON());
    })
  }
  public getThanhVienCuocTroChuyenLeft() {
    this.chat_page_friend_left_service.layThanhVienCuocTroChuyenLeft = this.chat_page_friend_left_service.getThanhVienCuocTroTruyen().subscribe(data => {
      let object = data.payload.toJSON();
      let allBoxData: ChatPageFriendsObjectLeftWS[] = [];
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          let boxData = this.chat_page_friend_left_service.getBoxData(key, value);
          if (boxData != null) {
            allBoxData.push(boxData);
          }
        });
      }
      this.chat_page_friend_left_service.allBoxData = allBoxData;
      // Cậpt nhật now length show là = length của cái này luôn
      this.chat_page_friend_left_service.nowLengthShow = this.chat_page_friend_left_service.allBoxData.length;
      // sau khi có hết thành viên cuộc trò chuyện thì ta lấy lần cuối đăng nhập của nó ra
      if (this.chat_page_friend_left_service.layLanCuoiDangNhap == null) {
        this.getLanCuoiDangNhapDataLeft();
      } else {
        this.chat_page_friend_left_service.layLanCuoiDangNhap.unsubscribe();
        this.getLanCuoiDangNhapDataLeft();
      }
      // Oke h hết tin nhắn của từng cuộc nói chuyện ra
      if (this.chat_page_friend_left_service.layAllChiTietCuocTroChuyen == null) {
        this.getAllChiTietCuocTroChuyenLeft();
      } else {
        this.chat_page_friend_left_service.layAllChiTietCuocTroChuyen.unsubscribe();
        this.getAllChiTietCuocTroChuyenLeft();
      }
    });
  }
  public getAllChiTietCuocTroChuyenLeft() {
    this.chat_page_friend_left_service.layAllChiTietCuocTroChuyen = this.chat_page_friend_left_service.getAllChiTietCuocTroChuyen().subscribe(data => {
      this.chat_page_friend_left_service.dienAllTinNhan(data.payload.toJSON());
      // sort lại theo ngày gửi của tin nhắn cuối cùng
      this.chat_page_friend_left_service.sort();
      // sort xong thì update select
      this.chat_page_friend_left_service.updateSelected();
      // seen
      if (this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen != 'danh-sach') {
        if (this.chat_page_friend_left_service.checkUrl(this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen)) {
          this.chat_page_friend_left_service.seen(this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen);
        } else {
          this.router.navigate(["/**"]);
        }
      }
      // Sau khi có thông tin của tất cả các cuộc nói chuyện thì ta xem thử cái nào ta chưa nhận -> nhận
      this.chat_page_friend_left_service.da_nhan();
      // Oke h điền hình và tên cho các thành viên của allboxdata
      if (this.chat_page_friend_left_service.layThongTinThanhVien == null) {
        this.getThongTinThanhVien();
      } else {
        this.chat_page_friend_left_service.layThongTinThanhVien.unsubscribe();
        this.getThongTinThanhVien();
      }
    });
  }
  public getThongTinThanhVien() {
    this.chat_page_friend_left_service.layThongTinThanhVien = this.chat_page_friend_left_service.getAllTaiKhoan().subscribe(data => {
      let object = data.payload.toJSON();
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          this.chat_page_friend_left_service.dienTenVaHinhChoTaiKhoanTrongBoxData(key, value);
        });
      }
      // Tải lần đầu
      if (!this.chat_page_friend_left_service.isLoadFirst) {
        this.chat_page_friend_left_service.updateBo3Index();
        this.chat_page_friend_left_service.isLoadFirst = true;
      }
      setTimeout(() => {
        this.main_page_process_service.setLoading(false);
      }, 0);
    });
  }
  /////////////////////////////////////

  onSelected(ma_cuoc_tro_chuyen: string): void {
    if (this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen != ma_cuoc_tro_chuyen) {
      this.router.navigate(['/bessenger-ws/tin-nhan/' + ma_cuoc_tro_chuyen]);
    }
  }

  // chọn 1 đứa chat trong danh sách online
  public selectChat(ma_cuoc_tro_chuyen: string): void {
    if (this.chat_page_friend_left_service.now_ma_cuoc_tro_chuyen != ma_cuoc_tro_chuyen) {
      this.router.navigate(['/bessenger-ws/tin-nhan/' + ma_cuoc_tro_chuyen]);
    }
  }

  public createNewGroup() {
    setTimeout(() => {
      this.chat_page_create_ground.isshow = true;
    }, 0);
  }

  //  Shadow top
  getStyleShadowTop(): any {
    return {
      'height': this.chat_page_friend_left_service.indexSelect * 76 + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': '0px',
      'left': '0px',
      'border-bottom-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }

  //  Shadow bottom
  getStyleShadowBottom(): any {
    let pounds = 0;
    if (this.chat_page_friend_left_service.nowLengthShow < 7) {
      pounds = ((7 - this.chat_page_friend_left_service.nowLengthShow) * 75 - (2 + this.chat_page_friend_left_service.nowLengthShow));
    }
    return {
      'height': ((this.chat_page_friend_left_service.nowLengthShow - this.chat_page_friend_left_service.indexSelect - 1) * 76) + pounds + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': (this.chat_page_friend_left_service.indexSelect + 1) * 76 + 'px',
      'left': '0px',
      'border-top-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }
  // set style tên cho tin nhắn chưa đọc
  getStyleNameReadMessage() {
    return {
      'font-weight': 'bold',
      'color': 'black',
      'font-size': '15px'
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStyleMessageReadMessage() {
    return {
      'font-weight': 'bold',
      'color': '#3275f7',
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStylePointReadMessage() {
    return {
      'position': 'absolute',
      'width': '10px',
      'height': '10px',
      'border-radius': '50%',
      'background-color': '#3275f7',
      'right': '9px',
      'top': '46.5px',
    }
  }
  getStyleFillAll() {
    return {
      'width': '281px',
      'background': 'white',
      'z-index': '10',
      'position': 'relative',
      'border-bottom': '#e5f1fc solid 0.1px',
      'height': ((7 - this.chat_page_friend_left_service.nowLengthShow) * 75 - (2 + this.chat_page_friend_left_service.nowLengthShow)) + 'px',
    }
  }

  changeStateStatus() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.settingsService.accessSettings(idUser).update({
      trang_thai_hoat_dong: 'bat'
    })
  }
}

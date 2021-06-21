import { ChatPageProcessServiceService } from './../../../../service/chat-page/chat-page-process-service.service';
import { ChatPageBanBe } from './../../../../models/chat-page/chat-page-friends-page/chat_page_ban_be';
import { ChatPageFriendsServiceService } from './../../../../service/chat-page/chat-page-friends-page/chat-page-friends-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPageFriendsLeftServiceService } from 'src/app/service/chat-page/chat-page-friends-page/chat-page-friends-left-service.service';
import { ChatPageCuocTroChuyen } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_cuoc_tro_chuyen';
import { ChatPageFriendsObjectLeft } from 'src/app/models/chat-page/chat-page-friends-page/chat_page_friends_object_left';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {

  selectedUser: number = -1;

  constructor
    (
      private router: Router,
      private route: ActivatedRoute,
      public chat_page_friends_service: ChatPageFriendsServiceService,
      private main_page_process_service: ChatPageProcessServiceService,
      public chat_page_friend_left_service: ChatPageFriendsLeftServiceService
    ) { }

  ngOnInit(): void {
    // Lấy thông tin
    // Nếu như service của trang chưa được chạy lần nào
    // => đó là lần chạy đầu tiên ta phải lấy dữ liêu đầu tiên
    if (this.chat_page_friends_service.ban_bes == null) {
      this.getDataOnline();
    }
    if (this.chat_page_friend_left_service.allBoxData == null) {
      this.getDataLeft();
    }
  }

  public getDataOnline(): void {
    // lấy danh sách ma_tai_khoan bạn bè của tài khoản này
    this.chat_page_friends_service.getListFriend().subscribe(data => {
      let object = data.payload.toJSON();
      let banBes: ChatPageBanBe[] = [];
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          if (value['ton_tai'] == "0") {
            let cpbb: ChatPageBanBe = new ChatPageBanBe();
            cpbb.ma_tai_khoan = key;
            banBes.push(cpbb);
          }
        });
      }
      this.chat_page_friends_service.ban_bes = banBes;
      setTimeout(() => {
        this.main_page_process_service.setLoading(false);
      }, 0);
      // 2. đã có list ma_tai_khoan bạn bè, h sẽ lấy mã các cuộc trò chuyện mà là cuộc trò chuyện đơn ra
      this.chat_page_friends_service.getCuocTroChuyenDon().subscribe(data => {
        let object = data.payload.toJSON();
        let cuocTroChuyenDons: string[] = [];
        if (object != null) {
          Object.entries(object).forEach(([key, value]) => {
            if (value['loai_cuoc_tro_truyen'] == 'don') {
              cuocTroChuyenDons.push(key);
            };
          });
        }
        this.chat_page_friends_service.maCuocTroChuyenDons = cuocTroChuyenDons;
        setTimeout(() => {
          this.main_page_process_service.setLoading(false);
        }, 0);
        // 3. Có được list ma_cac_cuoc_tro_chuyen đơn, giờ ta check thành viên của chúng xem thử có 2 người này không ?
        // Có thì thêm ma_cuoc_tro_chuyen_vao_ban_be_không thì tạo mới cuộc trò chuyện
        this.chat_page_friends_service.getThanhVienCuocTroChuyenDon().subscribe(data => {
          let object = data.payload.toJSON();
          if (object != null) {
            Object.entries(object).forEach(([key, value]) => {
              // Duyện đúng mã trò truyện đơn thì check thử nó có chứa 2 tài khoản không
              if (this.chat_page_friends_service.checkContain(key)) {
                this.chat_page_friends_service.handleThanhVienCuocTroChuyenDon(value, key);
              }
            });
          }
          // Sau khi fill các mã trò truyện xong nếu bạn bè nào chưa có mã cuộc trò truyện thì ta tạo cho nó
          this.chat_page_friends_service.createNhungBanBeChuaCoCuocTroChuyen();
          // Oke rồi ta update tên và hình đại diện cho bạn bè[]
          this.chat_page_friends_service.getTaiKhoan().subscribe(data => {
            let object = data.payload.toJSON();
            Object.entries(object).forEach(([key, value]) => {
              this.chat_page_friends_service.getHinhDaiDienVaLanCuoiDangNhapChoChatPageBanBe(key, value);
            });
            setTimeout(() => {
              this.main_page_process_service.setLoading(false);
            }, 0);
          });
        });
      });
    });
  }

  public getDataLeft(): void {
    // lấy all ma_cuoc_tro_chuyen luon
    this.chat_page_friend_left_service.getAllCuocTroChuyen().subscribe(data => {
      let object = data.payload.toJSON();
      let allCuocTroTruyen: ChatPageCuocTroChuyen[] = [];
      if (object != null) {
        Object.entries(object).forEach(([key, value]) => {
          let chatPageCuocTroChuyen = new ChatPageCuocTroChuyen();
          chatPageCuocTroChuyen.ma_cuoc_tro_chuyen = key;
          chatPageCuocTroChuyen.loai_cuoc_tro_truyen = value['loai_cuoc_tro_truyen'];
          allCuocTroTruyen.push(chatPageCuocTroChuyen);
        });
      }
      this.chat_page_friend_left_service.allCuocTroTruyen = allCuocTroTruyen;
      // Có được danh sách các cuộc trò truyện
      // Ta hãy fill tên và ngày tạo cho các nhóm có loai là nhóm
      this.chat_page_friend_left_service.getAllCuocTroChuyenNhom().subscribe(data => {
        let object = data.payload.toJSON();
        if (object != null) {
          Object.entries(object).forEach(([key, value]) => {
            this.chat_page_friend_left_service.dienThongTinNhom(key, value);
          });
        }
        // Fill xong thông tin nhóm giờ điền thành viên cho nó :v
        // Những ông nào có chứa bản thân thì mới lấy
        this.chat_page_friend_left_service.getThanhVienCuocTroTruyen().subscribe(data => {
          let object = data.payload.toJSON();
          let allBoxData: ChatPageFriendsObjectLeft[] = [];
          if (object != null) {
            Object.entries(object).forEach(([key, value]) => {
              let boxData = this.chat_page_friend_left_service.getBoxData(key, value);
              if (boxData != null) {
                allBoxData.push(boxData);
              }
            });
          }
          this.chat_page_friend_left_service.allBoxData = allBoxData;
          // Oke h lấy tin nhắn cuối cùng của từng cuộc nói chuyện ra
          this.chat_page_friend_left_service.getAllChiTietCuocTroChuyen().subscribe(data => {
            let object = data.payload.toJSON();
            if (object != null) {
              Object.entries(object).forEach(([key, value]) => {
                this.chat_page_friend_left_service.dienTinNhanCuoiCung(key, value);
              });
            }
            // Oke h điền hình và tên cho các thành viên của allboxdata
            this.chat_page_friend_left_service.getAllTaiKhoan().subscribe(data => {
              let object = data.payload.toJSON();
              if (object != null) {
                Object.entries(object).forEach(([key, value]) => {
                  this.chat_page_friend_left_service.dienTenVaHinhChoTaiKhoanTrongBoxData(key, value);
                });
              }
              setTimeout(() => {
                this.main_page_process_service.setLoading(false);
              }, 0);
            });
          });
        });
      });
    });
  }

  // set trường hợp load lần đầu 
  onSelectedFilter(index: number) {
    if (index != this.selectedUser) {
      this.onSelected(index);
    }
  }

  // chọn vào bạn bè thì tô màu background
  onSelected(index: number): void {
    // Cập nhập dữ liêu tại cha
    this.setSelectedUser(index);
  }

  // chọn 1 đứa chat trong danh sách online
  public selectChat(ma_cuoc_tro_chuyen: string): void {
    // Lấy id thằng hiện tại
    let id = this.route.snapshot.params['id'];
    if (id != ma_cuoc_tro_chuyen) {
      this.router.navigate(['/bessenger/tin-nhan/' + ma_cuoc_tro_chuyen]);
    }
  }

  // Set index selected user
  setSelectedUser(index: any) {
    this.selectedUser = index;
  }
  //  Shadow top
  getStyleShadowTop(): any {
    return {
      'height': this.selectedUser * 76 + 'px',
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
    if(this.chat_page_friend_left_service.getLength()<7){
      pounds = ((7 - this.chat_page_friend_left_service.getLength()) * 75 - (2 + this.chat_page_friend_left_service.getLength()));
    }
    return {
      'height': ((this.chat_page_friend_left_service.getLength() - this.selectedUser - 1) * 76) + pounds + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': (this.selectedUser + 1) * 76 + 'px',
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
      'height': ((7 - this.chat_page_friend_left_service.getLength()) * 75 - (2 + this.chat_page_friend_left_service.getLength())) + 'px',
    }
  }
}

import { ChatPageProcessServiceService } from './../../../../service/chat-page/chat-page-process-service.service';
import { ChatPageBanBe } from './../../../../models/chat-page/chat-page-friends-page/chat_page_ban_be';
import { ChatPageFriendsServiceService } from './../../../../service/chat-page/chat-page-friends-page/chat-page-friends-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {
  prev: number = -1;
  next: number = -1;
  countPrev: number = 0;
  countNext: number = 0;
  slideStep = 4;
  start: number = 0;
  end: number = 0;
  // @input idFriendsList truyền vào từ component cha lúc đăng nhập
  idFriendsList: number;
  // truyền vào list friends chat gần đây bản DB
  friends_list_main: any;
  // @input idUser sau này truyền từ component vào để xử lý
  idUser: number;
  // danh sách id box chat
  groupIDList: any;
  // id group dc chọn
  // bản mẫu demo code cứng



  public friends_list: any[] = [{
    id: '1',
    link: 'assets/images/list-friends-chat-page/avt1.jpg',
    name: 'Karlyn Carabello',
    timer: '08:50',
    content: 'umbala alaba trap',
  },
  {
    id: '2',
    link: 'assets/images/list-friends-chat-page/avt2.jpg',
    name: 'Junior Sabine',
    timer: '08:45',
    content: 'yasuo penta kill nè',
  },
  {
    id: '3',
    link: 'assets/images/list-friends-chat-page/avt3.jpg',
    name: 'Melinie Sherk',
    timer: '08:40',
    content: 'đang bị hàng chờ 5 phút',
  },
  {
    id: '4',
    link: 'assets/images/list-friends-chat-page/avt4.jpg',
    name: 'Harrison Palmatier',
    timer: '08:30',
    content: 'troll or afk',
  },
  {
    id: '5',
    link: 'assets/images/list-friends-chat-page/avt5.jpg',
    name: 'Tressa Duhart',
    timer: '08:20',
    content: 'whatsup bro!',
  },
  {
    id: '6',
    link: 'assets/images/list-friends-chat-page/avt6.jpg',
    name: 'Erick Spiva',
    timer: '08:10',
    content: 'tao ký ngực fan 2k3 2 em',
  },
  {
    id: '7',
    link: 'assets/images/list-friends-chat-page/avt7.png',
    name: 'Josefina Simpson',
    timer: '08:00',
    content: 'kẹp 3 2 em ấy đi ăn bún ...',
  },
  {
    id: '8',
    link: 'assets/images/list-friends-chat-page/avt8.jpg',
    name: 'Yasuo Can 5',
    timer: '07:55',
    content: 'umbala alaba trap',
  }
    ,
  {
    id: '9',
    link: 'assets/images/list-friends-chat-page/avt9.jpg',
    name: 'Kaisa Pentakill',
    timer: '07:50',
    content: 'umbala alaba trap',
  }]

  selectedUser: number = -1;
  startOnline: number = 0;
  endOnline: number = 7;
  // danh sách id box chat

  iDGroup: number = 0;

  constructor
    (
      private router: Router,
      private route: ActivatedRoute,
      public chat_page_friends_service: ChatPageFriendsServiceService,
      private main_page_process_service: ChatPageProcessServiceService
    ) { }

  ngOnInit(): void {
    // Lấy thông tin
    // Nếu như service của trang chưa được chạy lần nào
    // => đó là lần chạy đầu tiên ta phải lấy dữ liêu đầu tiên
    if (this.chat_page_friends_service.ban_bes == null) {
      this.getData();
    }
  }

  public getData(): void {
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

  // set trường hợp load lần đầu 
  onSelectedFilter(index: number) {
    if (index != this.selectedUser) {
      this.onSelected(index);
    }
  }

  // chọn vào bạn bè thì tô màu background
  onSelected(index: number): void {
    if ((index - 1) >= 0 && (index + 1) < this.friends_list.length) {
      this.prev = index - 1;
      this.next = index + 1;
    } else if ((index - 1) >= 0) {
      this.prev = index - 1;
      this.next = -1;
    } else if ((index + 1) < this.friends_list.length) {
      this.prev = -1;
      this.next = index + 1;
    }
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
    return {
      'height': (this.friends_list.length - this.selectedUser - 1) * 76 + 'px',
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
}

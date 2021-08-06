import { MyNameService } from './../../service/my-name/my-name.service';
import { ChatPageFriendsServiceService } from './../../service/chat-page/chat-page-friends-page/chat-page-friends-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPageFriendsLeftServiceService } from 'src/app/service/chat-page/chat-page-friends-page/chat-page-friends-left-service.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { LoginService } from './../../service/login/login.service';
import { MainPageService } from './../../service/main-page/main-page.service';
import { SettingsServiceService } from 'src/app/service/settings/settings-service.service';
import { NotificationService } from 'src/app/service/notification-settings/notification.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login_service: LoginService,
    public main_page_service: MainPageService,
    public friendsPageService: FriendsPageService,
    private chat_page_friends_object_left_service: ChatPageFriendsLeftServiceService,
    private chat_page_firends_service: ChatPageFriendsServiceService,
    public my_name_service:MyNameService,
    private settings_service: SettingsServiceService,
    private notificationMessageService: NotificationService
  ) {
  }

  ngOnInit(): void {
    if (!this.login_service.isLogin()) {
      this.router.navigate(['/dang-nhap']);
    } else {
      this.notificationMessage()
      if (this.main_page_service.layHinh == null) {
        this.getData();
      } else {
        this.main_page_service.layHinh.unsubscribe();
        this.getData();
      }
      if(this.my_name_service.layTen == null){
        this.my_name_service.getName().subscribe(data=>{
          this.my_name_service.myName = data.payload.toJSON()['ten'];
        })
      }else{
        this.my_name_service.layTen.unsubscribe();
        this.my_name_service.getName().subscribe(data=>{
          this.my_name_service.myName = data.payload.toJSON()['ten'];
        });
      }
    }
  }

  public getData() {
    this.main_page_service.layHinh = this.main_page_service.getImg().subscribe(data => {
      this.main_page_service.setImg(data.payload.toJSON());
    });
  }

  // Đăng xuất
  logOut(): void {
    this.login_service.logOut();
    this.main_page_service.reset();
    this.chat_page_friends_object_left_service.allBoxData = null;
    this.chat_page_firends_service.ban_bes = null;
    this.router.navigate(['/dang-nhap']);
  }
  
  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToHomePage(): void {
    this.router.navigate(['trang-chu'], { relativeTo: this.route });
  }
  moveToPersonalPage(): void {
    this.router.navigate(['thong-tin-ca-nhan'], { relativeTo: this.route });
  }
  moveToFriendsPage(): void {
    this.router.navigate(['ban-be'], { relativeTo: this.route });
    // trạng thái mặc định của friends page khi chọn nó
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
  }
  moveToChatPage(): void {
    this.router.navigate(['tin-nhan/danh-sach'], { relativeTo: this.route });
  }
  moveToChatRequestPage(): void {
    this.router.navigate(['tin-nhan-an'], { relativeTo: this.route });
  }
  moveToSettingPage(): void {
    this.router.navigate(['cai-dat'], { relativeTo: this.route });
    this.settings_service.selectedStateSettings()
  }
  //////////////////////////////////////////

  // thông báo
  notificationMessage() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.notificationMessageService.accessSettings(idUser).on('value', set => {
      if(set.val().khong_lam_phien == 'tat') {
        // truy cập lấy ra tất cả mã cuộc trò chuyện
        this.notificationMessageService.access_cuoc_tro_chuyen().on('value', conver => {
          // danh sách chat
            let listIDConver = []
            conver.forEach(elementConver => {
                  listIDConver.push(elementConver.key)
            });
            // vào thanh viên cuộc trò chuyện để lấy ra danh sách các cuộc trò chuyện bản thân có tham gia
                this.notificationMessageService.access_thanh_vien_cuoc_tro_chuyen().on('value', member =>{ 
                  let listIDConverUserJoin= []
                  listIDConver.forEach(keySingle => {
                   member.child(keySingle).forEach(elementMember => {
                    //  nếu là chat đơn
                    if(elementMember.val().roi_chua == undefined) {
                        if(elementMember.key == idUser && elementMember.val().trang_thai == 'khong_cho') 
                            listIDConverUserJoin.push(keySingle)
                    // nếu là nhóm chat
                    } else { 
                        if(elementMember.key == idUser && elementMember.val().trang_thai == 'khong_cho' && elementMember.val().roi_chua == 'chua') 
                            listIDConverUserJoin.push(keySingle)
                          }
                      });
                   });
                   
                    // tránh lặp nhiều lần
                  let checkLoop = '' 
                    //  vào chi tiết cuộc trò chuyện lấy ra tin nhắn chưa xem
                   this.notificationMessageService.access_chi_tiet_cuoc_tro_chuyen().on('value', converMess => {
                      listIDConverUserJoin.forEach(elementJoin => {
                          let idCon = elementJoin
                          converMess.child(elementJoin).forEach(elementDetail => {
                            if(elementDetail.val().loai_tin_nhan != 'thu_hoi' && elementDetail.val().ma_tai_khoan != idUser ) {
                              elementDetail.child('tinh_trang_xem').forEach(watch => {
                                  if(watch.key == idUser && watch.val().xem_chua == 'chua' && checkLoop != elementDetail.key) {
                                    checkLoop = elementDetail.key
                                    let pathName = window.location.pathname;
                                    let splitPathName = pathName.split('/')
                                    if(Notification.permission === 'granted' && !splitPathName.includes('tin-nhan')) {
                                      const notification = new Notification(elementDetail.val().ten, {
                                        body: elementDetail.val().noi_dung,
                                        icon: 'assets/images/icon.ico'
                                      })
                                      notification.onclick = (e) => {
                                            this.router.navigate(['/bessenger/tin-nhan/' + idCon]);
                                      }
                                    } 
                                  }
                              });
                            }
                          });
                      });
                   })
                })
        })
      }
    })
    
  }

  showMessage() {
    // let result = '';
    // switch (type) {
    //   case "gui_text":
    //       result = content;
    //       break;
    //   case "gui_text_icon":
    //       result = ten + ": " + this.cuoc_tro_truyen.tin_nhan[this.viTriCuoiCung].noi_dung;
    //       break;
    //   case "thong_bao":
    //       result.noi_dung = ten + " " + this.cuoc_tro_truyen.tin_nhan[this.viTriCuoiCung].noi_dung;
    //       break;
    //   case "gui_tin_nhan_like":
    //       result.noi_dung = ten + ": 👍";
    //       break;
    //   case "gui_hinh":
    //       result.noi_dung = ten + " đã gửi hình ảnh";
    //       break;
    //   case "gui_video":
    //       result.noi_dung = ten + " gửi một video";
    //       break;
    //   case "gui_ghi_am":
    //       result.noi_dung = ten + " gửi một tin nhắn thoại";
    //       break;
    //   case "gui_file":
    //       result.noi_dung = ten + " gửi một tệp";
    //       break;
    //   case "thu_hoi":
    //       result.noi_dung = ten + " thu hồi một tin nhắn";
    //       break;
    //   case "phan_hoi":
    //       result.noi_dung = ten + " phản hồi một tin nhắn";
    //       break;
    //   case "gui_nhan_dan":
    //       result.noi_dung = ten + " gửi một nhãn dán"
    //       break;
    //   case "gui_giphy":
    //       result.noi_dung = ten + " gửi một file GIF từ GIPHY"
    //       break;
    //   case "gui_tin_nhan_btcx":
    //       result.noi_dung = ten + ": " + this.cuoc_tro_truyen.tin_nhan[this.viTriCuoiCung].alt;
    //       break;
  }
 
    
  }


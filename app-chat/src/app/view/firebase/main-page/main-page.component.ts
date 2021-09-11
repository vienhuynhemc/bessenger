import { VersionService } from './../../../service/version/version.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPageFriendsLeftServiceService } from 'src/app/service/firebase/chat-page/chat-page-friends-page/chat-page-friends-left-service.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';
import { NotificationService } from 'src/app/service/firebase/notification-settings/notification.service';
import { SettingNotification } from 'src/app/models/firebase/settings/settingNotification';
import { SingleOrGroupChat } from 'src/app/models/firebase/settings/SingleOrGroupChat';
import { ChatPageFriendsServiceService } from 'src/app/service/firebase/chat-page/chat-page-friends-page/chat-page-friends-service.service';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';
import { LoginService } from 'src/app/service/firebase/login/login.service';
import { MyNameService } from 'src/app/service/firebase/my-name/my-name.service';



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
    public my_name_service: MyNameService,
    private settings_service: SettingsServiceService,
    private notificationMessageService: NotificationService,
    public version_service: VersionService
  ) {
  }

  ngOnInit(): void {
    if (this.version_service.version == 2) {
      this.router.navigate(['/change-version']);
    }
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
      if (this.my_name_service.layTen == null) {
        this.my_name_service.getName().subscribe(data => {
          this.my_name_service.myName = data.payload.toJSON()['ten'];
        })
      } else {
        this.my_name_service.layTen.unsubscribe();
        this.my_name_service.getName().subscribe(data => {
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
    this.settings_service.selectedStateStatus();
  }
  //////////////////////////////////////////

  // thông báo
  notificationMessage() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // tránh lặp nhiều lần
    let checkLoop = ''
    this.notificationMessageService.accessSettings(idUser).once('value', set => {
      if (set.val().khong_lam_phien == 'tat') {
        // truy cập lấy ra tất cả mã cuộc trò chuyện
        this.notificationMessageService.access_cuoc_tro_chuyen().on('value', conver => {
          // danh sách chat
          let listIDConver = []
          conver.forEach(elementConver => {
            listIDConver.push(elementConver.key)
          });
          // vào thanh viên cuộc trò chuyện để lấy ra danh sách các cuộc trò chuyện bản thân có tham gia
          this.notificationMessageService.access_thanh_vien_cuoc_tro_chuyen().on('value', member => {
            let listIDConverUserJoin = []
            listIDConver.forEach(keySingle => {
              member.child(keySingle).forEach(elementMember => {
                //  nếu là chat đơn
                if (elementMember.val().roi_chua == undefined) {
                  if (elementMember.key == idUser && elementMember.val().trang_thai == 'khong_cho') {
                    let singleBox = new SingleOrGroupChat();
                    singleBox.idConver = keySingle;
                    singleBox.typeConver = 'don';
                    listIDConverUserJoin.push(singleBox)
                  }
                  // nếu là nhóm chat
                } else {
                  if (elementMember.key == idUser && elementMember.val().trang_thai == 'khong_cho' && elementMember.val().roi_chua == 'chua') {
                    let groupBox = new SingleOrGroupChat();
                    groupBox.idConver = keySingle;
                    groupBox.typeConver = 'nhom';
                    // lấy ra tên nhóm
                    this.notificationMessageService.access_thong_tin_tro_chuyen_nhom().child(keySingle).once('value', group => {
                      groupBox.nameGroup = group.val().ten_nhom
                    })
                    listIDConverUserJoin.push(groupBox)
                  }
                }
              });
            });

            //  vào chi tiết cuộc trò chuyện lấy ra tin nhắn chưa xem
            this.notificationMessageService.access_chi_tiet_cuoc_tro_chuyen().on('value', converMess => {
              listIDConverUserJoin.forEach(elementJoin => {
                let idCon = elementJoin.idConver
                converMess.child(elementJoin.idConver).forEach(elementDetail => {
                  // chỉ xét tin nhắn không phải thu hồi và không phải bản thân gửi
                  if (elementDetail.val().loai_tin_nhan != 'thu_hoi' && elementDetail.val().ma_tai_khoan != idUser) {
                    // lấy ra tin nhắn bản thân chưa xem
                    elementDetail.child('tinh_trang_xem').forEach(watch => {
                      if (watch.key == idUser && watch.val().xem_chua == 'chua' && checkLoop != elementDetail.key) {
                        checkLoop = elementDetail.key
                        if (Notification.permission === 'granted') {
                          // truy cập vào tài khoản để lấy ra ảnh đại diện
                          this.notificationMessageService.access_tai_khoan().child(elementDetail.val().ma_tai_khoan).once('value', acc => {
                            let mess = new SettingNotification();
                            mess.urlAvatar = acc.val().link_hinh;
                            mess.idConversation = idCon;
                            mess.content = elementDetail.val().noi_dung;
                            mess.typeMess = elementDetail.val().loai_tin_nhan;
                            mess.soundNoti = set.val().am_thanh_thong_bao;
                            mess.contentNoti = set.val().hien_thi_ban_xem_truoc;
                            if (elementJoin.typeConver == 'nhom')
                              mess.name = elementJoin.nameGroup;
                            else
                              mess.name = elementDetail.val().ten;
                            this.notificationMessageService.access_chi_tiet_cuoc_tro_chuyen().child(idCon).child(elementDetail.key).child('tinh_trang_xem').child(idUser).update({
                              ngay_nhan: Number(new Date()),
                              xem_chua: 'dang'
                            })
                            if (mess.typeMess == 'gui_tin_nhan_btcx')
                              mess.alt = elementDetail.val().alt;
                            this.showMessage(mess)
                          })

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

  // format thông báo tin nhắn mới và hiển thị
  showMessage(mess: SettingNotification) {
    let result = '';
    switch (mess.typeMess) {
      case "gui_text":
        result = mess.content;
        break;
      case "gui_text_icon":
        result = "Đã gửi icon";
        break;
      case "thong_bao":
        result = mess.content.charAt(0).toUpperCase() + mess.content.slice(1);
        break;
      case "gui_tin_nhan_like":
        result = "👍";
        break;
      case "gui_hinh":
        result = "Đã gửi hình ảnh";
        break;
      case "gui_video":
        result = "Gửi một video";
        break;
      case "gui_ghi_am":
        result = "Gửi một tin nhắn thoại";
        break;
      case "gui_file":
        result = "Gửi một tệp";
        break;
      case "phan_hoi":
        result = "Phản hồi một tin nhắn";
        break;
      case "gui_nhan_dan":
        result = "Gửi một nhãn dán"
        break;
      case "gui_giphy":
        result = "Gửi một file GIF từ GIPHY"
        break;
      case "gui_tin_nhan_btcx":
        result = mess.alt;
        break;

    }
    if (result != '') {
      // thay thế tất cả <br> = ' '
      result = result.replace(/<br>/g, ' ');
      const notification = new Notification(mess.name, {
        body: mess.contentNoti == 'bat' ? result : '',
        icon: mess.urlAvatar,
        silent: mess.soundNoti == 'bat' ? false : true
      })
      // if(window.location.pathname != '/bessenger/tin-nhan/' + mess.idConversation) {
      notification.onclick = (e) => {
        window.close()
        window.open(location.origin + '/bessenger/tin-nhan/' + mess.idConversation, '_blank');
        // }
      }
    }
  }
}

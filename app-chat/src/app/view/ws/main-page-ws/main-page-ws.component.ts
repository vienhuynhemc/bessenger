import { ChatDataWs } from 'src/app/models/ws/chat-page/chat-page-friends-page/chat_data_ws';
import { NotificationWsService } from './../../../service/ws/notification-settings/notification-ws.service';
import { SettingServiceWsService } from './../../../service/ws/settings/setting-service-ws.service';
import { FriendsPageWsService } from './../../../service/ws/friends-page/friends-page-ws.service';
import { LoginWsWsService } from './../../../service/ws/login/login-ws-ws.service';
import { MyNameWsService } from './../../../service/ws/my-name/my-name-ws.service';
import { LoginWsService } from './../../../service/ws/login/login-ws.service';
import { MainPageWsService } from './../../../service/ws/main-page/main-page-ws.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';
import { SettingNotification } from 'src/app/models/firebase/settings/settingNotification';
import { ChatPageFriendsLeftServiceWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/chat-page-friends-left-service-ws.service';
import { ChatPageFriendsServiceWsService } from 'src/app/service/ws/chat-page/chat-page-friends-page/chat-page-friends-service-ws.service';
import { SingleOrGroupChat } from 'src/app/models/firebase/settings/SingleOrGroupChat';

@Component({
  selector: 'app-main-page-ws',
  templateUrl: './main-page-ws.component.html',
  styleUrls: ['./main-page-ws.component.scss']
})
export class MainPageWsComponent implements OnInit {

  constructor(
    public version_service: VersionService,
    private route: ActivatedRoute,
    private router: Router,
    public main_page_service_ws: MainPageWsService,
    public login_service_ws: LoginWsService,
    public my_name_service_ws: MyNameWsService,
    public login_ws_ws: LoginWsWsService,
    public chat_page_friends_object_left_service_ws: ChatPageFriendsLeftServiceWsService,
    private chat_page_firends_service_ws: ChatPageFriendsServiceWsService,
    public friendsPageService_ws: FriendsPageWsService,
    public settings_service_ws: SettingServiceWsService,
    public notificationMessageService_ws: NotificationWsService
  ) {

  }

  ngOnInit(): void {
    if (this.version_service.version == 1) {
      this.router.navigate(['/change-version']);
    }
    if (!this.login_service_ws.isLogin()) {
      this.router.navigate(['/dang-nhap-ws']);
    } else {
      // Vì lần sau tự động lưu đăng nhập ko phải đăng nhập vào nên chỗ này phải login 1 lần nữa vào websocket
      // Đã login rồi login tiếp ko sao chứ ko login là có chuyện
      this.login_ws_ws.getPassword().subscribe(data => {
        let email = JSON.parse(localStorage.getItem("email_dn_ws"));
        this.login_ws_ws.login(email, data[0]['mat_khau']);
        this.login_ws_ws.messages_login.subscribe(data => {
          let value = JSON.parse(JSON.stringify(data));
          if (value.event == "LOGIN") {
            console.log("Đăng nhập từ OnInit: " + value.status + " " + value.mes);
          } else if (value.event == "GET_USER_LIST") {
            this.chat_page_friends_object_left_service_ws.subscribe_ws_user_list(value);
          } else if (value.event == "GET_ROOM_CHAT_MES") {
            this.chat_page_friends_object_left_service_ws.subscribe_ws_nhom(value);
          }else if(value.event == "GET_PEOPLE_CHAT_MES"){
            this.chat_page_friends_object_left_service_ws.subscribe_ws_don(value);
          }else if(value.event == "SEND_CHAT"){
            let object = new ChatDataWs();
            object.id = value.data.id;
            object.name = value.data.name;
            object.type = value.data.type;
            object.to = value.data.to;
            object.mes = value.data.mes;
            object.createAt = value.data.createAt;
            this.chat_page_friends_object_left_service_ws.actionWsNew(object);
            console.log("send chat");
          }
        })
      })
      this.notificationMessage()
      if (this.main_page_service_ws.layHinh == null) {
        this.getData();
      } else {
        this.main_page_service_ws.layHinh.unsubscribe();
        this.getData();
      }
      if (this.my_name_service_ws.layTen == null) {
        this.my_name_service_ws.getName().subscribe(data => {
          this.my_name_service_ws.myName = data.payload.toJSON()['ten'];
        })
      } else {
        this.my_name_service_ws.layTen.unsubscribe();
        this.my_name_service_ws.getName().subscribe(data => {
          this.my_name_service_ws.myName = data.payload.toJSON()['ten'];
        });
      }
    }
    // tự động join group
    this.main_page_service_ws.autoJoinGroup();


  }

  public getData() {
    this.main_page_service_ws.layHinh = this.main_page_service_ws.getImg().subscribe(data => {
      this.main_page_service_ws.setImg(data.payload.toJSON());
    });
  }

  // Đăng xuất
  logOut(): void {
    // logout storage
    this.login_service_ws.logOut();
    // logout websocket
    this.login_ws_ws.logout();
    this.main_page_service_ws.reset();
    this.chat_page_friends_object_left_service_ws.allBoxData = null;
    this.chat_page_firends_service_ws.ban_bes = null;
    this.router.navigate(['/dang-nhap-ws']);
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
    this.friendsPageService_ws.selectedFriendsPageDefaultSerivce();
  }
  moveToChatPage(): void {
    this.router.navigate(['tin-nhan/danh-sach'], { relativeTo: this.route });
    // sau khi login chạy hàm tự join group, khi nhấn vào tin nhắn thì chạy 1 lần nữa cho chắc
    this.main_page_service_ws.autoJoinGroup();
  }
  moveToChatRequestPage(): void {
    this.router.navigate(['tin-nhan-an'], { relativeTo: this.route });
  }
  moveToSettingPage(): void {
    this.router.navigate(['cai-dat'], { relativeTo: this.route });
    this.settings_service_ws.selectedStateStatus();
  }
  //////////////////////////////////////////

  // thông báo
  notificationMessage() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // tránh lặp nhiều lần
    let checkLoop = ''
    this.notificationMessageService_ws.accessSettings(idUser).once('value', set => {
      if (set.val().khong_lam_phien == 'tat') {
        // truy cập lấy ra tất cả mã cuộc trò chuyện
        this.notificationMessageService_ws.access_cuoc_tro_chuyen().on('value', conver => {
          // danh sách chat
          let listIDConver = []
          conver.forEach(elementConver => {
            listIDConver.push(elementConver.key)
          });
          // vào thanh viên cuộc trò chuyện để lấy ra danh sách các cuộc trò chuyện bản thân có tham gia
          this.notificationMessageService_ws.access_thanh_vien_cuoc_tro_chuyen().on('value', member => {
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
                    this.notificationMessageService_ws.access_thong_tin_tro_chuyen_nhom().child(keySingle).once('value', group => {
                      groupBox.nameGroup = group.val().ten_nhom
                    })
                    listIDConverUserJoin.push(groupBox)
                  }
                }
              });
            });

            //  vào chi tiết cuộc trò chuyện lấy ra tin nhắn chưa xem
            this.notificationMessageService_ws.access_chi_tiet_cuoc_tro_chuyen().on('value', converMess => {
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
                          this.notificationMessageService_ws.access_tai_khoan().child(elementDetail.val().ma_tai_khoan).once('value', acc => {
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
                            this.notificationMessageService_ws.access_chi_tiet_cuoc_tro_chuyen().child(idCon).child(elementDetail.key).child('tinh_trang_xem').child(idUser).update({
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

      notification.onclick = (e) => {
        window.close()
        window.open(location.origin + '/bessenger-ws/tin-nhan/' + mess.idConversation, '_blank');
      }
    }
  }

}

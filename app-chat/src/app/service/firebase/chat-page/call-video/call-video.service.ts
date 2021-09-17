import { MessengerMainService } from './../chat-page-chat-page/messenger-main.service';
import { ChatPageChatPageContentService } from './../chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';
import { MyNameService } from 'src/app/service/firebase/my-name/my-name.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserVideo } from 'src/app/models/firebase/chat-page/call-video/user-video';
import { ObjectChatThanhVien } from 'src/app/models/firebase/chat-page/chat-page-chat-page/header/object_chat_thanh_vien';

@Injectable({
  providedIn: 'root'
})
export class CallVideoService {

  // Request mediaDevices
  public mediaConstraints = {
    audio: true,
    video: true
  }

  // localStream
  public localStream: MediaStream;

  // is show component call video
  public is_show: boolean;

  // Trạng thái camera bật hay tắt
  public is_close_camera: boolean;
  // Trạng thái my camera go to left
  public is_camera_go_to_left: boolean;

  // All user
  public all_user: UserVideo[] = [];
  // user đang tương tác
  public now_user: ObjectChatThanhVien;
  // request 45s
  public countRequest = 0;
  // Trạng thái 
  public status: number;

  // service
  public layAllUser: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private my_name_service: MyNameService,
    private main_page_service: MainPageService,
    private content_service: ChatPageChatPageContentService,
    private messenger_main_service: MessengerMainService
  ) {
    if (this.layAllUser == null) {
      this.getData();
    } else {
      this.layAllUser.unsubscribe();
      this.getData();
    }
  }

  public getData() {
    this.layAllUser = this.db.object("/call_video").snapshotChanges().subscribe(data => {
      let array: UserVideo[] = [];
      let isCall = false;
      let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
      Object.entries(data.payload.toJSON()).forEach(([k, v]) => {
        let o = new UserVideo();
        o.ma_tai_khoan = k;
        o.bat_may_chua = v['bat_may_chua'];
        o.goi_chua = v['goi_chua'];
        o.thoi_gian_goi = v['thoi_gian_goi'];
        o.thoi_gian_ket_thuc = v['thoi_gian_ket_thuc'];
        o.tk_goi_minh = v['tk_goi_minh'];
        o.hinh_tk_goi_minh = v['hinh_tk_goi_minh'];
        o.ten_tk_goi_minh = v['ten_tk_goi_minh'];
        // Đang trong cuộc gọi
        if (k == mtk && o.goi_chua == 'dang') {
          isCall = true;
        }
        array.push(o);
      });
      this.all_user = array;
      if (isCall) {
        this.getVideoUserAndShow()
      } else {
        this.is_close_camera = false
        try {
          this.localStream.getTracks().forEach(function (track) {
            track.enabled = true;
          });
        } catch {

        }
        this.is_show = false;
      }
    })
  }

  public async getVideoUserAndShow() {
    this.localStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
    this.is_show = true;
  }

  public async callVideo(tk: ObjectChatThanhVien) {
    this.now_user = tk;
    // Check thử available
    if (this.isAvailable(tk.ma_tai_khoan)) {
      // Lấy video
      this.getVideoUserAndShow();
      // Cập nhật lại trong firebase
      this.writeToFirebase(tk);
      // Time out 45s
      this.countRequest = 0;
      this.request45second();
      // Status là gọi
      this.status = 1;
    } else {
      // Lấy video
      this.localStream = null;
      this.is_show = true;
    }
  }

  public request45second() {
    setTimeout(() => {
      this.countRequest++;
      if (this.countRequest <= 45) {
        let isOk = false;
        for (let i = 0; i < this.all_user.length; i++) {
          if (this.all_user[i].ma_tai_khoan == this.now_user.ma_tai_khoan) {
            if (this.all_user[i].bat_may_chua == 'roi') {
              isOk = true;
            }
            break;
          }
        }
        if (!isOk) {
          this.request45second();
        } else {
          // Có người bắt máy
          // Chuyển status sang bắt máy
          this.status = 2;
        }
      } else {
        this.cuocGoiNho();
      }
    }, 1000);
  }

  public writeToFirebase(tk: ObjectChatThanhVien) {
    let currentTime = Number(new Date());
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    this.db.object("/call_video/" + tk.ma_tai_khoan).update({
      thoi_gian_goi: currentTime,
      goi_chua: "dang",
      bat_may_chua: "chua",
      tk_goi_minh: mtk,
      hinh_tk_goi_minh: this.main_page_service.img,
      ten_tk_goi_minh: this.my_name_service.myName
    });
    this.db.object("/call_video/" + mtk).update({
      thoi_gian_goi: currentTime,
      goi_chua: "dang",
      bat_may_chua: "roi",
      tk_goi_minh: 'khong_co',
      hinh_tk_goi_minh: 'khong_co',
      ten_tk_goi_minh: 'khong_co'
    });
  }

  public isAvailable(mtk: string): boolean {
    for (let i = 0; i < this.all_user.length; i++) {
      if (this.all_user[i].ma_tai_khoan == mtk) {
        if (this.all_user[i].goi_chua == 'dang') {
          return false;
        }
        break;
      }
    }
    return true;
  }

  public startVideo() {
    this.is_close_camera = false
    this.localStream.getTracks().forEach(function (track) {
      track.enabled = true;
    });
  }

  public offVideo() {
    this.is_close_camera = true;
    this.localStream.getTracks().forEach(function (track) {
      track.enabled = false;
    });
  }

  public close() {
    // countRequest
    if (this.status == 1) {
      this.countRequest = 45;
    } else if (this.status == 2) {
      // view
      this.is_show = false;
      this.localStream.getTracks().forEach(function (track) {
        track.stop();
      });
      this.is_close_camera = false;
      // data
      this.closeData();
    }
  }

  public cuocGoiNho() {
    // view
    this.is_show = false;
    this.localStream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.is_close_camera = false;
    // data
    this.closeData();
    // Tạo tin nhắn cuộc gọi nhỡ
    this.createTinNhan();
  }

  public createTinNhan() {
    let nowDate = new Date();
    let gio = nowDate.getHours();
    let phut = nowDate.getMinutes();
    let noi_dung = `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}`
    this.content_service.sumitTinNhan(this.messenger_main_service.ma_cuoc_tro_chuyen, noi_dung, "cuoc_goi_nho", this.my_name_service.myName);
  }

  public closeData() {
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    this.db.object("/call_video/" + this.now_user.ma_tai_khoan).update({
      goi_chua: "chua",
    });
    this.db.object("/call_video/" + mtk).update({
      goi_chua: "chua",
    });
  }

  public cameraGoToLeft() {
    this.is_camera_go_to_left = !this.is_camera_go_to_left;
  }

}

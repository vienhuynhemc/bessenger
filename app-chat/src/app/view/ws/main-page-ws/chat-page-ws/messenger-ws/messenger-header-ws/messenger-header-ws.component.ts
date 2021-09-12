import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallVideoWsService } from 'src/app/service/ws/chat-page/call-video/call-video-ws.service';
import { MessengerHeaderWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header-ws.service';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';
import { SettingServiceWsService } from 'src/app/service/ws/settings/setting-service-ws.service';

@Component({
  selector: 'app-messenger-header-ws',
  templateUrl: './messenger-header-ws.component.html',
  styleUrls: ['./messenger-header-ws.component.scss']
})
export class MessengerHeaderWsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public messenger_main_service: MessengerMainWsService,
    public header_service: MessengerHeaderWsService,
    public call_video: CallVideoWsService,
    public settingsService: SettingServiceWsService
  ) { }

  public roiKhoiNhom(element) {
    this.openMenu(element);
    this.header_service.roiKhoiNhom(this.messenger_main_service.ma_cuoc_tro_chuyen);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy loại cuộc trò chuyện
      if (this.header_service.layAllCuocTroChuyen == null) {
        this.getData();
      } else {
        this.header_service.layAllCuocTroChuyen.unsubscribe();
        this.getData();
      }
    });
  }

  public getData() {
    this.header_service.layAllCuocTroChuyen = this.header_service.getObjectChat(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.header_service.dienThongTinCoBan(data.payload.toJSON());
      // Lấy thông tin nhóm của nó nếu có
      if (this.header_service.layThongTinNhom == null) {
        this.layThongTinNhom();
      } else {
        this.header_service.layThongTinNhom.unsubscribe();
        this.layThongTinNhom();
      }
    });
  }

  public layThongTinNhom() {
    this.header_service.layThongTinNhom = this.header_service.getThongTinTroChuyenNhom(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.header_service.dienThongTinNhom(data.payload.toJSON());
      // Lấy thành viên của nó
      if (this.header_service.layThanhVien == null) {
        this.layThanhVien();
      } else {
        this.header_service.layThanhVien.unsubscribe();
        this.layThanhVien();
      }
    })
  }

  public layLanCuoiDangNha() {
    this.header_service.layLanCuoiDangNhap = this.header_service.getLanCuoiDangNhap().subscribe(data => {
      this.header_service.dienLanCuoiDangNhap(data.payload.toJSON());
    })
  }

  public layThanhVien() {
    this.header_service.layThanhVien = this.header_service.getObjectChatThanhVien(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.header_service.dienThanhVien(data.payload.toJSON());
      // Có thành viên rồi thì fill lần cuối đăng nhập cho nó
      if (this.header_service.layLanCuoiDangNhap == null) {
        this.layLanCuoiDangNha();
      } else {
        this.header_service.layLanCuoiDangNhap.unsubscribe();
        this.layLanCuoiDangNha();
      }
      // Lấy thông tin tài khoản của các thành viên
      if (this.header_service.layThongTinThanhVien == null) {
        this.layThongTinThanhVien();
      } else {
        this.header_service.layThongTinThanhVien.unsubscribe();
        this.layThongTinThanhVien();;
      }
    })
  }

  public layThongTinThanhVien() {
    this.header_service.layThongTinThanhVien = this.header_service.getDataThanhVien().subscribe(data => {
      this.header_service.dienThongTinThanhVien(data.payload.toJSON());
    })
  }

  public openMenu(element: HTMLElement): void {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }

}

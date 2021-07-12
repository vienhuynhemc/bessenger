import { CallVideoService } from './../../../../../service/chat-page/call-video/call-video.service';
import { ActivatedRoute } from '@angular/router';
import { MessengerHeaderService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessengerMainService } from 'src/app/service/chat-page/chat-page-chat-page/messenger-main.service';

@Component({
  selector: 'app-messenger-header',
  templateUrl: './messenger-header.component.html',
  styleUrls: ['./messenger-header.component.scss']
})
export class MessengerHeaderComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    public messenger_main_service: MessengerMainService,
    public header_service: MessengerHeaderService,
    public call_video: CallVideoService
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

  public async callVideo(): Promise<void> {
    this.call_video.localStream = await navigator.mediaDevices.getUserMedia(this.call_video.mediaConstraints);
    this.call_video.is_show = true;
  }

}

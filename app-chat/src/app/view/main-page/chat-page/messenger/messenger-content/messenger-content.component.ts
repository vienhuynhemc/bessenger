import { ChatPageChatPageScrollService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-scroll.service';
import { ChatPageChatPageContentService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MessengerMainService } from './../../../../../service/chat-page/chat-page-chat-page/messenger-main.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerFooterService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';
import { AnimationOptions } from 'ngx-lottie';
import { DomSanitizer } from '@angular/platform-browser'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-messenger-content',
  templateUrl: './messenger-content.component.html',
  styleUrls: ['./messenger-content.component.scss']
})
export class MessengerContentComponent implements OnInit {

  // scroll
  @HostListener('scroll', ['$event'])

  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/input_loading.json',
  };

  public showDelay = new FormControl(500);

  constructor(
    // Footer service để điều chỉnh height
    public messenger_footer_service: MessengerFooterService,
    // Thay đổi url
    private route: ActivatedRoute,
    // Để lấy mã cuộc trò chuyện
    private messenger_main_service: MessengerMainService,
    // Service chính
    public content_service: ChatPageChatPageContentService,
    // pipi html
    public sanitized: DomSanitizer,
    // Service scroll
    public scroll_service: ChatPageChatPageScrollService
  ) { }

  public layAllBanBe() {
    this.content_service.layAllBanBe = this.content_service.getBanBe().subscribe(data => {
      this.content_service.layBanBe(data.payload.toJSON());
    });
  }

  public layLoaiCuocTroChuyen() {
    this.content_service.layLoaiCuocTroChuyen = this.content_service.getObjectChat(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.content_service.dienThongTinCoBan(data.payload.toJSON());
      // Lấy thông tin nhóm của nó nếu có
      if (this.content_service.layThongTinNhom == null) {
        this.layThongTinNhom();
      } else {
        this.content_service.layThongTinNhom.unsubscribe();
        this.layThongTinNhom();
      }
    });
  }

  public layThongTinNhom() {
    this.content_service.layThongTinNhom = this.content_service.getThongTinTroChuyenNhom(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.content_service.dienThongTinNhom(data.payload.toJSON());
    })
  }

  public layThanhVien() {
    this.content_service.layThanhVien = this.content_service.getObjectChatThanhVien(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.content_service.dienThanhVien(data.payload.toJSON());
      // Lấy thông tin tài khoản của các thành viên
      if (this.content_service.layThongTinTaiKhoan == null) {
        this.layThongTinTaiKhoan();
      } else {
        this.content_service.layThongTinTaiKhoan.unsubscribe();
        this.layThongTinTaiKhoan();
      }
    })
  }

  public layThongTinTaiKhoan() {
    this.content_service.layThongTinTaiKhoan = this.content_service.getDataThanhVien().subscribe(data => {
      this.content_service.dienThongTinThanhVien(data.payload.toJSON());
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy bạn bè
      if (this.content_service.layAllBanBe == null) {
        this.layAllBanBe();
      } else {
        this.content_service.layAllBanBe.unsubscribe();
        this.layAllBanBe();
      }
      // Lấy loại cuộc trò chuyện
      if (this.content_service.layLoaiCuocTroChuyen == null) {
        this.layLoaiCuocTroChuyen();
      } else {
        this.content_service.layLoaiCuocTroChuyen.unsubscribe();
        this.layLoaiCuocTroChuyen();
      }
      // Lấy thành viên của nó
      if (this.content_service.layThanhVien == null) {
        this.layThanhVien();
      } else {
        this.content_service.layThanhVien.unsubscribe();
        this.layThanhVien();
      }
      // Lấy tin nhắn
      if (this.content_service.layTinNhan == null) {
        this.layTinNhan();
      } else {
        this.content_service.layTinNhan.unsubscribe();
        this.layTinNhan();
      }
      // Lấy nhữung ông đang nhập
      if (this.content_service.layNhungOngDangNhap == null) {
        this.layNhungOngDangNhap();
      } else {
        this.content_service.layNhungOngDangNhap.unsubscribe();
        this.layNhungOngDangNhap();
      }
      // add event scroll
      this.addEventScroll();
    });
  }

  public addEventScroll() {
    this.scroll_service.register(document.getElementById("danh-sach-tin-nhan"));
  }

  public scrollChange(event){
    this.scroll_service.scrollTop = document.getElementById("tin-nhan-div").scrollTop;
  }

  public layTinNhan() {
    this.content_service.layTinNhan = this.content_service.getTinNhan(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.content_service.dienTinNhan(data.payload.toJSON());
    })
  }

  public layNhungOngDangNhap() {
    this.content_service.layNhungOngDangNhap = this.content_service.getDangNhap(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.content_service.dienThongTinDangNhap(data.payload.toJSON());
    });
  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { ChatPageChatPageScrollWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-scroll-ws.service';
import { MessengerFooterWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer-ws.service';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';
import { RecallMessengerWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/recall-messenger/recall-messenger-ws.service';
import { SelectEmojiWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/recall-messenger/select-emoji-ws.service';
import { ImageDetailWsService } from 'src/app/service/ws/image-detail/image-detail-ws.service';
import { SettingServiceWsService } from 'src/app/service/ws/settings/setting-service-ws.service';

@Component({
  selector: 'app-messenger-content-ws',
  templateUrl: './messenger-content-ws.component.html',
  styleUrls: ['./messenger-content-ws.component.scss']
})
export class MessengerContentWsComponent implements OnInit {
 // scroll
 @HostListener('scroll', ['$event'])

 // lottie
 public options: AnimationOptions = {
   path: '/assets/json/lottie/input_loading.json',
 };
 public showDelay = new FormControl(500);

 constructor(
   // Footer service để điều chỉnh height
   public messenger_footer_service: MessengerFooterWsService,
   // Thay đổi url
   private route: ActivatedRoute,
   // Để lấy mã cuộc trò chuyện
   public messenger_main_service: MessengerMainWsService,
   // Service chính
   public content_service: ChatPageChatPageContentWsService,
   // pipi html
   public sanitized: DomSanitizer,
   // Service scroll
   public scroll_service: ChatPageChatPageScrollWsService,
   // Thu hồi tin nhắn
   public recall_m:RecallMessengerWsService,
   // Select emoji
   public s_e:SelectEmojiWsService,
   public imageDetailService:ImageDetailWsService,
   public settingsService: SettingServiceWsService
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
     // Có thành viên thì bắt đầu điền cho nó lần cuối đăng nhập
     if(this.content_service.layLanCuoiOnline == null){
       this.layLanCuoiOnline();
     }else{
       this.content_service.layLanCuoiOnline.unsubscribe();
       this.layLanCuoiOnline();
     }
     // Lấy thông tin tài khoản của các thành viên
     if (this.content_service.layThongTinTaiKhoan == null) {
       this.layThongTinTaiKhoan();
     } else {
       this.content_service.layThongTinTaiKhoan.unsubscribe();
       this.layThongTinTaiKhoan();
     }
   })
 }

 public layLanCuoiOnline(){
   this.content_service.layLanCuoiOnline = this.content_service.getLanCuoiOnline().subscribe(data=>{
     this.content_service.dienLanCUoiOnline(data.payload.toJSON());
   })
 }

 public layThongTinTaiKhoan() {
   this.content_service.layThongTinTaiKhoan = this.content_service.getDataThanhVien().subscribe(data => {
     this.content_service.dienThongTinThanhVien(data.payload.toJSON());
   })
 }


 uRLSafe(url: string) {
   return this.sanitized.bypassSecurityTrustUrl(url);
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
    this.content_service.dienTinNhan(data.payload.toJSON(), this.messenger_main_service.ma_cuoc_tro_chuyen);
  })
  }

 public layNhungOngDangNhap() {
   this.content_service.layNhungOngDangNhap = this.content_service.getDangNhap(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
     this.content_service.dienThongTinDangNhap(data.payload.toJSON());
   });
 }

 public thuHoi(mtn:string){
   this.recall_m.is_show =true;
   this.recall_m.ma_tin_nhan = mtn;
   this.recall_m.ma_cuoc_tro_chuyen = this.messenger_main_service.ma_cuoc_tro_chuyen;
 }

 // click file
 public clickMessageFile(ma_tin_nhan: string, urlFile:string) {
   let linkFile = <HTMLAreaElement>document.getElementById('file-'+ma_tin_nhan);
   linkFile.click();
 
 }

}

import { ChatPageChatPageContentService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MessengerMainService } from './../../../../../service/chat-page/chat-page-chat-page/messenger-main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerFooterService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';

@Component({
  selector: 'app-messenger-content',
  templateUrl: './messenger-content.component.html',
  styleUrls: ['./messenger-content.component.scss']
})
export class MessengerContentComponent implements OnInit {

  constructor(
    public messenger_footer_service: MessengerFooterService,
    private route:ActivatedRoute,
    private messenger_main_service:MessengerMainService,
    public content_service:ChatPageChatPageContentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy bạn bè
      this.content_service.getBanBe().subscribe(data=>{
        this.content_service.layBanBe(data.payload.toJSON());
      });
      // Lấy loại cuộc trò chuyện
      this.content_service.getObjectChat(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
        this.content_service.dienThongTinCoBan(data.payload.toJSON());
        // Lấy thông tin nhóm của nó nếu có
        this.content_service.getThongTinTroChuyenNhom(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
          this.content_service.dienThongTinNhom(data.payload.toJSON());
          // Lấy thành viên của nó
          this.content_service.getObjectChatThanhVien(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
            this.content_service.dienThanhVien(data.payload.toJSON());
            // Lấy thông tin tài khoản của các thành viên
            this.content_service.getDataThanhVien().subscribe(data => {
              this.content_service.dienThongTinThanhVien(data.payload.toJSON());
            })
          })
        })
      });
    });
  }

}
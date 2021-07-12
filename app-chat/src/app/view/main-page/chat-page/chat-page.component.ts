import { CallVideoService } from './../../../service/chat-page/call-video/call-video.service';
import { ChatPageProcessServiceService } from './../../../service/chat-page/chat-page-process-service.service';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';
import { RecallMessengerService } from 'src/app/service/chat-page/chat-page-chat-page/recall-messenger/recall-messenger.service';
import { SelectEmojiService } from 'src/app/service/chat-page/chat-page-chat-page/recall-messenger/select-emoji.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {


  constructor(
    private main_page_service: MainPageService,
    public chat_page_process_service: ChatPageProcessServiceService,
    public recall_m : RecallMessengerService,
    public select_emoji:SelectEmojiService,
    public call_video:CallVideoService
  ) { }

  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatPage();
    }, 0);
  }

  public hiddenRecallM(){
    this.recall_m.is_show =false;
    this.recall_m.ma_tin_nhan = null;
    this.recall_m.ma_cuoc_tro_chuyen =null;
  }

}

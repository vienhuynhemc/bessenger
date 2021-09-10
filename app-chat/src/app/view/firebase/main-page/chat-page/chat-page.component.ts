import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';
import { RecallMessengerService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/recall-messenger/recall-messenger.service';
import { SelectEmojiService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/recall-messenger/select-emoji.service';
import { ImageDetailService } from 'src/app/service/firebase/image-detail/image-detail.service';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';
import { ChatPageProcessServiceService } from 'src/app/service/firebase/chat-page/chat-page-process-service.service';
import { CallVideoService } from 'src/app/service/firebase/chat-page/call-video/call-video.service';

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
    public imageDetailService: ImageDetailService,
    public call_video:CallVideoService,
    private settingsService: SettingsServiceService
  ) { }

  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatPage();
    }, 0);
    // gọi setting của bản thân
    this.settingsService.getStatusMe();
  }

  public hiddenRecallM(){
    this.recall_m.is_show =false;
    this.recall_m.ma_tin_nhan = null;
    this.recall_m.ma_cuoc_tro_chuyen =null;
  }

}

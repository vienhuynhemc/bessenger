import { Component, OnInit } from '@angular/core';
import { CallVideoWsService } from 'src/app/service/ws/chat-page/call-video/call-video-ws.service';
import { RecallMessengerWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/recall-messenger/recall-messenger-ws.service';
import { SelectEmojiWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/recall-messenger/select-emoji-ws.service';
import { ChatPageProcessServiceWsService } from 'src/app/service/ws/chat-page/chat-page-process-service-ws.service';
import { ImageDetailWsService } from 'src/app/service/ws/image-detail/image-detail-ws.service';
import { MainPageWsService } from 'src/app/service/ws/main-page/main-page-ws.service';
import { SettingServiceWsService } from 'src/app/service/ws/settings/setting-service-ws.service';

@Component({
  selector: 'app-chat-page-ws',
  templateUrl: './chat-page-ws.component.html',
  styleUrls: ['./chat-page-ws.component.scss']
})
export class ChatPageWsComponent implements OnInit {

  constructor(
    private main_page_service: MainPageWsService,
    public chat_page_process_service: ChatPageProcessServiceWsService,
    public recall_m : RecallMessengerWsService,
    public select_emoji:SelectEmojiWsService,
    public imageDetailService: ImageDetailWsService,
    public call_video:CallVideoWsService,
    private settingsService: SettingServiceWsService
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

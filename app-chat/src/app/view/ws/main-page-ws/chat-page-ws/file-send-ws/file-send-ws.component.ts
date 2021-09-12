import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { MessengerHeaderWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header-ws.service';
import { ChatPageSettingWsService } from 'src/app/service/ws/chat-page/chat-page-file-page/chat-page-setting-ws.service';
import { SettingServiceWsService } from 'src/app/service/ws/settings/setting-service-ws.service';

@Component({
  selector: 'app-file-send-ws',
  templateUrl: './file-send-ws.component.html',
  styleUrls: ['./file-send-ws.component.scss']
})
export class FileSendWsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public content_service: ChatPageChatPageContentWsService,
    public header_service: MessengerHeaderWsService,
    // Main service
    public setting_chat_service:ChatPageSettingWsService,
    public settingsService: SettingServiceWsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setting_chat_service.ma_cuoc_tro_chuyen = params['id'];
    });
  }

}

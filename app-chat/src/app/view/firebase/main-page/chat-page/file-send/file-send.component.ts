import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';
import { ChatPageChatPageContentService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MessengerHeaderService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header.service';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';
import { ChatPageSettingService } from 'src/app/service/firebase/chat-page/chat-page-file-page/chat-page-setting.service';

@Component({
  selector: 'app-file-send',
  templateUrl: './file-send.component.html',
  styleUrls: ['./file-send.component.scss']
})
export class FileSendComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public content_service: ChatPageChatPageContentService,
    public header_service: MessengerHeaderService,
    // Main service
    public setting_chat_service:ChatPageSettingService,
    public settingsService: SettingsServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setting_chat_service.ma_cuoc_tro_chuyen = params['id'];
    });
  }

}

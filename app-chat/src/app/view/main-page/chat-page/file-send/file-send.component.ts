import { ChatPageSettingService } from './../../../../service/chat-page/chat-page-file-page/chat-page-setting.service';
import { MyNameService } from './../../../../service/my-name/my-name.service';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';
import { ChatPageChatPageContentService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MessengerHeaderService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header.service';

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
    public setting_chat_service:ChatPageSettingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    });
  }

}

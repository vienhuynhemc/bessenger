import { Component, OnInit } from '@angular/core';
import { SettingBoxChatService } from 'src/app/service/chat-page/chat-page-file-page/setting-box-chat/setting-box-chat.service';

@Component({
  selector: 'app-setting-box-chat',
  templateUrl: './setting-box-chat.component.html',
  styleUrls: ['./setting-box-chat.component.scss']
})
export class SettingBoxChatComponent implements OnInit {

  constructor(
    public setting_box_chat_service:SettingBoxChatService,
  ) { }

  ngOnInit(): void {
  }

  public open(){
    this.setting_box_chat_service.isOpen = !this.setting_box_chat_service.isOpen;
  }

}

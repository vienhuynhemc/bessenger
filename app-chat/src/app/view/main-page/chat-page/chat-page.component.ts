import { ChatPageCreateGroupService } from './../../../service/chat-page/chat-page-friends-page/chat-page-create-group.service';
import { ChatPageProcessServiceService } from './../../../service/chat-page/chat-page-process-service.service';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {


  constructor(
    private main_page_service: MainPageService,
    public chat_page_process_service: ChatPageProcessServiceService,
    public chat_page_create_ground: ChatPageCreateGroupService
  ) { }

  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatPage();
    }, 0);
  }

  public closeTaoNhom(): void {
    setTimeout(() => { this.chat_page_create_ground.isshow = false }, 0);
  }


}

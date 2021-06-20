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
    public chat_page_process_service:ChatPageProcessServiceService
    ) { }

  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatPage();
    }, 0);
  }


}

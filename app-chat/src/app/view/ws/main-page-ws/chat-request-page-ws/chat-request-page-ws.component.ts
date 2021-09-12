import { Component, OnInit } from '@angular/core';
import { ChatPageProcessServiceWsService } from 'src/app/service/ws/chat-page/chat-page-process-service-ws.service';
import { MainPageWsService } from 'src/app/service/ws/main-page/main-page-ws.service';

@Component({
  selector: 'app-chat-request-page-ws',
  templateUrl: './chat-request-page-ws.component.html',
  styleUrls: ['./chat-request-page-ws.component.scss'],
})
export class ChatRequestPageWsComponent implements OnInit {
  constructor(
    private main_page_service: MainPageWsService,
    public chat_page_process_service: ChatPageProcessServiceWsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatRequestPage();
    }, 0);
  }
}

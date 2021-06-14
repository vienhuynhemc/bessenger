import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-chat-request-page',
  templateUrl: './chat-request-page.component.html',
  styleUrls: ['./chat-request-page.component.scss']
})
export class ChatRequestPageComponent implements OnInit {

  constructor(private main_page_service: MainPageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectChatRequestPage();
    }, 0);
  }

}

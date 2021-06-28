import { Component, OnInit } from '@angular/core';
import { MessengerFooterService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';

@Component({
  selector: 'app-messenger-content',
  templateUrl: './messenger-content.component.html',
  styleUrls: ['./messenger-content.component.scss']
})
export class MessengerContentComponent implements OnInit {

  constructor(
    public messenger_footer_service: MessengerFooterService
  ) { }

  ngOnInit(): void {
  }

}

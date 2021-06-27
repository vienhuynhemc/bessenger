import { MessengerFooterService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger-footer',
  templateUrl: './messenger-footer.component.html',
  styleUrls: ['./messenger-footer.component.scss']
})
export class MessengerFooterComponent implements OnInit {

  // Nội dung tin nhắn
  public tin_nhan: string;

  constructor(
    public messenger_footer_service: MessengerFooterService
  ) { }

  ngOnInit(): void {
  }

  public inputMessenger(value: string) {
    this.tin_nhan = value.trim();

    let parent_input = document.getElementById("parent_input");
    if (parent_input.offsetHeight) {
      if (parent_input.offsetHeight > 22) {
        parent_input.style.marginBottom = "10px";
      } else {
        parent_input.style.marginBottom = "5px";
      }
    }
  }

}

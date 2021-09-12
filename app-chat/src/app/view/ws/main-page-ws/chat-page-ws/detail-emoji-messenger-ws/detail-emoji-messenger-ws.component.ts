import { Component, OnInit } from '@angular/core';
import { SelectEmojiWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/recall-messenger/select-emoji-ws.service';

@Component({
  selector: 'app-detail-emoji-messenger-ws',
  templateUrl: './detail-emoji-messenger-ws.component.html',
  styleUrls: ['./detail-emoji-messenger-ws.component.scss']
})
export class DetailEmojiMessengerWsComponent implements OnInit {

  constructor(
    public s_e:SelectEmojiWsService
  ) { }

  ngOnInit(): void {
  }

}

import { SelectEmojiService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/recall-messenger/select-emoji.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-emoji-messenger',
  templateUrl: './detail-emoji-messenger.component.html',
  styleUrls: ['./detail-emoji-messenger.component.scss']
})
export class DetailEmojiMessengerComponent implements OnInit {

  constructor(
    public s_e:SelectEmojiService
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerMainService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/messenger-main.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public messenger_main_service: MessengerMainService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.messenger_main_service.ma_cuoc_tro_chuyen = params['id'];
    });
  }

}

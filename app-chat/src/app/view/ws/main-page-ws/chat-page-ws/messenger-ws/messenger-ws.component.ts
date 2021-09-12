import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';

@Component({
  selector: 'app-messenger-ws',
  templateUrl: './messenger-ws.component.html',
  styleUrls: ['./messenger-ws.component.scss']
})
export class MessengerWsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public messenger_main_service: MessengerMainWsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.messenger_main_service.ma_cuoc_tro_chuyen = params['id'];
    });
  }


}

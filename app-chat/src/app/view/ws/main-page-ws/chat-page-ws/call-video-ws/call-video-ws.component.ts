import { Component, HostListener, OnInit } from '@angular/core';
import { CallVideoWsService } from 'src/app/service/ws/chat-page/call-video/call-video-ws.service';
import { MainPageWsService } from 'src/app/service/ws/main-page/main-page-ws.service';
// Peer
declare var Peer: any;
@Component({
  selector: 'app-call-video-ws',
  templateUrl: './call-video-ws.component.html',
  styleUrls: ['./call-video-ws.component.scss']
})
export class CallVideoWsComponent implements OnInit {

  public peer: any;
  public peerId: string;

  constructor(
    public call_video: CallVideoWsService,
    public main_page_service: MainPageWsService,
  ) {
    this.peer = new Peer();
  }

  ngOnInit(): void {
    // Lấy id phòng
    this.getPeerId();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.call_video.close();
  }

  public getPeerId() {
    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log(this.peerId);
    });
  }


}

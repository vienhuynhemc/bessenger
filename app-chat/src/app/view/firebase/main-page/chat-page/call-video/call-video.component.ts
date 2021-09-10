import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CallVideoService } from 'src/app/service/firebase/chat-page/call-video/call-video.service';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';

// Peer
declare var Peer: any;

@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.component.html',
  styleUrls: ['./call-video.component.scss']
})
export class CallVideoComponent implements OnInit {

  public peer: any;
  public peerId: string;

  constructor(
    public call_video: CallVideoService,
    public main_page_service: MainPageService,
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

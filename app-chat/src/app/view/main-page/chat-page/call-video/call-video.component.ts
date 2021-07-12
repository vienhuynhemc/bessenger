import { Component, OnInit } from '@angular/core';
import { CallVideoService } from './../../../../service/chat-page/call-video/call-video.service';

@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.component.html',
  styleUrls: ['./call-video.component.scss']
})
export class CallVideoComponent implements OnInit {

  constructor(
    public call_video:CallVideoService
  ) { }

  ngOnInit(): void {
  }

  public close(){
    this.call_video.is_show = false;
    this.call_video.localStream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

}

import { MediasShareService } from './../../../../../service/chat-page/chat-page-file-page/medias-share/medias-share.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medias-share',
  templateUrl: './medias-share.component.html',
  styleUrls: ['./medias-share.component.scss']
})
export class MediasShareComponent implements OnInit {

  constructor(
    public medias_share_service:MediasShareService
  ) { }

  ngOnInit(): void {
  }

  public open(){
    this.medias_share_service.isOpen = !this.medias_share_service.isOpen;
  }

}

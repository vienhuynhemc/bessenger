import { Component, OnInit } from '@angular/core';
import { MediaShareWS } from 'src/app/models/ws/chat-page/chat-page-file-page/media-share/media-share-ws';
import { ImageDetailWsService } from 'src/app/service/ws/image-detail/image-detail-ws.service';

@Component({
  selector: 'app-detail-image-ws',
  templateUrl: './detail-image-ws.component.html',
  styleUrls: ['./detail-image-ws.component.scss']
})
export class DetailImageWsComponent implements OnInit {

  constructor(public imageDetailService:ImageDetailWsService) { }

  ngOnInit(): void {
    
  }

  clickChangeSelected(media: MediaShareWS, index: number) {
    if(index != this.imageDetailService.indexSelected) {
      const scroll = document.getElementById('scroll-image');
      if(index > this.imageDetailService.indexSelected && index > 15) {
        scroll.scrollLeft += 49
      } else if(index < this.imageDetailService.indexSelected && index < (this.imageDetailService.lengthMediaList - 16))
        scroll.scrollLeft -= 49
      this.imageDetailService.urlSelected.url = media.url;
      this.imageDetailService.urlSelected.typeMessage = media.typeMessage;
      this.imageDetailService.indexSelected = index;
    }
  }

  clickNext() {
    this.imageDetailService.indexSelected++;
    this.imageDetailService.mediaList.forEach((media,index) => {
      if(index == this.imageDetailService.indexSelected) {
        this.imageDetailService.urlSelected.url = media.url
        this.imageDetailService.urlSelected.typeMessage = media.typeMessage;
      }
    });
    if(this.imageDetailService.lengthMediaList > 31) {
      if(this.imageDetailService.indexSelected > 15) {
        const scroll = document.getElementById('scroll-image');
        scroll.scrollLeft += 49
         
      }
    }
  }

  clickPrev() {
    this.imageDetailService.indexSelected--;
    this.imageDetailService.mediaList.forEach((media,index) => {
      if(index == this.imageDetailService.indexSelected) {
        this.imageDetailService.urlSelected.url = media.url
        this.imageDetailService.urlSelected.typeMessage = media.typeMessage;
      }
    });
    if(this.imageDetailService.lengthMediaList > 31) {
      if(this.imageDetailService.indexSelected < (this.imageDetailService.lengthMediaList - 16)) {
        const scroll = document.getElementById('scroll-image');
        scroll.scrollLeft -= 49
      }
    }
  }

}

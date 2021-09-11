import { Component, OnInit } from '@angular/core';
import { MediaShare } from 'src/app/models/firebase/chat-page/chat-page-file-page/media-share/MediaShare';
import { ImageDetailService } from 'src/app/service/firebase/image-detail/image-detail.service';

@Component({
  selector: 'app-detail-image',
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.scss']
})
export class DetailImageComponent implements OnInit {

  constructor(public imageDetailService:ImageDetailService) { }

  ngOnInit(): void {
    
  }

  clickChangeSelected(media: MediaShare, index: number) {
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

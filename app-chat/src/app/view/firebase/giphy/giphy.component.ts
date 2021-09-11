import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { GiphyObject } from 'src/app/models/firebase/giphy/giphy';
import { ChatPageChatPageContentService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { GiphyService } from 'src/app/service/firebase/giphy/giphy.service';
import { StickersService } from 'src/app/service/firebase/stickers/stickers.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit,OnDestroy {
  APIKEY: string = "FYvCtFq1iMU8ECzsOZC6wuxYZOdABFC7"
  urlMax30: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=30&q=`;
  urlMax50: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=50&q=`;

  listGiphyDefault: GiphyObject[] = null;
  listGiphySearch: GiphyObject[];
  valueSub: Subscription;
  maCuocTroChuyen: string;
  constructor(private gifService: GiphyService,public contentService: ChatPageChatPageContentService,private route: ActivatedRoute, private stickersService: StickersService) { }
  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }
 // lottie
 options: AnimationOptions = {
  path: '/assets/json/lottie/loading2.json',
};
animationCreated(animationItem: AnimationItem): void {
}
  ngOnInit(): void {
    this.loadRandomGriphy()
    this.getMaCuocTroChuyen()
  }
  randomTopicDefault(): string {
    let x = Math.floor(Math.random() * 5);
    switch(x) {
      case 0: return 'love'
      case 1: return 'happy'
      case 2: return 'funny'
      case 3: return 'fun'
      case 4: return 'smile'
    }
    return null;
  }

  // lấy
  getMaCuocTroChuyen() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.maCuocTroChuyen = params.get('id');
    });
  }
  // load mặc định 30 giphy
  loadRandomGriphy() {
    this.listGiphyDefault = []
    this.listGiphySearch = [];
    let url = this.urlMax30.concat(this.randomTopicDefault());
    fetch(url).then(response => response.json()).then(content => {
        content.data.forEach(giphy => {
          let object = new GiphyObject();
          object.url = giphy.images.downsized.url;
          object.name = giphy.title
          this.listGiphyDefault.push(object)
        });
    })
    this.listGiphySearch = this.listGiphyDefault;
  }

  // tìm kiếm theo tên
  searchGiphy(valueSearch: string) {
    // nếu khác rỗng thì tìm ngược lại thì gán mặc định
    if(valueSearch.trim() != '') {
      this.listGiphySearch = []
      let url = this.urlMax50.concat(valueSearch.trim());
      fetch(url).then(response => response.json()).then(content => {
        content.data.forEach(giphy => {
          let object = new GiphyObject();
          object.url = giphy.images.downsized.url;
          object.name = giphy.title
          this.listGiphySearch.push(object)
        });
    })
    } else {
      this.listGiphySearch = this.listGiphyDefault;
    }
  }
  sendGif(gif: GiphyObject) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.gifService.accessAccount().child(parseIDUser).once('value', (acc) => {
      this.contentService.sumitTinNhan(this.maCuocTroChuyen ,gif.url, "gui_giphy",acc.val().ten);
      this.stickersService.isShowBoxGiphy = false;
    })
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { GiphyObjectWS } from 'src/app/models/ws/giphy.ts/giphy_ws';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { GiphyWsService } from 'src/app/service/ws/giphy/giphy-ws.service';
import { StickerWsService } from 'src/app/service/ws/sticker/sticker-ws.service';

@Component({
  selector: 'app-giphy-ws',
  templateUrl: './giphy-ws.component.html',
  styleUrls: ['./giphy-ws.component.scss']
})
export class GiphyWsComponent implements OnInit,OnDestroy {
  APIKEY: string = "FYvCtFq1iMU8ECzsOZC6wuxYZOdABFC7"
  urlMax30: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=30&q=`;
  urlMax50: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=50&q=`;

  listGiphyDefault: GiphyObjectWS[] = null;
  listGiphySearch: GiphyObjectWS[];
  valueSub: Subscription;
  maCuocTroChuyen: string;
  constructor(
    private gifService: GiphyWsService,
    public contentService: ChatPageChatPageContentWsService,
    private route: ActivatedRoute, 
    private stickersService: StickerWsService
    ) { }
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
          let object = new GiphyObjectWS();
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
          let object = new GiphyObjectWS();
          object.url = giphy.images.downsized.url;
          object.name = giphy.title
          this.listGiphySearch.push(object)
        });
    })
    } else {
      this.listGiphySearch = this.listGiphyDefault;
    }
  }
  sendGif(gif: GiphyObjectWS) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.gifService.accessAccount().child(parseIDUser).once('value', (acc) => {
      this.contentService.sumitTinNhan(this.maCuocTroChuyen ,gif.url, "gui_giphy",acc.val().ten);
      this.stickersService.isShowBoxGiphy = false;
    })
  }

}

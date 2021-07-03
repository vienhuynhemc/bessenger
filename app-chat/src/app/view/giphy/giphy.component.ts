import { Component, OnInit } from '@angular/core';
import { GiphyObject } from 'src/app/models/giphy/giphy';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {
  APIKEY: string = "FYvCtFq1iMU8ECzsOZC6wuxYZOdABFC7"
  urlMax30: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=30&q=`;
  urlMax50: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&limit=50&q=`;

  listGiphyDefault: GiphyObject[];
  listGiphySearch: GiphyObject[];
  constructor() { }

  ngOnInit(): void {
    this.loadRandomGriphy()
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
}

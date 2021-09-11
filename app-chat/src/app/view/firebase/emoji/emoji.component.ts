import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { EmojiObject } from '../../../models/firebase/emoji/emoji_object';
import { EmojiService } from '../../../service/firebase/emoji/emoji.service';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  // scroll
  @HostListener('scroll', ['$event'])

  // lottie
  options: AnimationOptions = {
    path: '/assets/json/lottie/loading2.json',
  };

  @Output() icon = new EventEmitter();

  constructor(
    public emoji_service: EmojiService
  ) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  public selectIconNonHistory(item: EmojiObject) {
    this.icon.emit(item);
    this.emoji_service.updateHistory(item);
  }

  public selectIconHistory(item: EmojiObject) {
    this.icon.emit(item);
  }

  public scrollSpan(index: number) {
    let root = document.getElementById("list");
    let allElement = document.querySelectorAll("section");
    let count = 0;
    allElement.forEach(element => {
      if (count != index && count != -1) {
        count++;
      }
      if (count != -1 && count == index) {
        count = - 1;
        root.scrollTop = element.offsetTop;
      }
    })
  }

  public updateHover(i: number) {
    //clear
    document.getElementById("span-1").classList.remove("qua-khu-select");
    document.getElementById("span-2").classList.remove("mat-cuoi-select");
    document.getElementById("span-3").classList.remove("dong-vat-select");
    document.getElementById("span-4").classList.remove("rau-cu-select");
    document.getElementById("span-5").classList.remove("do-choi-select");
    document.getElementById("span-6").classList.remove("du-lich-select");
    document.getElementById("span-7").classList.remove("bong-den-select");
    document.getElementById("span-8").classList.remove("dinh-kem-select");
    document.getElementById("span-9").classList.remove("co-select");
    switch (i) {
      case 1:
        document.getElementById("span-1").classList.add("qua-khu-select");
        break;
      case 2:
        document.getElementById("span-2").classList.add("mat-cuoi-select");
        break;
      case 3:
        document.getElementById("span-3").classList.add("dong-vat-select");
        break;
      case 4:
        document.getElementById("span-4").classList.add("rau-cu-select");
        break;
      case 5:
        document.getElementById("span-5").classList.add("do-choi-select");
        break;
      case 6:
        document.getElementById("span-6").classList.add("du-lich-select");
        break;
      case 7:
        document.getElementById("span-7").classList.add("bong-den-select");
        break;
      case 8:
        document.getElementById("span-8").classList.add("dinh-kem-select");
        break;
      case 9:
        document.getElementById("span-9").classList.add("co-select");
        break;
    }
  }

  public eventScroll(event) {
    let root = document.getElementById("list");
    let allElement = document.querySelectorAll("section");
    let i = 0;
    allElement.forEach(element => {
      let elementTop = element.offsetTop;
      if (root.scrollTop >= elementTop) {
        i++;
      }
    })
    this.updateHover(i);
  }

}

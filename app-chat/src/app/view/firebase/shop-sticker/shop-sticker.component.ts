import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { StickerObject } from 'src/app/models/firebase/sticker/sticker';
import { StickersService } from 'src/app/service/firebase/stickers/stickers.service';

@Component({
  selector: 'app-shop-sticker',
  templateUrl: './shop-sticker.component.html',
  styleUrls: ['./shop-sticker.component.scss']
})
export class ShopStickerComponent implements OnInit {
  stickerList: StickerObject[] = null;
  constructor(public stickersService: StickersService) { }

  ngOnInit(): void {
    this.loadStickersList()
  }
   // lottie
   options: AnimationOptions = {
    path: '/assets/json/lottie/loading2.json',
  };
  animationCreated(animationItem: AnimationItem): void {
  }
  loadStickersList() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.stickersService.accessUseSticker().child(parseIDUser).on('value', (use) => {
      let useSticker = []
      use.forEach(element => {
          if(element.val().ton_tai == 0)
            useSticker.push(element.key)
      });
      this.stickersService.accessStickers().on('value',(sticker) => {
        this.stickerList = []
        sticker.forEach(element => {
            if(element.val().ton_tai == 0) {
              let stickerTemp = new StickerObject();
              stickerTemp.id = element.key;
              stickerTemp.name = element.val().ten_loai;
              stickerTemp.img = element.val().anh;
              stickerTemp.img_description = element.val().anh_mo_ta;
              if(useSticker.includes(element.key))
                stickerTemp.checkAdd = 'go'
              else {
                stickerTemp.checkAdd = 'them'
              }
              this.stickerList.push(stickerTemp)
          }

        });
      })
    })
  }

  addSticker(idSticker: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.stickersService.accessUseSticker().child(parseIDUser).child(idSticker).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
  } 

  removeSticker(idSticker: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.stickersService.accessUseSticker().child(parseIDUser).child(idSticker).update({
      ton_tai: 1
    })
  }
}

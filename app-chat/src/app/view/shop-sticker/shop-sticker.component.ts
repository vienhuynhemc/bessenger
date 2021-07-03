import { Component, OnInit } from '@angular/core';
import { StickersService } from 'src/app/service/stickers/stickers.service';

@Component({
  selector: 'app-shop-sticker',
  templateUrl: './shop-sticker.component.html',
  styleUrls: ['./shop-sticker.component.scss']
})
export class ShopStickerComponent implements OnInit {

  constructor(public stickersService: StickersService) { }

  ngOnInit(): void {
  }

}

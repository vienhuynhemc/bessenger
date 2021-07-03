import { Component, OnInit } from '@angular/core';
import { StickersService } from 'src/app/service/stickers/stickers.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit {
  constructor(public stickersService: StickersService) { }

  ngOnInit(): void {
  }


}

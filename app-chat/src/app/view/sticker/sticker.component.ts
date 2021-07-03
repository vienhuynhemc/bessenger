import { Component, OnInit } from '@angular/core';
import { StickerObject } from 'src/app/models/sticker/sticker';
import { StickerDetail } from 'src/app/models/sticker/sticker_detail';
import { StickersService } from 'src/app/service/stickers/stickers.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit {
  idStickerList: string[]
  stickerList: StickerObject[]
  stickerDetailList: StickerDetail[] = []
  selected: string;
  constructor(public stickersService: StickersService) { }
  ngOnInit(): void {
    this.stickersService.themNhanDan()
    // this.loadStickerList()
  }

  loadStickerList() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // lấy ra danh sách id sticker mà người dùng đã mua
    this.stickerList = []
    this.idStickerList = []
    this.stickersService.accessUseSticker().child(parseIDUser).on('value', (sticker) => {
        sticker.forEach(element => {
          if(element.val() != null) {
            if(element.val().ton_tai == 0)
              this.idStickerList.push(element.key)
          }
        });
        // lấy ra thông tin chi tiết của từng sticker
        this.idStickerList.forEach(sticker => {
          this.stickersService.accessStickers().child(sticker).on('value',(infor) => {
            if(infor.val() != null) {
              if(infor.val().ton_tai == 0) {
                let stickerDetail = new StickerObject();
                stickerDetail.id = infor.key;
                stickerDetail.img = infor.val().anh;
                stickerDetail.img_description = infor.val().anh_mo_ta;
                stickerDetail.name = infor.val().ten_loai
                this.stickerList.push(stickerDetail)
              }
            }
          })
        });
    })
  }
  // load danh sách các sticker theo id nhóm sticker
  loadStickerDetail(idSticker: string) {
    this.selected = idSticker;
    this.stickerDetailList = []
    this.stickersService.accessStickers().child(idSticker).child('danh_sach_nhan_dan').once('value', (sticker) => {
        if(sticker.val()!=null) {
          sticker.forEach(element => {
            let stickerObject = new StickerDetail();
            stickerObject.idSticker = idSticker;
            stickerObject.idDetail = element.key;
            stickerObject.url = element.val().src;
            this.stickerDetailList.push(stickerObject)
          });
        }
    })
  }
}

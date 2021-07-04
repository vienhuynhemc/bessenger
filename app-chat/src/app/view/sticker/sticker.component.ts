import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StickerObject } from 'src/app/models/sticker/sticker';
import { StickerDetail } from 'src/app/models/sticker/sticker_detail';
import { ChatPageChatPageContentService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { StickersService } from 'src/app/service/stickers/stickers.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit, OnDestroy {
  idStickerList: any[]
  stickerList: StickerObject[]
  stickerDetailList: StickerDetail[] = []
  selected: string;
  checkAgoHide: boolean;
  maCuocTroChuyen: string;
  valueSub: Subscription;

  constructor(public stickersService: StickersService, public contentService: ChatPageChatPageContentService,  private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
    
  }
  ngOnInit(): void {
    this.inTheFirst()
    this.loadStickerList()
    this.getMaCuocTroChuyen();
  }
  // lấy
  getMaCuocTroChuyen() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.maCuocTroChuyen = params.get('id');
    });
  }
  sortStickerTimeAdd() {
    this.stickerList = this.stickerList.sort((time1, time2) => {
      let result_1 = time1.dateAdd;
      let result_2 = time2.dateAdd;
      return result_2 - result_1;
    });
  }
  // lần đầu mở thì thêm vào 4 nhãn dán có sẵn
  inTheFirst() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.stickersService.accessUseSticker().child(parseIDUser).on('value', (sticker) => {
      if(sticker.val() == null) {
        this.stickersService.addStickerFirst(parseIDUser)
      }
    })
  }
  loadStickerList() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // lấy ra danh sách id sticker mà người dùng đã mua
    this.stickersService.accessUseSticker().child(parseIDUser).on('value', (sticker) => {
      this.idStickerList = []
      this.stickerList = []
        sticker.forEach(element => {
          if(element.val() != null) {
            if(element.val().ton_tai == 0 ) {
              let check = false;
              this.idStickerList.forEach(list => {
                  if(list.id == element.key)
                    check = true
              });
              if(!check)
                this.idStickerList.push({id: element.key, timeAdd: element.val().ngay_tao})
            }
          }
        });

        if(this.idStickerList.length == 0) {
          this.stickerDetailList = []
        }
        // lấy ra thông tin chi tiết của từng sticker
        this.idStickerList.forEach(sticker => {
          this.stickersService.accessStickers().child(sticker.id).on('value',(infor) => {
            if(infor.val() != null) {
              if(infor.val().ton_tai == 0) {
                let stickerDetail = new StickerObject();
                stickerDetail.id = infor.key;
                stickerDetail.img = infor.val().anh;
                stickerDetail.img_description = infor.val().anh_mo_ta;
                stickerDetail.name = infor.val().ten_loai
                stickerDetail.dateAdd = sticker.timeAdd;
                let checkEmpty = false
                this.stickerList.forEach(element => {
                    if(element.id == stickerDetail.id) 
                      checkEmpty = true
                });
                if(!checkEmpty)
                  this.stickerList.push(stickerDetail)
              }
            }
          })
        });
        // sắp xếp theo thứ tự thêm gần đây
        this.sortStickerTimeAdd();
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
  // click di chuyển phải
  toRight() {
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft += 50
    if(scroll.scrollLeft >= 0)
      this.checkAgoHide = true;
  }
  // click di chuyển trái
  toLeft() {
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft -= 50
    if(scroll.scrollLeft < 50)
      this.checkAgoHide = false;
  }

  // gui sticker
  sendSticker(item: StickerDetail) {
    // this.contentService.sumitTinNhan(this.maCuocTroChuyen ,item.url, "gui_nhan_dan" );
    // this.stickersService.isShowBoxSticker = false;
  }
}

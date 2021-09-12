import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { StickerDetailWS } from 'src/app/models/ws/sticker/sticker_detail_ws';
import { StickerObjectWS } from 'src/app/models/ws/sticker/sticker_ws';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { StickerWsService } from 'src/app/service/ws/sticker/sticker-ws.service';

@Component({
  selector: 'app-sticker-ws',
  templateUrl: './sticker-ws.component.html',
  styleUrls: ['./sticker-ws.component.scss']
})
export class StickerWsComponent implements OnInit, OnDestroy {
  idStickerList: any[]
  stickerList: StickerObjectWS[]
  stickerDetailList: StickerDetailWS[] = []
  stickerListHistory: StickerDetailWS[] = null;
  selected: string = 'ago';
  checkAgoHide: boolean;
  checkNextHide: boolean = true;
  maCuocTroChuyen: string;
  valueSub: Subscription;
  clickLeftRight: number = 1;
  constructor(
    public stickersService: StickerWsService,
    public contentService: ChatPageChatPageContentWsService, 
    private route: ActivatedRoute) { }
    
  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
    
  }
  ngOnInit(): void {
    this.inTheFirst()
    this.loadStickerList()
    this.getMaCuocTroChuyen();
    this.loadHistoryUseSticker();
  }
   // lottie
   options: AnimationOptions = {
    path: '/assets/json/lottie/loading2.json',
  };
  animationCreated(animationItem: AnimationItem): void {
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
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.stickersService.accessUseSticker().child(parseIDUser).on('value', (sticker) => {
      if(sticker.val() == null) {
        this.stickersService.addStickerFirst(parseIDUser)
      }
    })
  }
  loadStickerList() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
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
                let stickerDetail = new StickerObjectWS();
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
          if(this.stickerList.length <= 4)
            this.checkNextHide = true;
          else 
            this.checkNextHide = false;
          this.sortStickerTimeAdd();
          })
           // sắp xếp theo thứ tự thêm gần đây
        });
      
    })
  }
  // load danh sách các sticker theo id nhóm sticker
  loadStickerDetail(idSticker: string) {
    let scroll = document.getElementById('scroll-content');
    if(scroll != null)
    scroll.scrollTop = 0;
    this.selected = idSticker;
    this.stickerDetailList = []
    this.stickersService.accessStickers().child(idSticker).child('danh_sach_nhan_dan').on('value', (sticker) => {
        if(sticker.val()!=null) {
          sticker.forEach(element => {
            let stickerObject = new StickerDetailWS();
            stickerObject.idSticker = idSticker;
            stickerObject.idDetail = element.key;
            stickerObject.url = element.val().src;
            this.stickerDetailList.push(stickerObject)
          });
        }
    })
   
  }
  // click di chuyển phải
  toRight(stickerList: StickerObjectWS[]) {
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft += 165
    this.clickLeftRight += 1
    if(scroll.scrollLeft >= 0)
      this.checkAgoHide = true;
    if(this.clickLeftRight >= stickerList.length/4)
      this.checkNextHide = true;
  }
  // click di chuyển trái
  toLeft(stickerList: StickerObjectWS[]) {
    let scroll = document.getElementById('scroll');
    scroll.scrollLeft -= 165
    this.clickLeftRight -= 1
    if(scroll.scrollLeft < 200)
      this.checkAgoHide = false;
      if(this.clickLeftRight < stickerList.length/4)
      this.checkNextHide = false;
  }

  // gui sticker
  sendSticker(item: StickerDetailWS) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // gửi tin nhắn
    this.stickersService.accessAccount().child(parseIDUser).once('value', (acc) => {
      this.contentService.sumitTinNhan(this.maCuocTroChuyen ,item.url, "gui_nhan_dan",acc.val().ten);
      this.stickersService.isShowBoxSticker = false;
    });
    // thêm vào lịch sử gửi sticker
    this.stickersService.accessAccessHistorySticker().child(parseIDUser).once('value', (his) => {
      if(his.val() == null) {
        this.stickersService.accessAccessHistorySticker().child(parseIDUser).child('0').set({
          ma_nhan_dan:item.idDetail,
          src: item.url
        })
      } else {
        let listStickerTemp = [];
        his.forEach(element => {
            let sticker = new StickerDetailWS();
            sticker.idDetail = element.val().ma_nhan_dan;
            sticker.url = element.val().src
            listStickerTemp.push(sticker)
        });
        if(listStickerTemp.length <= 16) {
          let checkAdd = false;
          listStickerTemp.forEach((element,i) => {
              if(element.idDetail == item.idDetail) {
                checkAdd = true
                listStickerTemp.splice(i, 1)
              }
          });
          if(!checkAdd && listStickerTemp.length == 16) {
            listStickerTemp.pop()
            listStickerTemp.unshift(item)
            listStickerTemp.forEach((ele, index) => {
              this.stickersService.accessAccessHistorySticker().child(parseIDUser).child(index+'').set({
                ma_nhan_dan:ele.idDetail,
                src: ele.url
              })
            });
          }else if(!checkAdd && listStickerTemp.length < 16) {
            listStickerTemp.unshift(item)
            listStickerTemp.forEach((ele, index) => {
              this.stickersService.accessAccessHistorySticker().child(parseIDUser).child(index+'').set({
                ma_nhan_dan:ele.idDetail,
                src: ele.url
              })
            });
          } else {
            listStickerTemp.unshift(item)
            listStickerTemp.forEach((ele, index) => {
              this.stickersService.accessAccessHistorySticker().child(parseIDUser).child(index+'').set({
                ma_nhan_dan:ele.idDetail,
                src: ele.url
              })
            });
          }
        }
      }
    })
  }
  
  clickAgo() {
    this.selected = 'ago'
    this.loadHistoryUseSticker();
  }
  // load lich su dung sticker
  loadHistoryUseSticker() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
      this.stickersService.accessAccessHistorySticker().child(parseIDUser).on('value',(his) =>{
        this.stickerListHistory = []
        his.forEach(element => {
          let sticker = new StickerDetailWS();
          sticker.idDetail = element.val().ma_nhan_dan
          sticker.url = element.val().src
          this.stickerListHistory.push(sticker)
        });
      })
  }
}

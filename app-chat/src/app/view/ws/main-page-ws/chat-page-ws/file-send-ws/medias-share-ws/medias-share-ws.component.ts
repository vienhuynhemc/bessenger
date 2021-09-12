import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MediaShareWS } from 'src/app/models/ws/chat-page/chat-page-file-page/media-share/media-share-ws';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';
import { MediasShareWsService } from 'src/app/service/ws/chat-page/chat-page-file-page/media-share/medias-share-ws.service';
import { ImageDetailWsService } from 'src/app/service/ws/image-detail/image-detail-ws.service';

@Component({
  selector: 'app-medias-share-ws',
  templateUrl: './medias-share-ws.component.html',
  styleUrls: ['./medias-share-ws.component.scss']
})
export class MediasShareWsComponent implements OnInit {

  listMediaMainShare: MediaShareWS[];
  listMediaImageShare: MediaShareWS[]
  constructor(
    private route: ActivatedRoute,
    public medias_share_service:MediasShareWsService,
    public messenger_main_service: MessengerMainWsService,
    private sanitizer:DomSanitizer,
    public imageDetailService: ImageDetailWsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(this.medias_share_service.isOpen)
        this.getListMediaShare()
    });
  }

  public open(){
    this.medias_share_service.isOpen = !this.medias_share_service.isOpen;
    if(this.medias_share_service.isOpen)
      this.getListMediaShare()
  }
  sortMediaMain() {
    this.listMediaMainShare= this.listMediaMainShare.sort((date1, date2) => {
      var x = date1.dateSend;
      var y = date2.dateSend;
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
  uRLSafe(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getListMediaShare() {
    this.medias_share_service.accessfile_da_gui().child(this.messenger_main_service.ma_cuoc_tro_chuyen).on('value', (media)=>{ 
      this.listMediaMainShare = []
      this.listMediaImageShare = []
      media.forEach(file => {
        if(file.val() != null) {
          // nếu là video
          if(file.val().loai_tin_nhan == 'gui_video' && file.val().ton_tai == 0) {
            let newMedia = new MediaShareWS()
            newMedia.idMessage = file.key;
            newMedia.typeMessage = file.val().loai_tin_nhan;
            newMedia.idAccount = file.val().ma_tai_khoan;
            newMedia.dateSend = file.val().ngay_gui;
            newMedia.nameFile = file.val().ten_file;
            newMedia.url = file.val().url;
            this.listMediaMainShare.push(newMedia)
            // nếu là hình thì lấy ra danh sách url img
          } else if(file.val().loai_tin_nhan == 'gui_hinh' && file.val().ton_tai == 0) {
            this.medias_share_service.accessluu_fileFireStorage().child(this.messenger_main_service.ma_cuoc_tro_chuyen).child(file.val().url).listAll().then((result)=>{
              this.listMediaImageShare = []
              result.items.forEach(element => {
                element.getDownloadURL().then((urlImage)=> {
                  let newImage = new MediaShareWS()
                  newImage.idMessage = file.key;
                  newImage.typeMessage = file.val().loai_tin_nhan;
                  newImage.idAccount = file.val().ma_tai_khoan;
                  newImage.dateSend = file.val().ngay_gui;
                  newImage.nameFile = file.val().ten_file;
                  newImage.url = urlImage;
                  // nối mảng phụ vào mảng chính
                  this.listMediaImageShare.push(newImage);
                  // kiểm tra nếu hình đã tồn tại thì k thêm vào
                  this.listMediaImageShare.forEach(img => {
                    let checkExist = false;
                    this.listMediaMainShare.forEach(main => {
                        if(main.url == img.url) {
                            checkExist = true;
                        }
                    });
                    if(!checkExist)
                      this.listMediaMainShare.push(img)
                  });
                  this.sortMediaMain();
                })
              });
              
            })
          }
         
        }
      }); 
     
    })
  }

}

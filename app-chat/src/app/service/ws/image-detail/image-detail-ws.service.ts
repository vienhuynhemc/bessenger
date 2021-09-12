import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { MediaShareWS } from 'src/app/models/ws/chat-page/chat-page-file-page/media-share/media-share-ws';

@Injectable({
  providedIn: 'root'
})
export class ImageDetailWsService {
  isOpen: boolean;
  mediaList: MediaShareWS[];
  mediaListImage: MediaShareWS[];
  urlSelected: MediaShareWS = new MediaShareWS();
  lengthMediaList: number = 0;
  indexSelected: number = 0;

  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage) { }
  
  // tắt xem chi tiết
  openImage() {
    this.isOpen = !this.isOpen
  }
  
  // xem chi tiết ảnh khi click vào ảnh
  openImageURL(urlFile:string, typeMessage: string, iDConversation:string) {
    this.isOpen = !this.isOpen
    this.urlSelected.url = urlFile;
    this.urlSelected.typeMessage = typeMessage
    if(this.isOpen) {
      this.accessfile_da_gui().child(iDConversation).on('value', (media)=>{ 
        this.mediaList = []
        this.mediaListImage = []
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
              this.mediaList.push(newMedia)
              // nếu là hình thì lấy ra danh sách url img
            } else if(file.val().loai_tin_nhan == 'gui_hinh' && file.val().ton_tai == 0) {
              this.accessluu_fileFireStorage().child(iDConversation).child(file.val().url).listAll().then((result)=>{
                this.mediaListImage = []
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
                    this.mediaListImage.push(newImage);
                    // kiểm tra nếu hình đã tồn tại thì k thêm vào
                    this.mediaListImage.forEach(img => {
                      let checkExist = false;
                      this.mediaList.forEach(main => {
                          if(main.url == img.url) {
                              checkExist = true;
                          }
                      });
                      if(!checkExist)
                        this.mediaList.push(img)
                    });
                    this.sortMediaMain();
                    // lấy ra index
                    this.mediaList.forEach((element,index) => {
                        if(element.url == this.urlSelected.url) {
                          this.indexSelected = index;
                          
                         
                        }
                    });
                    // đợi tag
                    setTimeout(() => {
                      if(this.indexSelected > 28) {
                      const scroll = document.getElementById('scroll-image');
                        scroll.scrollLeft = 49*(this.indexSelected - 16)
                      }
                    }, 1000);
                    this.lengthMediaList = this.mediaList.length;
                  })
                });
                
              })
            }
           
          }
          
        }); 
        
      })
     
    }
  }


  // truy cập vào file da gui
  accessfile_da_gui() {
    return this.db.database.ref('file_da_gui_ws');
  }
  // truy cap firestorage luu_file
  accessluu_fileFireStorage() {
    return this.storage.storage.ref('/luu_file_ws/')
  }

  sortMediaMain() {
    this.mediaList = this.mediaList.sort((date1, date2) => {
      var x = date1.dateSend;
      var y = date2.dateSend;
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
}

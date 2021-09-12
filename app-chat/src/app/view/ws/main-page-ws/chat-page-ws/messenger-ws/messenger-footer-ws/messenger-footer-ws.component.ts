import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmojiObjectWS } from 'src/app/models/ws/emoji/emoji_object_ws';
import { FileUploadWS } from 'src/app/models/ws/file-upload/file_upload_ws';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { FooterScrollWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-footer/footer-scroll-ws.service';
import { MessengerFooterWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer-ws.service';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';
import { MyNameWsService } from 'src/app/service/ws/my-name/my-name-ws.service';
import { RecordingWsService } from 'src/app/service/ws/recording/recording-ws.service';
import { StickerWsService } from 'src/app/service/ws/sticker/sticker-ws.service';

@Component({
  selector: 'app-messenger-footer-ws',
  templateUrl: './messenger-footer-ws.component.html',
  styleUrls: ['./messenger-footer-ws.component.scss']
})
export class MessengerFooterWsComponent implements OnInit {

  // Nội dung tin nhắn
  public tin_nhan: string;
  // Kích thước trc thay đổi
  public last_height: number;
  // Có hiện hộp btcx
  public isShowBtcxBox: boolean;
  // check click gửi tin nhắn audio
  checkSendAudio: boolean;
  check100Audio: boolean;
  // mảng file
  arrayFileUpload: FileUploadWS[] = [];
  arrayImageVideoUpload: FileUploadWS[] = [];
  constructor(
    public messenger_footer_service: MessengerFooterWsService,
    public messenger_main_service: MessengerMainWsService,
    public content_service: ChatPageChatPageContentWsService,
    private route: ActivatedRoute,
    public stickersService: StickerWsService,
    public my_name_service: MyNameWsService,
    public recordingService: RecordingWsService,
    public footer_scroll: FooterScrollWsService,
    private sanitizer:DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reset();
      // Lấy thông tin cơ bản
      if (this.messenger_footer_service.layData == null) {
        this.getData();
      } else {
        this.messenger_footer_service.layData.unsubscribe();
        this.getData();
      }
      // Đăng ký chênh lệch height

      setTimeout(
        () =>
          this.footer_scroll.register(document.getElementById('parent_input')),
        0
      );
    });
  }

  public getData() {
    this.messenger_footer_service.layData = this.messenger_footer_service
      .getThongTinCoBan(this.messenger_main_service.ma_cuoc_tro_chuyen)
      .subscribe((data) => {
        this.messenger_footer_service.dienThongTinCoBan(data.payload.toJSON());
      });
  }

  public reset(): void {
    this.last_height = 22;
    let input = document.getElementById('input');
    if (input != null) {
      input.innerHTML = '';
    }
    this.messenger_footer_service.chenh_lech_height = 0;
    let parent_input = document.getElementById('parent_input');
    if (parent_input != null) {
      parent_input.style.marginBottom = '5px';
    }
    this.tin_nhan = '';
    // reset
    if (this.recordingService.isShowRecording) {
      this.recordingService.stopRecording();
      this.recordingService.isShowRecording = false;
    }
    
    this.arrayImageVideoUpload = [];
    this.arrayFileUpload = [];
    
  }

  public getIcon(item: EmojiObjectWS) {
    let span = document.createElement('span');
    span.classList.add('span-image-box-chat');
    span.style.backgroundImage = `url("${item.src}")`;
    let spanContent = document.createElement('span');
    spanContent.innerText = item.alt;
    span.appendChild(spanContent);
    span.setAttribute('contenteditable', 'false');
    let input = document.getElementById('input');
    // xóa br nếu trc nó là br
    let beforeElement = null;
    let posNow = null;
    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.rangeCount) {
        let range = sel.getRangeAt(0);
        var container = range.commonAncestorContainer;
        var nodeParent = container.parentNode;
        let pos = range.endOffset;
        posNow = pos;
        let nodes = input.childNodes;
        beforeElement = nodes[pos];
        if (container.nodeType == Node.TEXT_NODE) {
          // lấy vị trí ông text đang caret
          let index = 0;
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] == container) {
              index = i;
              break;
            }
          }
          //  Tách
          let text1 = nodes[index].textContent.substring(0, pos);
          let text2 = nodes[index].textContent.substring(
            pos,
            nodes[index].textContent.length
          );
          let node1 = document.createTextNode(text1);
          let node2 = document.createTextNode(text2);
          input.removeChild(nodes[index]);
          let newpos = index;
          let nodeAfter = nodes[index];
          if (text1.length == 0) {
            if (nodeAfter == null) {
              input.appendChild(span);
              input.appendChild(node2);
            } else {
              input.insertBefore(node2, nodeAfter);
              input.insertBefore(span, node2);
            }
            newpos += 1;
          } else if (text2.length == 0) {
            if (nodeAfter == null) {
              input.appendChild(node1);
              input.appendChild(span);
            } else {
              input.insertBefore(span, nodeAfter);
              input.insertBefore(node1, span);
            }
            newpos += 2;
          } else {
            if (nodeAfter == null) {
              input.appendChild(node1);
              input.appendChild(span);
              input.appendChild(node2);
            } else {
              input.insertBefore(node2, nodeAfter);
              input.insertBefore(span, node2);
              input.insertBefore(node1, span);
            }
            newpos += 2;
          }
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(input, newpos);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          // Cập nhật dữ liệu tin nhắn
          this.tin_nhan = input.innerHTML.trim();
          this.xuLyCss();
        } else {
          if (nodes.length > 0) {
            // Lúc bắt đầu
            if (pos == 0) {
              if (nodes[0].isEqualNode(document.createElement('br'))) {
                input.removeChild(nodes[0]);
                posNow = 0;
                beforeElement = null;
              }
            } else {
              if (nodes[pos - 1].isEqualNode(document.createElement('br'))) {
                input.removeChild(nodes[pos - 1]);
                beforeElement = input.childNodes[posNow];
              }
            }
          }
          // add icon
          if (beforeElement != null) {
            input.insertBefore(span, beforeElement);
          } else {
            input.appendChild(span);
          }
          // add xong icon move qua ben phai cua no
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(input, posNow + 1);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          // Cập nhật dữ liệu tin nhắn
          this.tin_nhan = input.innerHTML.trim();
          this.xuLyCss();
        }
      }
    }
  }

  public inputMessenger(value: string) {
    this.tin_nhan = value.trim();
    // Xử lý css và scroll
    this.xuLyCss();
  }

  public xuLyCss() {
    let parent_input = document.getElementById('parent_input');
    if (parent_input.offsetHeight) {
      if (parent_input.offsetHeight > 22) {
        if (parent_input.offsetHeight != this.last_height) {
          parent_input.style.marginBottom = '10px';
          this.messenger_footer_service.chenh_lech_height =
            parent_input.offsetHeight - 17;
          if (this.last_height == 22) {
            window.scrollTo(
              0,
              window.pageYOffset +
                (parent_input.offsetHeight - this.last_height) +
                5
            );
          } else {
            window.scrollTo(
              0,
              window.pageYOffset +
                (parent_input.offsetHeight - this.last_height)
            );
          }
          this.last_height = parent_input.offsetHeight;
        }
      } else {
        if (this.last_height != 22) {
          this.last_height = 22;
          parent_input.style.marginBottom = '5px';
          this.messenger_footer_service.chenh_lech_height = 0;
        }
      }
    }
  }

  public onKeyInput(event) {
    let input = document.getElementById('input');
    // Nút enter
    if (event.keyCode == 13) {
      if (event.shiftKey) {
        // Ko tự động xuống dòng
        event.preventDefault();
        // Thêm dòng mới bỏ qua div
        document.execCommand('insertHTML', false, '<br><br>');
      } else {
        // Ko tự động xuống dòng
        event.preventDefault();
        // submit
        this.sendTinNhan();
      }
    }
  }

  public guiTinNhanLuotThich() {
    this.content_service.sumitTinNhan(
      this.messenger_main_service.ma_cuoc_tro_chuyen,
      '',
      'gui_tin_nhan_like',
      this.my_name_service.myName
    );
  }

  public guiTinNhanBTCX() {
    this.content_service.sumitTinNhanBTCX(
      this.messenger_main_service.ma_cuoc_tro_chuyen,
      this.messenger_footer_service.object_chat_footer.bieu_tuong_cam_xuc,
      'gui_tin_nhan_btcx',
      this.my_name_service.myName,
      this.messenger_footer_service.object_chat_footer.bieu_tuong_cam_xuc_alt.split(
        ' '
      )[1]
    );
  }

  public sendTinNhan() {
    let input = document.getElementById('input');
    if (this.tin_nhan.trim().length != 0) {
      let count = 0;
      for (let i = 0; i < input.childNodes.length; i++) {
        if (input.childNodes[i].isEqualNode(document.createElement('br'))) {
          count++;
        }
      }
      if (count != input.childNodes.length) {
        let type =
          input.children.length == input.childNodes.length
            ? 'gui_text_icon'
            : 'gui_text';
        this.content_service.sumitTinNhan(
          this.messenger_main_service.ma_cuoc_tro_chuyen,
          this.tin_nhan,
          type,
          this.my_name_service.myName
        );
      }
    }
    // làm rỗng ô nhập
    input.innerHTML = '';
    this.tin_nhan = '';
    this.xuLyCss();
  }

  // gửi ghi âm
  public sendRecording() {
    // dừng ghi âm
    if (this.recordingService.isStateRecording()) {
      this.recordingService.pauseRecording();
    }
    // lưu vào fire storage
    // kiểm tra click gửi 1 lần
    if (!this.checkSendAudio) {
      this.checkSendAudio = true;
      // trễ 1s để lấy ra src audio
      setTimeout(() => {
        let audio = document.getElementById('source-audio');
        this.recordingService.urlAudio = audio.getAttribute('src');
        // lấy blob
        fetch(this.recordingService.urlAudio)
          .then((res) => res.blob())
          .then((blob) => {
            let newAdd = this.recordingService.accessRecordingStorage(blob);
            // phần trăm loading
            newAdd.percentageChanges().subscribe((percent) => {
              // 100% thì gửi tin nhắn
              if (percent == 100) {
                newAdd
                  .snapshotChanges()
                  .pipe(
                    finalize(() => {
                      this.recordingService.storageRef
                        .getDownloadURL()
                        .subscribe((downloadURL) => {
                          if (!this.check100Audio) {
                            this.content_service.sumitTinNhan(
                              this.messenger_main_service.ma_cuoc_tro_chuyen,
                              downloadURL,
                              'gui_ghi_am',
                              this.my_name_service.myName
                            );
                            this.check100Audio = true;
                          }
                        });
                    })
                  )
                  .subscribe();
                this.recordingService.isShowRecording = false;
                this.checkSendAudio = false;
              }
            });
          });
        this.check100Audio = false;
      }, 1000);
    }
  }

  public openBoxBtcx() {
    this.isShowBtcxBox = !this.isShowBtcxBox;
    // mở box này thì đóng các box còn lại
    if (this.isShowBtcxBox) {
      this.stickersService.isShowBoxSticker = false;
      this.stickersService.isShowBoxGiphy = false;
      this.recordingService.isShowRecording = false;
    }
  }

  // hiển thị box giphy
  public openBoxGiphy() {
    this.stickersService.openGiphy();
    // mở box này thì đóng các box còn lại
    if (this.stickersService.isShowBoxGiphy) {
      this.isShowBtcxBox = false;
      this.stickersService.isShowBoxSticker = false;
      this.recordingService.isShowRecording = false;
    }
  }

  // hiển thị box sticker
  public openBoxStickers() {
    this.stickersService.openSticker();
    if (this.stickersService.isShowBoxSticker) {
      this.isShowBtcxBox = false;
      this.stickersService.isShowBoxGiphy = false;
      this.recordingService.isShowRecording = false;
    }
  }

  // hiển thị ghi âm
  public openRecording() {
    setTimeout(() => {
      this.recordingService.showRecording();
      this.tin_nhan = '';
      if (!this.recordingService.isShowRecording) {
        this.recordingService.stopRecording();
      } else {
        this.isShowBtcxBox = false;
        this.stickersService.isShowBoxSticker = false;
        this.stickersService.isShowBoxGiphy = false;
      }
    }, 500);
  }
  public getTopBoxBTCX() {
    let parent_input = document.getElementById('parent_input');
    if (parent_input.offsetHeight == 32) {
      return '-315px';
    } else if (parent_input.offsetHeight == 48) {
      return '-307px';
    } else if (parent_input.offsetHeight == 64) {
      return '-299px';
    } else if (parent_input.offsetHeight == 80) {
      return '-291px';
    } else if (parent_input.offsetHeight == 83) {
      return '-290px';
    } else {
      return '-323px';
    }
  }

  public getTopGiphy() {
    let parent_input = document.getElementById('parent_input');
    if (parent_input.offsetHeight == 32) {
      return '-306px';
    } else if (parent_input.offsetHeight == 48) {
      return '-296px';
    } else if (parent_input.offsetHeight == 64) {
      return '-286px';
    } else if (parent_input.offsetHeight == 80) {
      return '-276px';
    } else if (parent_input.offsetHeight == 83) {
      return '-276px';
    } else {
      return '-311px';
    }
  }

  public getLeftBoxBTCX() {
    if (this.messenger_footer_service.object_chat_footer != null) {
      if (this.messenger_footer_service.object_chat_footer.loai == 'nhom') {
        return '141px';
      } else if (
        this.messenger_footer_service.object_chat_footer.loai == 'don'
      ) {
        return '129px';
      }
    }
    return '141px';
  }

  public khongNhapNua(event) {
    setTimeout(() => {
      this.content_service.onInput = false;
    }, 0);
  }

  public dangNhap(event) {
    setTimeout(() => {
      this.content_service.onInput = true;
      this.content_service.updateOnInput(
        this.messenger_main_service.ma_cuoc_tro_chuyen
      );
    }, 0);
  }

  // đính kèm file
  openChooseFile() {
    const chooseFile = document.getElementById('choose-file');
    chooseFile.click();
  }
  // thêm file vào input
  changeChooseFile() {
    let chooseFile = <HTMLInputElement>document.getElementById('choose-file');
    let arrayFile = Array.from(chooseFile.files);
    for (let index = 0; index < arrayFile.length; index++) {
      // chỉ nhận file < 25mb
      if (arrayFile[index].size < 25000000) {
        // lấy ra đuôi file
        let newFile = new FileUploadWS();
        newFile.file = arrayFile[index];
        newFile.name = arrayFile[index].name;
        newFile.id = Number(new Date()) + newFile.name;
        // cắt tên file ra
        let fname = arrayFile[index].name.split('');
        // lấy ra đuôi file
        let typeFile = fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1).join('');
        // nếu đúng định dạng file
        if (
          typeFile == 'xlsx' ||
          typeFile == 'xls' ||
          typeFile == 'doc' ||
          typeFile == 'docx' ||
          typeFile == 'ppt' ||
          typeFile == 'pptx' ||
          typeFile == 'txt' ||
          typeFile == 'pdf'
        ) {
          newFile.typeFile = 'file';
          this.arrayFileUpload.push(newFile);
        } else {
          // lấy ra định dạng file
          let typeFileMedia = arrayFile[index].type
            .split('/')[0]
            .toLowerCase()
            .trim();
          // nếu đúng định dang media
          if (typeFileMedia == 'image') {
            newFile.typeFile = 'image';
            newFile.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(arrayFile[index]))
            this.arrayFileUpload.push(newFile);
          } else if (typeFileMedia == 'audio') {
            newFile.typeFile = 'audio';
            this.arrayFileUpload.push(newFile);
          } else if (typeFileMedia == 'video') {
            newFile.typeFile = 'video';
            this.arrayFileUpload.push(newFile);
            newFile.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(arrayFile[index]))
          }
        }
      }
    }
    // nếu có file thì xóa danh sách image, video
    if(this.arrayFileUpload.length > 0)
        this.arrayImageVideoUpload = []
  }
  // xóa file trong choose file 
  removeFileChooseFile(file: FileUploadWS) {
      this.arrayFileUpload.forEach((element,index) => {
          if(element.id == file.id)
              this.arrayFileUpload.splice(index,1)
      });
      // clear input để khi tải lại file vừa xóa k bị trùng
        let chooseFile = <HTMLInputElement>document.getElementById('choose-file');
        chooseFile.value = ''
  }
  
  // gửi file
  sendMessageFile() {
      let listImg = []
      let listFile = []
      if(this.tin_nhan.length > 0) {
        this.sendTinNhan(); 
      }
      // lấy ra danh sách ảnh
      this.arrayFileUpload.forEach(fileUpload => {
        if(fileUpload.typeFile == 'image')
          listImg.push(fileUpload)
        else if(fileUpload.typeFile == 'audio' || fileUpload.typeFile == 'video' || fileUpload.typeFile == 'file')
          listFile.push(fileUpload)
      });
      // nếu danh có ảnh
      if(listImg.length > 0) {
      // tạo key để thêm vào tên tránh trùng tên
        let newKey = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws')) + Number(new Date());;
        listImg.forEach(file => {
          this.content_service.saveImageluu_fileInStorage(file,this.messenger_main_service.ma_cuoc_tro_chuyen, newKey);
        });
        this.content_service.submitMessageFile(this.messenger_main_service.ma_cuoc_tro_chuyen, newKey, 'gui_hinh',this.my_name_service.myName,'')
      }
      // danh sach file
      if(listFile.length > 0) {
        listFile.forEach(file => {
          let typeFile = '';
        // tạo key để thêm vào tên tránh trùng tên
          let newKey = Number(new Date())+'';
          // luu vao firestorage
          if(file.typeFile == 'audio')
            typeFile = 'gui_ghi_am'
          else if(file.typeFile == 'video')
            typeFile = 'gui_video'
            else if(file.typeFile == 'file')
            typeFile = 'gui_file'
            // luu vao chi tiet tin nhan + danh sach file da gui
            this.content_service.saveFileluu_fileStorage(file,this.messenger_main_service.ma_cuoc_tro_chuyen, newKey, typeFile);
          
        });
      }
      this.arrayFileUpload = [];
  }

  // gửi Video hoặc ảnh
  openChooseImageOrVideo() {
    const chooseImageOrVideo = document.getElementById('choose-image-video');
    chooseImageOrVideo.click();
  }
// khi có ảnh hoặc video
  changeChooseImageOrVideo() {
    let chooseFile = <HTMLInputElement>document.getElementById('choose-image-video');
    let arrayFile = Array.from(chooseFile.files);
    for (let index = 0; index < arrayFile.length; index++) {
      // chỉ nhận file < 25mb
      if (arrayFile[index].size < 25000000) {
        // lấy ra đuôi file
        let newFile = new FileUploadWS();
        newFile.file = arrayFile[index];
        newFile.name = arrayFile[index].name;
        newFile.id = Number(new Date()) + newFile.name;
          let typeFileMedia = arrayFile[index].type
            .split('/')[0]
            .toLowerCase()
            .trim();
          // nếu đúng định dang media
          if (typeFileMedia == 'image') {
            newFile.typeFile = 'image';
            newFile.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(arrayFile[index]))
            this.arrayImageVideoUpload.push(newFile);
          } else if (typeFileMedia == 'video') {
            newFile.typeFile = 'video';
            this.arrayImageVideoUpload.push(newFile);
            newFile.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(arrayFile[index]))
          }
      }
    }
    // nếu có image,video thì xóa danh sách file
    if(this.arrayImageVideoUpload.length > 0)
      this.arrayFileUpload = []
  }

   // xóa file trong choose file 
   removeImageVideoChoose(file: FileUploadWS) {
    this.arrayImageVideoUpload.forEach((element,index) => {
        if(element.id == file.id)
            this.arrayImageVideoUpload.splice(index,1)
    });
      // clear input để khi tải lại file vừa xóa k bị trùng
      let chooseFile = <HTMLInputElement>document.getElementById('choose-image-video');
      chooseFile.value = ''
  }
  // gui anh video
  sendMessageImageVideo() {
      let listImg = []
      let listFile = []
      if(this.tin_nhan.length > 0) {
        this.sendTinNhan(); 
      }
      // lấy ra danh sách ảnh
      this.arrayImageVideoUpload.forEach(fileUpload => {
        if(fileUpload.typeFile == 'image')
          listImg.push(fileUpload)
        else if(fileUpload.typeFile == 'video')
          listFile.push(fileUpload)
      });
      // nếu danh có ảnh
      if(listImg.length > 0) {
      // tạo key để thêm vào tên tránh trùng tên
        let newKey = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws')) + Number(new Date());;
        listImg.forEach(file => {
          this.content_service.saveImageluu_fileInStorage(file,this.messenger_main_service.ma_cuoc_tro_chuyen, newKey);
        });
        this.content_service.submitMessageFile(this.messenger_main_service.ma_cuoc_tro_chuyen, newKey, 'gui_hinh',this.my_name_service.myName,'')
      }
      // danh sach file
      if(listFile.length > 0) {
        listFile.forEach(file => {
          let typeFile = 'gui_video';
          // tạo key để thêm vào tên tránh trùng tên
          let newKey = Number(new Date())+'';
          // luu vao firestorage
          // luu vao chi tiet tin nhan + danh sach file da gui
          this.content_service.saveFileluu_fileStorage(file,this.messenger_main_service.ma_cuoc_tro_chuyen, newKey, typeFile);
        });
      }
      this.arrayImageVideoUpload = [];
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileShareWS } from 'src/app/models/ws/chat-page/chat-page-file-page/file-share/file-share-ws';
import { MessengerMainWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/messenger-main-ws.service';
import { FilesShareWsService } from 'src/app/service/ws/chat-page/chat-page-file-page/files-share/files-share-ws.service';

@Component({
  selector: 'app-files-share-ws',
  templateUrl: './files-share-ws.component.html',
  styleUrls: ['./files-share-ws.component.scss']
})
export class FilesShareWsComponent implements OnInit {

  listFileShare: FileShareWS[];
  constructor(
    private route: ActivatedRoute,
    public files_share_service:FilesShareWsService,
    public messenger_main_service: MessengerMainWsService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(this.files_share_service.isOpen)
        this.getFileShare();
    });
  }
  uRLSafe(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  public open(){
    this.files_share_service.isOpen = !this.files_share_service.isOpen;
    if(this.files_share_service.isOpen)
      this.getFileShare();
  }
  sortMediaMain() {
    this.listFileShare= this.listFileShare.sort((date1, date2) => {
      var x = date1.dateSend;
      var y = date2.dateSend;
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
  public getFileShare() {
    this.files_share_service.accessfile_da_gui().child(this.messenger_main_service.ma_cuoc_tro_chuyen).on('value',(fileShare) => {
      this.listFileShare = []  
      fileShare.forEach(file => {
        if(file.val() != null){
            if(file.val().loai_tin_nhan == 'gui_file' && file.val().ton_tai == 0) {
              let newFileShare = new FileShareWS()
              newFileShare.idMessage = file.key;
              newFileShare.typeMessage = file.val().loai_tin_nhan;
              newFileShare.idAccount = file.val().ma_tai_khoan;
              newFileShare.dateSend = file.val().ngay_gui;
              newFileShare.nameFile = file.val().ten_file;
              newFileShare.url = file.val().url;
              this.listFileShare.push(newFileShare)
              this.sortMediaMain();
            }
          }
        });
    })
  }
  public clickFile(iDMess:string) {
    let fileURL = document.getElementById('file-'+iDMess);
    fileURL.click()
  }
}

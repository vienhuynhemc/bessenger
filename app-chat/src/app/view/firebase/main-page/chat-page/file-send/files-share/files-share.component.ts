import { Component, OnInit } from '@angular/core';
import { FileShare } from 'src/app/models/firebase/chat-page/chat-page-file-page/file-share/file-share';
import { MessengerMainService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/messenger-main.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesShareService } from 'src/app/service/firebase/chat-page/chat-page-file-page/files-share/files-share.service';

@Component({
  selector: 'app-files-share',
  templateUrl: './files-share.component.html',
  styleUrls: ['./files-share.component.scss']
})
export class FilesShareComponent implements OnInit {
  listFileShare: FileShare[];
  constructor(
    private route: ActivatedRoute,
    public files_share_service:FilesShareService,
    public messenger_main_service: MessengerMainService,
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
              let newFileShare = new FileShare()
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

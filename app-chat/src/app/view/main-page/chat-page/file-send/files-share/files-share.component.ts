import { FilesShareService } from './../../../../../service/chat-page/chat-page-file-page/files-share/files-share.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-share',
  templateUrl: './files-share.component.html',
  styleUrls: ['./files-share.component.scss']
})
export class FilesShareComponent implements OnInit {

  constructor(
    public files_share_service:FilesShareService
  ) { }

  ngOnInit(): void {
  }

  public open(){
    this.files_share_service.isOpen = !this.files_share_service.isOpen;
  }

}

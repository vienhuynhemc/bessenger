import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-send',
  templateUrl: './file-send.component.html',
  styleUrls: ['./file-send.component.scss']
})
export class FileSendComponent implements OnInit {
  name: string = 'William Halaand';
  career: string = 'CEO & Founded';
  avatar: string = 'assets/images/man.png';
  amountMedia: number = 1;
  amountFiles: number = 5;
  //type load
  typeZip: string = ".zip";
  typeDocx: string = ".docx";
  typeTxt: string = ".txt";
  typePdf: string = ".pdf";

  @Input() friends_list!: any[];

  @Input() selectedUser!: number;
  constructor() { }

  ngOnInit(): void {
  }

}

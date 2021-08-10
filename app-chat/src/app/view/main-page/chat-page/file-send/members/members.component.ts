import { MembersService } from './../../../../../service/chat-page/chat-page-file-page/members/members.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  // tắt mở option
  isOpenOption: boolean = false;
  constructor(
    public members_service:MembersService,
  ) { }

  ngOnInit(): void {
  }

  public open(){
    this.members_service.isOpen = !this.members_service.isOpen;
  }

  public openOption() {
    this.isOpenOption = !this.isOpenOption;
  } 
}

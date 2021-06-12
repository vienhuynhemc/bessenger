import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  constructor() { }
  openProfile :boolean = false;
  profile: any = {
    id: 1,
    img: 'assets/images/list-friends-chat-page/avt5.jpg',
    name:'Kim Mina',
  }
  ngOnInit(): void {
  }
  // mở profile khi click vào tim kiếm
  onClickOpenProfile(open:boolean) {
    if(open) {
      const chooseFile = (<HTMLInputElement>document.getElementById("input-id"));
      if (chooseFile.value.length > 0) {
        chooseFile.style.border = "#3275f7 solid 1px";
        this.openProfile = open;
      }
      else
        chooseFile.style.border = "red solid 1px";
    } else
      this.openProfile = open;

  }
}

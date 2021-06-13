import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AddFriendService } from 'src/app/service/friends-page/add-friend/add-friend.service';

@Component({
  selector: 'app-groups-chat-list',
  templateUrl: './groups-chat-list.component.html',
  styleUrls: ['./groups-chat-list.component.scss']
})
export class GroupsChatListComponent implements OnInit {

  public group_list: any[] = [
    {
    id: '1',
    link: 'assets/images/list-friends-chat-page/avt1.jpg',
    name: 'Karlyn Carabello',
    members: '10',
  
  },
  {
    id: '2',
    link: 'assets/images/list-friends-chat-page/avt2.jpg',
    name: 'Junior Sabine',
    members: '10',

  },
  {
    id: '3',
    link: 'assets/images/list-friends-chat-page/avt3.jpg',
    name: 'Melinie Sherk',
    members: '10',
   
  },
  {
    id: '4',
    link: 'assets/images/list-friends-chat-page/avt4.jpg',
    name: 'Harrison Palmatier',
    members: '10',
   
  },
  {
    id: '5',
    link: 'assets/images/list-friends-chat-page/avt5.jpg',
    name: 'Tressa Duhart',
    members: '10',
 
  },
  {
    id: '6',
    link: 'assets/images/list-friends-chat-page/avt6.jpg',
    name: 'Erick Spiva',
    members: '10',
   
  },
  {
    id: '7',
    link: 'assets/images/list-friends-chat-page/avt7.png',
    name: 'Josefina Simpson',
    members: '10',
   
  },
  {
    id: '8',
    link: 'assets/images/list-friends-chat-page/avt8.jpg',
    name: 'Yasuo Can 5',
    members: '10',
   
  }
    ,
  {
    id: '9',
    link: 'assets/images/list-friends-chat-page/avt9.jpg',
    name: 'Kaisa Pentakill',
    members: '10',
  
  },
  {
    id: '7',
    link: 'assets/images/list-friends-chat-page/avt7.png',
    name: 'Josefina Simpson',
    members: '10',
   
  },
  {
    id: '8',
    link: 'assets/images/list-friends-chat-page/avt8.jpg',
    name: 'Yasuo Can 5',
    members: '10',
   
  }
    ,
  {
    id: '9',
    link: 'assets/images/list-friends-chat-page/avt9.jpg',
    name: 'Kaisa Pentakill',
    members: '10',
  
  }
  
]

  optionClick:number = -1;
  // lưu index khi click
  indexOption:number = -1;
  xOption = -1;
  yOption = -1;
  xIcon = -1;
  yIcon = -1;

  constructor(addFriendService: AddFriendService) { }

  ngOnInit(): void {
    this.onClick = this.onClick.bind(this);
    document.addEventListener('click', this.onClick);
  }

  // lấy từ service danh sách nhóm chat
  getGroupsList() {

  }
  
  // hiển thị option, xử lý click lại chính nó
  onClickOptionGroup(index: number) {
    if (index === this.indexOption) {
      if (this.optionClick == -1)
        this.optionClick = index;
      else
        this.optionClick = -1;
    } else {
      this.optionClick = index;
      this.indexOption = index;
    }
    // lấy ra x và y của thẻ div option
    const optionGroup = (<HTMLInputElement>document.getElementById("option-group-"+index));
    const boundingGroup = optionGroup.getBoundingClientRect();
    this.xOption = boundingGroup.left;
    this.yOption = boundingGroup.top;
   // lấy ra x và y của thẻ div icon mở option
    const iconClick = (<HTMLInputElement>document.getElementById("icon-click-option-"+index));
    const boundingIcon = iconClick.getBoundingClientRect();
    this.xIcon = boundingIcon.left;
    this.yIcon = boundingIcon.top;
  }
  // xử lý khi click ngoài option thì tắt option
  public onClick(event: MouseEvent) {
      const xClick = event.clientX;
      const yClick = event.clientY;
      // nếu click x,y không nằm trong option
      if (xClick < this.xOption || xClick > this.xOption + 130 || yClick < this.yOption || yClick > this.yOption + 92) {
        // nếu click x,y không nằm trong icon mở option
        if (xClick < this.xIcon || xClick > this.xIcon + 20 || yClick < this.yIcon || yClick > this.yIcon + 20) {
            this.optionClick = -1;
        }
      }
  }
}

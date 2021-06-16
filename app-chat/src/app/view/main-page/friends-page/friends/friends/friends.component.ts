import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.onClickOutFocusOption = this.onClickOutFocusOption.bind(this);
    document.addEventListener('click', this.onClickOutFocusOption);
  }
  public friends_list: any[] = [
    {
      id: '1',
      link: 'assets/images/list-friends-chat-page/avt1.jpg',
      name: 'Karlyn Carabello',
      timer: '08:50',
      content: 'umbala alaba trap',
    },
    {
      id: '2',
      link: 'assets/images/list-friends-chat-page/avt2.jpg',
      name: 'Junior Sabine',
      timer: '08:45',
      content: 'yasuo penta kill nè',
    },
    {
      id: '3',
      link: 'assets/images/list-friends-chat-page/avt3.jpg',
      name: 'Melinie Sherk',
      timer: '08:40',
      content: 'đang bị hàng chờ 5 phút',
    },
    {
      id: '4',
      link: 'assets/images/list-friends-chat-page/avt4.jpg',
      name: 'Harrison Palmatier',
      timer: '08:30',
      content: 'troll or afk',
    },
    {
      id: '5',
      link: 'assets/images/list-friends-chat-page/avt5.jpg',
      name: 'Tressa Duhart',
      timer: '08:20',
      content: 'whatsup bro!',
    },
    {
      id: '6',
      link: 'assets/images/list-friends-chat-page/avt6.jpg',
      name: 'Erick Spiva',
      timer: '08:10',
      content: 'tao ký ngực fan 2k3 2 em',
    },
    {
      id: '7',
      link: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
      timer: '08:00',
      content: 'kẹp 3 2 em ấy đi ăn bún ...',
    },
    {
      id: '8',
      link: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
      timer: '07:55',
      content: 'umbala alaba trap',
    },
    {
      id: '9',
      link: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
      timer: '07:50',
      content: 'umbala alaba trap',
    },
  ];
  selectedIndex: number = -1;
  indexOption: number = -1;
  optionClick: number = -1;
  xOption: number = -1;
  yOption: number = -1;
  xIcon: number = -1;
  yIcon: number = -1;

  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(index: number) {
    if (this.optionClick == -1)
      if (this.selectedIndex != index) this.selectedIndex = index;
  }

  // hiển thị option, xử lý click lại chính nó
  onClickOptionGroup(index: number) {
    if (index === this.optionClick) {
      if (this.optionClick == -1) this.optionClick = index;
      else this.optionClick = -1;
    } else {
      this.optionClick = index;
    }
    // lấy ra x và y của thẻ div option
    const optionGroup = <HTMLInputElement>(
      document.getElementById('option-' + index)
    );
    const boundingGroup = optionGroup.getBoundingClientRect();
    this.xOption = boundingGroup.left;
    this.yOption = boundingGroup.top;
    // lấy ra x và y của thẻ div icon mở option
    const iconClick = <HTMLInputElement>(
      document.getElementById('icon-option-' + index)
    );
    const boundingIcon = iconClick.getBoundingClientRect();
    this.xIcon = boundingIcon.left;
    this.yIcon = boundingIcon.top;
  }

  // xử lý khi click ngoài option thì tắt option
  public onClickOutFocusOption(event: MouseEvent) {
    const xClick = event.clientX;
    const yClick = event.clientY;
    // nếu click x,y không nằm trong option
    if (
      xClick < this.xOption ||
      xClick > this.xOption + 170 ||
      yClick < this.yOption ||
      yClick > this.yOption + 100
    ) {
      // nếu click x,y không nằm trong icon mở option
      if (
        xClick < this.xIcon ||
        xClick > this.xIcon + 20 ||
        yClick < this.yIcon ||
        yClick > this.yIcon + 20
      ) {
        this.optionClick = -1;
      }
    }
  }

  // get data từ service
  
}

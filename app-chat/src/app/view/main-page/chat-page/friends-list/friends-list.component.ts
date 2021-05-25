import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {
  change_slide: number = 0;
  prev: number = -1;
  next: number = 1;
  public online_list: any[] = [{
    id: '1',
    link: 'assets/images/list-friends-chat-page/ol1.jpg',
    name: 'Tâm',

  }, {
    id: '2',
    link: 'assets/images/list-friends-chat-page/ol2.jpg',
    name: 'Lisa',
  }, {
    id: '3',
    link: 'assets/images/list-friends-chat-page/ol3.jpg',
    name: 'Jisoo',
  }, {
    id: '4',
    link: 'assets/images/list-friends-chat-page/ol4.jpg',
    name: 'Jennie',
  }]


  public friends_list: any[] = [{
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
  }
    ,
  {
    id: '9',
    link: 'assets/images/list-friends-chat-page/avt9.jpg',
    name: 'Kaisa Pentakill',
    timer: '07:50',
    content: 'umbala alaba trap',
  }]
  selectedUser: number = 0;
  // sự kiện khi click bên ngoài

  constructor() { }

  ngOnInit(): void {
  }
  // tạo chuyển động slide danh sách bạn đang onl
  changeSlide(change: number): void {
    this.change_slide = change;
  }
  // chọn vào bạn bè thì tô màu background
  onSelected(index: number): void {
    this.selectedUser = index;
    if ((index - 1) >= 0 && (index + 1) < this.friends_list.length) {
      this.prev = index - 1;
      this.next = index + 1;
    } else if ((index - 1) >= 0) {
      this.prev = index - 1;
      this.next = -1;
    } else if ((index + 1) < this.friends_list.length) {
      this.prev = -1;
      this.next = index + 1;
    }
  }

  //  Shadow top
  getStyleShadowTop(): any {
    return {
      'height': this.selectedUser * 76 + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': '0px',
      'left': '0px',
      'border-bottom-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }

  //  Shadow bottom
  getStyleShadowBottom(): any {
    return {
      'height': (this.friends_list.length - this.selectedUser - 1) * 76 + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': (this.selectedUser + 1) * 76 + 'px',
      'left': '0px',
      'border-top-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }
}

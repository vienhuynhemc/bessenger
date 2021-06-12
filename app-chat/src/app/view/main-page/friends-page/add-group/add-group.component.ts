import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  public friends_list: any[] = [
    {
      id: '1',
      link: 'assets/images/list-friends-chat-page/avt1.jpg',
      name: 'Karlyn Carabello',
    },
    {
      id: '2',
      link: 'assets/images/list-friends-chat-page/avt2.jpg',
      name: 'Junior Sabine',
    },
    {
      id: '3',
      link: 'assets/images/list-friends-chat-page/avt3.jpg',
      name: 'Melinie Sherk',
    },
    {
      id: '4',
      link: 'assets/images/list-friends-chat-page/avt4.jpg',
      name: 'Harrison Palmatier',
    },
    {
      id: '5',
      link: 'assets/images/list-friends-chat-page/avt5.jpg',
      name: 'Tressa Duhart',
    },
    {
      id: '6',
      link: 'assets/images/list-friends-chat-page/avt6.jpg',
      name: 'Erick Spiva',
    },
    {
      id: '7',
      link: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
    },
    {
      id: '8',
      link: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
    },
    {
      id: '9',
      link: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
    },
    {
      id: '7',
      link: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
    },
    {
      id: '8',
      link: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
    },
    {
      id: '9',
      link: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
    },
    {
      id: '7',
      link: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
    },
    {
      id: '8',
      link: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
    },
    {
      id: '9',
      link: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  // tick vào checkbox khi chọn 1 người bạn thêm vào group chat
  onClickCheckedFriend(index: number) {
    const idCheck = <HTMLInputElement>document.getElementById('check-' + index);
    const idChoose = <HTMLInputElement>document.getElementById('choose-' + index);
    if (idCheck.checked === true) {
      idCheck.checked = false;
      idChoose.style.display = 'none';
    } else {
      idCheck.checked = true;
      idChoose.style.display = 'block';
    }
  }

  // tạo nhóm
  onClickCreateGroup() {
    const idCheck = <HTMLInputElement>document.getElementById('ip-name-group');
    if (idCheck.value.length == 0) {
      idCheck.style.border ='red solid 1px';
    }
  }
}

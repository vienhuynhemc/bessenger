import { Component, OnInit } from '@angular/core';
import { UserOnlineService } from 'src/app/service/user-online/user-online.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

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
    // @input iduser: id khi đăng nhập từ component cha
    idUser:number;
    // @input idFriendsList truyền vào từ component cha lúc đăng nhập
    idFriendsList:number;
    // danh sách user chat
    friends_list_main : any;
    
    selectedUser: number = 1;
   
    iDGroup:number = 0;
 
  constructor() { }

  // lấy data chuyển slide
  getDataChangeSlide(count:number) {
  }
  // lấy idGroup khi list friend thay đổi
  getIDGroupFromListFriends(idGroup: number){
    this.iDGroup = idGroup;
  }
  // set friend trong list friends được chọn
  setSelectedUser(value: number): void {
    this.selectedUser = value;
  }
  setSelectedUserFirstLoad() {
    for (let index = 0; index < this.friends_list_main.length; index++) {
      this.idFriendsList[index].memberReadedMessage.forEach(e => {
        if(e == this.idUser) {
          this.selectedUser = index;
          this.iDGroup = this.idFriendsList[index].idGroup;
          return;
        }
    });
    }

  }
  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    // chọn ra tin nhắn được selected khi load trang
    // this.setSelectedUserFirstLoad();
  }

 
}

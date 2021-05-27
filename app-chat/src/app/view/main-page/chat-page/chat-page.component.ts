import { Component, OnInit } from '@angular/core';
import { UserChat } from 'src/models/user_chat';
import { map } from 'rxjs/operators';
import { UserChatService } from 'src/service/user-chat/user-chat.service';
import { UserOnlineService } from 'src/service/user-online/user-online.service';
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
  friends_list_main : any;
  online_list_1 : any;
  online_list_2 : any;
  selectedUser: number = 0;

  // khi component được tạo thì userchatservice cũng được tạo
  constructor(private userChatService:UserChatService, private userOnlineService: UserOnlineService) { }
  // lấy về danh sách bạn bè đang online
  getFriendsOnline(start: number, end:number):void {
      this.userOnlineService.getUsersOnline(start, end).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(usersOnl=> {
      
        for (let index = 0; index < usersOnl.length; index++) {
              if(index < 4)
                  // 4 user đầu lưu vào mảng_1
                this.online_list_1[index] = usersOnl[index];
              else
                // 4 user tiếp theo lưu vào mảng_2
                this.online_list_2[index - 4] = usersOnl[index];
          
        }
      });

      return this.friends_list_main;
  }
  // lấy về danh sách bạn bè nhắn tin gần đây
  getFriendsListAgo(amount: number) :void {
    this.userChatService.getUsersChatList(amount).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      this.friends_list_main = users;
    });
  
  }
  // lấy danh 2 list friend đang online mỗi list size = 4
  getFriendsListOnline() : void {

  }
  // lấy dữ liệu cho vào component
  ngOnInit(): void {
    // this.getFriendsListAgo(10);
    // this.getFriendsListOnline();
  }

  setSelectedUser(value: number): void {
    this.selectedUser = value;
  }

}

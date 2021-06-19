import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FriendsListService } from 'src/app/service/chat-page/friends-list/friends-list.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {
  change_slide: number = 0;
  prev: number = -1;
  next: number = -1;
  countPrev: number = 0;
  countNext: number = 0;
  slideStep = 4;
  start: number = 0;
  end: number = 0;
  // @input idFriendsList truyền vào từ component cha lúc đăng nhập
  idFriendsList: number;
  // truyền vào list friends chat gần đây bản DB
  friends_list_main: any;
  online_list_1: any;
  online_list_2: any;
  // @input idUser sau này truyền từ component vào để xử lý
  idUser: number;
  // danh sách id box chat
  groupIDList: any;
  // id group dc chọn
  // bản mẫu demo code cứng


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

  selectedUser: number = 1;
  startOnline: number = 0;
  endOnline: number = 7;
  // danh sách id box chat

  iDGroup: number = 0;

  constructor
    (
      private friendsListService: FriendsListService,
      private router: Router,
      private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    // selected khi load lần đầu
    this.onSelectedFilter(this.selectedUser, false, 0)
    // Lấy id thằng hiện tại
    let id = this.route.snapshot.params['id'];
    if(id == null){
      this.router.navigate(['/bessenger/tin-nhan/123'])
    }
    
   
  }

  // lấy về danh sách bạn bè đang online
  getFriendsOnline(count: number): void {
    this.start += count;
    this.end = (this.end + count) * 2;
    this.friendsListService.getUsersOnlineService(this.start, this.end, this.idFriendsList).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(usersOnl => {
      for (let index = 0; index < usersOnl.length; index++) {
        if (index < 4)
          // 4 user đầu lưu vào mảng_1
          this.online_list_1[index] = usersOnl[index];
        else
          // 4 user tiếp theo lưu vào mảng_2
          this.online_list_2[index - 4] = usersOnl[index];
      }
    });
  }
  setSelectedUserFirstLoad() {
    for (let index = 0; index < this.friends_list_main.length; index++) {
      this.idFriendsList[index].memberReadedMessage.forEach(e => {
        if (e == this.idUser) {
          this.selectedUser = index;
          this.iDGroup = this.idFriendsList[index].idGroup;
          return;
        }
      });
    }

  }
  // lấy danh sách id box chat dựa vào idUser, amount là số id muốn lấy ra
  getConversationsIdList(amount: number) {
    this.friendsListService.getConversationsIDListByIdUserService(this.idUser, amount).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      this.groupIDList = users;
    });
  }

  // tạo chuyển động slide danh sách bạn đang onl
  changeSlide(change: number): void {
    this.change_slide = change;
  }

  // bảng lấy dữ liệu từ DB có DB xóa bảng phía trên, 0 = prev | 1 = next
  changeSlide1(direction: number) {
    if (direction == 0) {
      this.countPrev++;
      this.changeSlide
    } else {
      this.countPrev--;
      this.countNext++;
    }
  }
  // set trường hợp load lần đầu 
  onSelectedFilter(index: number, check: boolean, idGorup: number) {
    // check == false là xử lý load lần đầu, check == true kiểm tra click
    if (check) {
      if (index != this.selectedUser) {
        this.onSelected(index);
        this.iDGroup = idGorup;
      }
    } else {
      this.onSelected(index);
      this.iDGroup = idGorup;
    }
  }
  // truyền idGroup qua message
  sendIdGroundToMessage(idGroup: number) {
    this.iDGroup = idGroup
  }

  // chọn vào bạn bè thì tô màu background
  onSelected(index: number): void {
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
    // Cập nhập dữ liêu tại cha
    this.setSelectedUser(index);
  }

  // kiểm tra đã đọc tin nhắn hay chưa, true = chưa đọc | false = đã đọc
  checkReaded(listIDReaded: []) {
    for (let index = 0; index < listIDReaded.length; index++)
      if (listIDReaded[index] === this.idUser)
        return false;
    return true;
  }
  // Set index selected user
  setSelectedUser(index: any) {
    this.selectedUser = index;
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
  // set style tên cho tin nhắn chưa đọc
  getStyleNameReadMessage() {
    return {
      'font-weight': 'bold',
      'color': 'black',
      'font-size': '15px'
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStyleMessageReadMessage() {
    return {
      'font-weight': 'bold',
      'color': '#3275f7',
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStylePointReadMessage() {
    return {
      'position': 'absolute',
      'width': '10px',
      'height': '10px',
      'border-radius': '50%',
      'background-color': '#3275f7',
      'right': '9px',
      'top': '46.5px',
    }
  }
}

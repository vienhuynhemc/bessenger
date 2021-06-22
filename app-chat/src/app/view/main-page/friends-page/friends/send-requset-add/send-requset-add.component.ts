import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-send-requset-add',
  templateUrl: './send-requset-add.component.html',
  styleUrls: ['./send-requset-add.component.scss']
})
export class SendRequsetAddComponent implements OnInit {

  constructor(
    private contactsService: ContactsService,
    private friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  iDUrl:any;
  valueSub: Subscription;
  public friends_list: FriendInfor[] = [
    {
      id: 1,
      img: 'assets/images/list-friends-chat-page/avt2.jpg',
      name: 'Karlyn Cara',
      mutualFriends: 3,
      date: 1,
      status: true
    },
    {
      id: 2,
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      name: 'Junior Sabine',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 3,
      img: 'assets/images/list-friends-chat-page/avt3.jpg',
      name: 'Melinie Sherk',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 4,
      img: 'assets/images/list-friends-chat-page/avt4.jpg',
      name: 'Harrison Palmatier',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 5,
      img: 'assets/images/list-friends-chat-page/avt5.jpg',
      name: 'Tressa Duhart',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 6,
      img: 'assets/images/list-friends-chat-page/avt6.jpg',
      name: 'Erick Spiva',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 7,
      img: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 8,
      img: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
      mutualFriends: 10,
      date: 1,
      status: true
    },
    {
      id: 9,
      img: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
      mutualFriends: 10,
      date: 1,
      status: true
    },
  ];
  selectedIndex: string = '';
  indexOption: number = -1;
 
  ngOnInit(): void {
    this.friendsPageService.selectedSendService();
    this.settingRouletRequestList();
  }
// setting đường dẫn
  settingRouletRequestList() {
    // lấy ra idUrl
   this.valueSub = this.route.paramMap.subscribe(params => {
     this.iDUrl = +params.get('id');
   })
   // nếu === 0 thì trả về thằng đầu tiên trong danh sách
   if(this.iDUrl == 0) {
     this.onClickSelectedFriend(this.friends_list[0])
   } else {
     // idUrl = id người dùng => tìm thằng có id == idUrl
     this.friends_list.forEach(element => {
         if(element.id == this.iDUrl) {
           this.onClickSelectedFriend(element)
         }
     });
    
   }
 } 
//  chuyển đường dẫn
 moveLinkRequest(link: string) {
  this.router.navigate(['/bessenger/ban-be/da-gui/' + link])
}

 // Khi click vào bạn bè bất kì
 onClickSelectedFriend(friend: FriendInfor) {
  if (this.selectedIndex != friend.id) {
    this.selectedIndex = friend.id;
    this.sendFriendToProfileSend(this.selectedIndex);
    this.moveLinkRequest(friend.id)
  }
  
}
// send object đén profile
sendFriendToProfileSend(id : any) {
  this.contactsService.setFriendInforService(id);
}

}

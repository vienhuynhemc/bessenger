import { Component, OnInit } from '@angular/core';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-request-add-friends',
  templateUrl: './request-add-friends.component.html',
  styleUrls: ['./request-add-friends.component.scss']
})
export class RequestAddFriendsComponent implements OnInit {

  constructor(
    private contactsService: ContactsService,
    private friendsPageService: FriendsPageService
  ) {}

  ngOnInit(): void {
    this.onClickSelectedFriend(this.friends_list[0], 0);
    this.friendsPageService.selectedRequestService();
    
  }
  
  public friends_list: FriendInfor[] = [
    {
      id: 1,
      img: 'assets/images/list-friends-chat-page/avt2.jpg',
      name: 'Karlyn Cara',
      mutualFriends: 3,
    },
    {
      id: 2,
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      name: 'Junior Sabine',
      mutualFriends: 10,
    },
    {
      id: 3,
      img: 'assets/images/list-friends-chat-page/avt3.jpg',
      name: 'Melinie Sherk',
      mutualFriends: 10,
    },
    {
      id: 4,
      img: 'assets/images/list-friends-chat-page/avt4.jpg',
      name: 'Harrison Palmatier',
      mutualFriends: 10,
    },
    {
      id: 5,
      img: 'assets/images/list-friends-chat-page/avt5.jpg',
      name: 'Tressa Duhart',
      mutualFriends: 10,
    },
    {
      id: 6,
      img: 'assets/images/list-friends-chat-page/avt6.jpg',
      name: 'Erick Spiva',
      mutualFriends: 10,
    },
    {
      id: 7,
      img: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
      mutualFriends: 10,
    },
    {
      id: 8,
      img: 'assets/images/list-friends-chat-page/avt8.jpg',
      name: 'Yasuo Can 5',
      mutualFriends: 10,
    },
    {
      id: 9,
      img: 'assets/images/list-friends-chat-page/avt9.jpg',
      name: 'Kaisa Pentakill',
      mutualFriends: 10,
    },
  ];
  selectedIndex: number = -1;
  indexOption: number = -1;
 
 
  
  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor, index: number) {
      if (this.selectedIndex != index) {
        this.selectedIndex = index;
        this.sendFriendToProfileRequest(friend);
      }
  }

 
  // send object đén profile
  sendFriendToProfileRequest(friendInfor: FriendInfor) {
      this.contactsService.setFriendInforService(friendInfor);
  }
  // get data từ service
  getListFriends() {}
}

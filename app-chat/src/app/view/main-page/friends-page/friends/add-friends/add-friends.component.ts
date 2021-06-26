import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddFriendsInfor } from 'src/app/models/friends-page/add_friends';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit {
  friendsList: any = [
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
    {
      img: 'assets/images/list-friends-chat-page/avt1.jpg',
      mutualFriends: 10,
      name: 'lolila',
    },
  ];
  valueSub: Subscription;
  iDUrl: any;
  constructor(
    public friendsPageService: FriendsPageService,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    
  ) {}

  ngOnInit(): void {
    this.friendsPageService.selectedAddFriendsService();
    this.getIDURLFriendsList()
    this.friendsPageService.addList = []
  }
  moveLink(link: string) {
    this.router.navigate(['/bessenger/ban-be/them-ban/' + link]);
  }
  // lấy ra idUrl
  getIDURLFriendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
  }

  // send object đén profile
  sendFriendToProfile(id: any) {
    this.contactsService.setFriendInforService(id);
    // loading
  }

  // click vào bất kì người nào
  onClickSelectedFriend(friend: AddFriendsInfor, iDURL: any) {
      if (friend != null && this.iDUrl != friend.id) {
        this.sendFriendToProfile(friend.id);
        this.moveLink(friend.id);
      }
  }

  
}

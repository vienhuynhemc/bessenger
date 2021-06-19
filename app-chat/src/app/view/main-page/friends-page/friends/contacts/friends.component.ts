import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  str: string
  public friends_list_2 : FriendInfor[]
  public friends_list: FriendInfor[] = [
    {
      id: 1,
      img: 'assets/images/list-friends-chat-page/avt2.jpg',
      name: 'Karlyn Carabello',
      mutualFriends: 3,
    },
    {
      id: 2,
      img: 'assets/images/list-friends-chat-page/ol3.jpg',
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
  optionClick: number = -1;
  xOption: number = -1;
  yOption: number = -1;
  xIcon: number = -1;
  yIcon: number = -1;
  valueSub: Subscription;
  constructor(
    private contactsService: ContactsService,
    private friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.onClickOutFocusOption = this.onClickOutFocusOption.bind(this);
    document.addEventListener('click', this.onClickOutFocusOption);
    this.getListFriends();
    this.onClickSelectedFriend(this.friends_list[0], 1);
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
    
  }

  getIDUrl() {
    const id = this.route.snapshot.queryParamMap.get('id')
    console.log(id)
    
  }
  ngOnDestroy() {
    
  }
  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor, index: number) {
    if (this.optionClick == -1) {
      if (this.selectedIndex != index) {
        this.selectedIndex = index;
        this.sendFriendToProfile(friend);
        this.router.navigate([index], { relativeTo: this.route});
      }
    }
    this.getIDUrl()
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
  // send object đén profile
  sendFriendToProfile(friendInfor: FriendInfor) {
    this.contactsService.setFriendInforService(friendInfor);
  }
  // get data từ service
  getListFriends() {
    this.friends_list_2 = this.contactsService.getListIDFriendsByIDUser()
    this.friends_list_2.push({id: 7,
      img: 'assets/images/list-friends-chat-page/avt7.png',
      name: 'Josefina Simpson',
      mutualFriends: 10,
    })
   
  }

}



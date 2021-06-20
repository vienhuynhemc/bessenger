import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  public friends_list_2: any[];
  public friendFrist: FriendInfor;

 
  selectedIndex: string = '';
  indexOption: number = -1;
  optionClick: number = -1;
  xOption: number = -1;
  yOption: number = -1;
  xIcon: number = -1;
  yIcon: number = -1;
  iDUrl: any;
  valueSub: Subscription;

  constructor(
    private contactsService: ContactsService,
    private friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
   
    this.onClickOutFocusOption = this.onClickOutFocusOption.bind(this);
    document.addEventListener('click', this.onClickOutFocusOption);
    this.getListFriends();
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
    this.getIDURLFriendsList();
    
    this.setFriendFirst();
    
  }


  // set link mặc đinh là bạn bè đầu tiên
  setFriendFirst() {
   
    setTimeout(() => {
      let idFriendFirst = document.getElementById('id-0');
      if (idFriendFirst === null) {
        // nếu chưa tìm được thì + 1,2s
        setTimeout(() => {
          idFriendFirst = document.getElementById('id-0');
          // idurl == null => danh sách rỗng
          if (this.iDUrl === null) {
            try {
              idFriendFirst.click();
            } catch (err) {
              this.sendFriendToProfile(this.iDUrl);
            }
          } else this.sendFriendToProfile(this.iDUrl);
        }, 1500);
      } else {
        if (this.iDUrl === null) idFriendFirst.click();
        else this.sendFriendToProfile(this.iDUrl);
      }
  
    }, 0);
  
  }

  // lấy ra idUrl
  getIDURLFriendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  moveLink(link: string) {
    this.router.navigate(['/bessenger/ban-be/lien-lac/' + link]);
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
  }

  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor, iDURL: any) {
    if (this.optionClick == -1) {
      if (friend != null && this.iDUrl != friend.id) {
        this.sendFriendToProfile(friend.id);
        this.moveLink(friend.id);
      }
    }
   
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
  sendFriendToProfile(id: any) {
    this.contactsService.setFriendInforService(id);
 
  }

  // get data từ service
  getListFriends() {
    this.contactsService.getListIDFriendsByIDUser().on('value', (data) => {
      this.friends_list_2 = [];
      data.forEach((element) => {
        if (element.val().ton_tai == 0) {
          let temp = this.contactsService.getListFriendsInforByIDFriends(
            element.key
          );
          if (temp != null) this.friends_list_2.push(temp);
        }
      });
    });
    setTimeout(() => {
      this.friendsPageService.setLoading(false)
    }, 0);
    
  }
  
}

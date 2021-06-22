import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { RequestAddFriendsService } from 'src/app/service/friends-page/request-add/request-add-friends.service';

@Component({
  selector: 'app-request-add-friends',
  templateUrl: './request-add-friends.component.html',
  styleUrls: ['./request-add-friends.component.scss']
})
export class RequestAddFriendsComponent implements OnInit {

  constructor(
    private contactsService: ContactsService,
    private friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    public requestListService: RequestAddFriendsService
  ) {}

  ngOnInit(): void {
    this.friendsPageService.selectedRequestService();
    // this.settingRouletRequestList();
  }
  iDUrl:any;
  valueSub: Subscription;
  
  selectedIndex: string = '';
  indexOption: number = -1;
 
 
//   settingRouletRequestList() {
//     // lấy ra idUrl
//    this.valueSub = this.route.paramMap.subscribe(params => {
//      this.iDUrl = params.get('id');
//    })
//    // nếu === 0 thì trả về thằng đầu tiên trong danh sách
//    if(this.iDUrl == 0) {
//      this.onClickSelectedFriend(this.friends_list[0])
//    } else {
//      // idUrl = id người dùng => tìm thằng có id == idUrl
//      this.friends_list.forEach(element => {
//          if(element.id == this.iDUrl) {
//            this.onClickSelectedFriend(element)
//          }
//      });
    
//    }
//  } 
  moveLinkRequest(link: string) {
    this.router.navigate(['/bessenger/ban-be/loi-moi/' + link])
  }
  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor) {
    if (this.selectedIndex != friend.id) {
        this.selectedIndex = friend.id;
        this.sendFriendToProfileRequest(this.selectedIndex);
        this.moveLinkRequest(friend.id)
      }
  }

 
  // send object đén profile
  sendFriendToProfileRequest(id : any) {
      this.contactsService.setFriendInforService(id);
  }
  // get data từ service
  getListFriends() {}
}

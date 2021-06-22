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
  friends_list: FriendInfor[]
  selectedIndex: string = '';
  indexOption: number = -1;
 
  ngOnInit(): void {
    this.friendsPageService.selectedSendService();
    // this.settingRouletRequestList();
  }
// setting đường dẫn
//   settingRouletRequestList() {
//     // lấy ra idUrl
//    this.valueSub = this.route.paramMap.subscribe(params => {
//      this.iDUrl = +params.get('id');
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

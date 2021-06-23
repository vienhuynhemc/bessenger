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
    public friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    public requestListService: RequestAddFriendsService
  ) {}

  ngOnInit(): void {
    this.friendsPageService.selectedRequestService();
    this.setRequestFirst();
    this.getRequestList();
   
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

  // lấy ra danh sách bạn chung
  onClickGetIDFriendMutual(id: string, listRequest: FriendInfor[]) {

  }

  // chọn người đầu tiên hiển thị trong danh sách request
  setRequestFirst() {
    setTimeout(() => {
      this.friendsPageService.setLoading(true)
    }, 0);
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.requestListService.getRequestInforByIDUser(parseIDUser).once('value', (data) => {
        // loading
        setTimeout(() => {
          this.friendsPageService.setLoading(true)
        }, 0);
        let loop = 0;
        data.forEach((element) => {
          // lấy ra danh sách bạn bè
          if (element.val().ton_tai == 0) {
            this.contactsService.getFriendByID(element.key).once('value', (data) => {
              if(loop == 0) {
                if(this.iDUrl != data.key)
                this.moveLinkRequest(data.key)
                this.sendFriendToProfileRequest(data.key);
                loop++;
              }
            })
          }
        });
      });
  } else {
    // nếu địa chỉ là /lien-lac/xxxxx
    this.sendFriendToProfileRequest(this.iDUrl);
  }
  }
  
  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {

  }

   // lấy ra idUrl
   getIDURLRequestList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  ngOnDestroy() {
    // this.valueSub.unsubscribe();
  }

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
        // loading
      setTimeout(() => {
        this.friendsPageService.setLoading(false)
      }, 0);
  }
  // get data từ service
  getRequestList() {
    let count = 0
    let friendsTempOfUser = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.requestListService.getRequestInforByIDUser(parseIDUser).on('value', (data) => {
       // lấy ra danh sách id bạn bè của id đang đăng nhập
       this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (friend_l) => {
        friendsTempOfUser = []
        friend_l.forEach(element => {
          if(element.val().ton_tai == 0)
            friendsTempOfUser.push(element.key)
        });
    })
      // loading
      setTimeout(() => {
        this.friendsPageService.setLoading(true)
      }, 0);
      this.friendsPageService.requestList = []
      data.forEach((element) => {
         // lấy ra danh sách request
        if(element.val().ton_tai == 0) {
          let temp = this.contactsService.getListFriendsInforByIDFriends(element.key)
          if(temp != null) 
            this.friendsPageService.requestList.push(temp);
        }
      })
     
      // lấy số lượng request
      this.friendsPageService.setSizeRequest(this.friendsPageService.requestList.length)
      // lấy ra bạn chung
      
    })
  }
}

import { ThrowStmt } from '@angular/compiler';
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
    this.getRequestList();
    this.friendsPageService.selectedRequestService();
    this.getIDURLRequestList()
    this.setRequestFirst();
  }
  iDUrl:any;
  valueSub: Subscription;


 


  // lấy ra danh sách bạn chung
  onClickGetIDFriendMutual(id: string, listRequest: FriendInfor[]) {

  }

  // chọn người đầu tiên hiển thị trong danh sách request
  setRequestFirst() {

    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
      let loop = 0;
      // nếu k có list request
      if(this.friendsPageService.requestList == undefined) {
        this.requestListService.getRequestInforByIDUser(parseIDUser).on('value', (data) => {
          this.friendsPageService.requestFirstList = []
          this.friendsPageService.setLoading(true)
          if(data.val() != null) {
              let temp
              data.forEach(element => {
              temp = this.requestListService.getListRequestInforByIDRequest(element.key);
              temp.dateRequest = element.val().ngay_tao
              temp.id = element.key
              if(temp != null && element.val().ton_tai == 0) {
                  this.friendsPageService.requestFirstList.push(temp)
                  // sắp xếp
                  this.friendsPageService.sortRequestFrist()
              }
              });
              // chuyển đến thằng đầu tiên
              if(this.friendsPageService.requestFirstList.length > 0) {
                this.moveLinkRequest(this.friendsPageService.requestFirstList[0].id)
                this.sendFriendToProfileRequest(this.friendsPageService.requestFirstList[0].id);
              } else {
                this.moveLinkRequest('')
                this.sendFriendToProfileRequest(null);
              }
          } else {
            this.moveLinkRequest('')
            this.sendFriendToProfileRequest(null);
          }
          this.friendsPageService.setLoading(false)
        })
       
        // nếu có list request
      }else {
          this.friendsPageService.setLoading(true)
          this.friendsPageService.requestList.forEach(element => {
            this.contactsService.getFriendByID(element.id).once('value', (data) => {
              if(loop == 0) {
                if(this.iDUrl != data.key)
                this.moveLinkRequest(data.key)
                this.sendFriendToProfileRequest(data.key);
                loop++;
              }
            })

          });
          this.friendsPageService.setLoading(false)
      }

  } else {
    // nếu địa chỉ là /lien-lac/xxxxx kiểm tra xem id có trong danh sách lời mời hay không
    this.friendsPageService.setLoading(true)
    this.sendFriendToProfileRequest(this.iDUrl)
  }
  }
  



   // lấy ra idUrl
   getIDURLRequestList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();

  }

  moveLinkRequest(link: string) {
    this.router.navigate(['/bessenger/ban-be/loi-moi/' + link])
  }
  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor, iDURL: any) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfileRequest(friend.id);
      this.moveLinkRequest(friend.id);
      
    }
  }

 
  // send object đén profile
  sendFriendToProfileRequest(id : any) {
      this.contactsService.setFriendInforService(id);
        // loading
        this.friendsPageService.setLoading(false)
     
  }

  // get data từ service
  getRequestList() {
    let count = 0
    let friendsTempOfUser = []
    this.friendsPageService.requestList = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.requestListService.getRequestInforByIDUser(parseIDUser).on('value', (data) => {
       // lấy ra danh sách id bạn bè của id đang đăng nhập
        this.friendsPageService.setLoading(true)
       if(data.val() != null) {
          this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (friend_l) => {
            friendsTempOfUser = []
            friend_l.forEach(element => {
              if(element.val().ton_tai == 0)
                friendsTempOfUser.push(element.key)
            });
        })
          // loading
          this.friendsPageService.requestList = []
          data.forEach((element) => {
            // lấy ra danh sách request
            if(element.val().ton_tai == 0) {
              let temp = this.requestListService.getListRequestInforByIDRequest(element.key)
              temp.dateRequest = element.val().ngay_tao
              if(temp != null) {
                // tìm ra danh sách bạn của id request
                this.contactsService.getListIDFriendsByIDUser(element.key).on('value',(data) => {
                    // tìm ra bạn chung với id đang đăng nhập
                    data.forEach(element => {
                      friendsTempOfUser.forEach(val => {
                          if(element.val().ton_tai == 0 && element.key == val) 
                            count++;
                      });
                    });
                    temp.mutualFriends = count;
                    count = 0
                    this.friendsPageService.sortRequestListDate();
                })
                this.friendsPageService.requestList.push(temp);
                this.friendsPageService.sortRequestListDate();
              }
            }
          })
          // lấy số lượng request
          this.friendsPageService.setSizeRequest(this.friendsPageService.requestList.length)
          // lấy ra bạn chung
        }
         // nếu danh sách rỗng thì thêm size = 0
         if(this.friendsPageService.requestList.length == 0) {
              this.friendsPageService.setSizeRequest(0)
              this.sendFriendToProfileRequest(null)
            }
        this.friendsPageService.setLoading(false)
    })
    
  }
}

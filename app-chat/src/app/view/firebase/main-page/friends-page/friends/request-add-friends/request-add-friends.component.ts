import { ThrowStmt, TmplAstTemplate } from '@angular/compiler';
import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/firebase/friends-page/request_infor';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-request-add-friends',
  templateUrl: './request-add-friends.component.html',
  styleUrls: ['./request-add-friends.component.scss']
})
export class RequestAddFriendsComponent implements OnInit, OnDestroy {

  constructor(
    private contactsService: ContactsService,
    public friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    public requestListService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService
  ) {}
  

  ngOnInit(): void {
    this.friendsPageService.selectedRequestService();
    this.getIDURLRequestList()
    this.getRequestList();
    this.setRequestFirst();
   
  }
  iDUrl:any;
  valueSub: Subscription;
  mutualRequestList: any[];
  idMutualRequest: string = '';
 
  // đóng danh sách bạn chung
  onClickExitMutual() {
    this.idMutualRequest = '';
  }
 // sắp xếp danh danh bạn chung
 sortMututalRequest() {
  this.mutualRequestList = this.mutualRequestList.sort((nameIn1, nameIn2) => {
    var x = nameIn1.getNameLast();
    var y = nameIn2.getNameLast();
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

  // lấy ra danh sách bạn chung
  onClickGetIDFriendMutual(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let listFriends = []
    this.idMutualRequest = id;
    let req
    this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (friend) => {
      listFriends = []
        friend.forEach(element => {
            if(element.val().ton_tai == 0)
              listFriends.push(element.key)
        });
        // lấy ra danh sách bạn bè của id request
        this.contactsService.getListIDFriendsByIDUser(id).on('value', (friend_in)=> {
          this.mutualRequestList = []
          friend_in.forEach(friend_i=> {
            listFriends.forEach(lfriends => {
              // kiểm tra có là bạn chung hay không
                if(friend_i.val().ton_tai == 0 && friend_i.key == lfriends) {
                    this.requestListService.getInforRequest(friend_i.key).on('value', (result) => {
                      req = new RequestInfor()
                      let checkAdd = true;
                      req.id = result.key
                      req.img = result.val().link_hinh
                      req.name = result.val().ten
                      req.sex = result.val().gioi_tinh
                      req.date = friend_i.val().ngay_tao
                      // kiểm tra có nên thêm vào dnah sách hay không
                      this.mutualRequestList.forEach(element => {
                          if(element.id == req.id)
                              checkAdd = false;
                      });
                      
                      if(checkAdd) {
                        this.mutualRequestList.push(req)
                      } else {
                        this.mutualRequestList.forEach((element,index) => {
                            if(element.id == req.id) {
                              if(element.img != req.img || element.name != req.img || element.sex != req.sex || element.date != req.date) {
                                this.mutualRequestList[index] = req
                              }
                            }
                        });
                      }
                      
                      this.sortMututalRequest()
                    })
                    // thêm vào danh sách sau đó sắp xếp theo ABCD
                }
            });
          });
        })
    })
  }
  // chọn người đầu tiên hiển thị trong danh sách request
  setRequestFirst() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
        this.requestListService.getRequestInforByIDUser(parseIDUser).once('value', (data) => {
          this.friendsPageService.requestFirstList = []
          if(data.val() != null) {
              let temp
              data.forEach(element => {
              if(element.val().ton_tai == 0) {
                temp = this.requestListService.getListRequestInforByIDRequestOneShot(element.key);
                temp.dateRequest = element.val().ngay_tao
                temp.id = element.key
                if(temp != null) {
                    this.friendsPageService.requestFirstList.push(temp)
                    // sắp xếp
                    this.friendsPageService.sortRequestFrist()
                }
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
        
        })
      

  } else {
    // nếu địa chỉ là /lien-lac/xxxxx kiểm tra xem id có trong danh sách lời mời hay không
    this.requestListService.getRequestInforByIDUser(parseIDUser).once('value', (data) => {
      let check = true
        if(data.val() != null) {
          let index = 0;
          data.forEach(element => {
              if(element.val().ton_tai == 0) {
                if(element.key == this.iDUrl){
                  this.moveLinkRequest(element.key)
                  this.sendFriendToProfileRequest(element.key)
                  check = false;
                   // scroll tới người được chọn
                   if(element.key == this.iDUrl && index > 4) {
                    const scroll = document.getElementById('scroll-content');
                    scroll.scrollTo({ top: index*23, behavior: "smooth" })
                  }
              }
              index++;
              }
          });
          if(check) 
          this.router.navigate(['/**'])
        } else 
          this.router.navigate(['/**'])
    })
  
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
  onClickSelectedFriend(friend: RequestInfor, iDURL: any) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfileRequest(friend.id);
      this.moveLinkRequest(friend.id);
      
    }
  }

 
  // send object đén profile
  sendFriendToProfileRequest(id : any) {
      this.contactsService.setFriendInforService(id);
        // loading
       
     
  }

  // get data từ service
  getRequestList() {
    let count = 0
    let friendsTempOfUser = []
    this.friendsPageService.requestList = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
   
    this.requestListService.getRequestInforByIDUser(parseIDUser).on('value', (data) => {
       // lấy ra danh sách id bạn bè của id đang đăng nhập
      
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
                    setTimeout(() => {
                      this.friendsPageService.setLoading(true)
                    }, 0);
                    
                    data.forEach(element => {
                      friendsTempOfUser.forEach(val => {
                          if(element.val().ton_tai == 0 && element.key == val) 
                            count++;
                      });
                    });
                    temp.mutualFriends = count;
                    count = 0
                    this.friendsPageService.sortRequestListDate();
                   
                    setTimeout(() => {
                      this.friendsPageService.setLoading(false)
                    }, 0);
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
           
     
    })
    
  }

  // chấp nhận kết bạn
  acceptRequest(id : string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    // Thêm vào bạn bè của user đang đăng nhập
    this.contactsService.addFriend(parseIDUser,id).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // thêm vào user gửi lời mời kết bạn
    this.contactsService.addFriend(id,parseIDUser).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    this.moveLinkRequest('')
  }

  // từ chối kết bạn
  refuseRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    this.moveLinkRequest('')
  }
}

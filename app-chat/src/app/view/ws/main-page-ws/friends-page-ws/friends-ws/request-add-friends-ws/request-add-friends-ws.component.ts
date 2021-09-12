import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestInforWS } from 'src/app/models/ws/friends-page/request_infor_ws';
import { ContactsWsService } from 'src/app/service/ws/friends-page/contacts/contacts-ws.service';
import { FriendsPageWsService } from 'src/app/service/ws/friends-page/friends-page-ws.service';
import { RequestAddFriendsWsService } from 'src/app/service/ws/friends-page/request-add/request-add-friends-ws.service';
import { SendAddFriendWsService } from 'src/app/service/ws/friends-page/send-add/send-add-friend-ws.service';

@Component({
  selector: 'app-request-add-friends-ws',
  templateUrl: './request-add-friends-ws.component.html',
  styleUrls: ['./request-add-friends-ws.component.scss']
})
export class RequestAddFriendsWsComponent implements OnInit, OnDestroy {

  constructor(
    private contactsServiceWS: ContactsWsService,
    public friendsPageServiceWS: FriendsPageWsService,
    private route: ActivatedRoute,
    private router: Router,
    public requestListServiceWS: RequestAddFriendsWsService,
    private sendsListServiceWS: SendAddFriendWsService
  ) {}
  

  ngOnInit(): void {
    this.friendsPageServiceWS.selectedRequestService();
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
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    let listFriends = []
    this.idMutualRequest = id;
    let req
    this.contactsServiceWS.getListIDFriendsByIDUser(parseIDUser).on('value', (friend) => {
      listFriends = []
        friend.forEach(element => {
            if(element.val().ton_tai == 0)
              listFriends.push(element.key)
        });
        // lấy ra danh sách bạn bè của id request
        this.contactsServiceWS.getListIDFriendsByIDUser(id).on('value', (friend_in)=> {
          this.mutualRequestList = []
          friend_in.forEach(friend_i=> {
            listFriends.forEach(lfriends => {
              // kiểm tra có là bạn chung hay không
                if(friend_i.val().ton_tai == 0 && friend_i.key == lfriends) {
                    this.requestListServiceWS.getInforRequest(friend_i.key).on('value', (result) => {
                      req = new RequestInforWS()
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
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
        this.requestListServiceWS.getRequestInforByIDUser(parseIDUser).once('value', (data) => {
          this.friendsPageServiceWS.requestFirstList = []
          if(data.val() != null) {
              let temp
              data.forEach(element => {
              if(element.val().ton_tai == 0) {
                temp = this.requestListServiceWS.getListRequestInforByIDRequestOneShot(element.key);
                temp.dateRequest = element.val().ngay_tao
                temp.id = element.key
                if(temp != null) {
                    this.friendsPageServiceWS.requestFirstList.push(temp)
                    // sắp xếp
                    this.friendsPageServiceWS.sortRequestFrist()
                }
              }
              });
              // chuyển đến thằng đầu tiên
              if(this.friendsPageServiceWS.requestFirstList.length > 0) {
                this.moveLinkRequest(this.friendsPageServiceWS.requestFirstList[0].id)
                this.sendFriendToProfileRequest(this.friendsPageServiceWS.requestFirstList[0].id);
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
    this.requestListServiceWS.getRequestInforByIDUser(parseIDUser).once('value', (data) => {
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
    this.router.navigate(['/bessenger-ws/ban-be/loi-moi/' + link])
  }
  
  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: RequestInforWS, iDURL: any) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfileRequest(friend.id);
      this.moveLinkRequest(friend.id);
      
    }
  }

 
  // send object đén profile
  sendFriendToProfileRequest(id : any) {
      this.contactsServiceWS.setFriendInforService(id);
        // loading
       
     
  }

  // get data từ service
  getRequestList() {
    let count = 0
    let friendsTempOfUser = []
    this.friendsPageServiceWS.requestList = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
   
    this.requestListServiceWS.getRequestInforByIDUser(parseIDUser).on('value', (data) => {
       // lấy ra danh sách id bạn bè của id đang đăng nhập
      
       if(data.val() != null) {
          this.contactsServiceWS.getListIDFriendsByIDUser(parseIDUser).on('value', (friend_l) => {
            friendsTempOfUser = []
            friend_l.forEach(element => {
              if(element.val().ton_tai == 0)
                friendsTempOfUser.push(element.key)
            });
        })
        
          // loading
          this.friendsPageServiceWS.requestList = []
          data.forEach((element) => {
            // lấy ra danh sách request
            if(element.val().ton_tai == 0) {
              let temp = this.requestListServiceWS.getListRequestInforByIDRequest(element.key)
              temp.dateRequest = element.val().ngay_tao
              if(temp != null) {
                // tìm ra danh sách bạn của id request
                this.contactsServiceWS.getListIDFriendsByIDUser(element.key).on('value',(data) => {
                    // tìm ra bạn chung với id đang đăng nhập
                    setTimeout(() => {
                      this.friendsPageServiceWS.setLoading(true)
                    }, 0);
                    
                    data.forEach(element => {
                      friendsTempOfUser.forEach(val => {
                          if(element.val().ton_tai == 0 && element.key == val) 
                            count++;
                      });
                    });
                    temp.mutualFriends = count;
                    count = 0
                    this.friendsPageServiceWS.sortRequestListDate();
                   
                    setTimeout(() => {
                      this.friendsPageServiceWS.setLoading(false)
                    }, 0);
                })
                this.friendsPageServiceWS.requestList.push(temp);
                this.friendsPageServiceWS.sortRequestListDate();
              }
            }
          })
          // lấy số lượng request
          this.friendsPageServiceWS.setSizeRequest(this.friendsPageServiceWS.requestList.length)
          // lấy ra bạn chung
        }
         // nếu danh sách rỗng thì thêm size = 0
         if(this.friendsPageServiceWS.requestList.length == 0) {
              this.friendsPageServiceWS.setSizeRequest(0)
              this.sendFriendToProfileRequest(null)
            }
           
     
    })
    
  }

  // chấp nhận kết bạn
  acceptRequest(id : string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListServiceWS.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    // Thêm vào bạn bè của user đang đăng nhập
    this.contactsServiceWS.addFriend(parseIDUser,id).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // thêm vào user gửi lời mời kết bạn
    this.contactsServiceWS.addFriend(id,parseIDUser).set({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    this.moveLinkRequest('')
  }

  // từ chối kết bạn
  refuseRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListServiceWS.acceptRequestService(parseIDUser, id).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListServiceWS.editSendService(parseIDUser,id).update({
      ton_tai: 1
    })
    this.moveLinkRequest('')
  }

}

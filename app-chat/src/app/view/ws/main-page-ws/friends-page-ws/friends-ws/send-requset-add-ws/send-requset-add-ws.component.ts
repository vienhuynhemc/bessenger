import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SendInforWS } from 'src/app/models/ws/friends-page/send_infor_ws';
import { ContactsWsService } from 'src/app/service/ws/friends-page/contacts/contacts-ws.service';
import { FriendsPageWsService } from 'src/app/service/ws/friends-page/friends-page-ws.service';
import { RequestAddFriendsWsService } from 'src/app/service/ws/friends-page/request-add/request-add-friends-ws.service';
import { SendAddFriendWsService } from 'src/app/service/ws/friends-page/send-add/send-add-friend-ws.service';

@Component({
  selector: 'app-send-requset-add-ws',
  templateUrl: './send-requset-add-ws.component.html',
  styleUrls: ['./send-requset-add-ws.component.scss']
})
export class SendRequsetAddWsComponent implements OnInit, OnDestroy {

  constructor(
    private contactsServiceWS: ContactsWsService,
    public friendsPageServiceWS: FriendsPageWsService,
    private route: ActivatedRoute,
    private router: Router,
    private sendListServiceWS: SendAddFriendWsService,
    private requestListServiceWS: RequestAddFriendsWsService
  ) {}
  iDUrl: any;
  valueSub: Subscription;
  mutualSendList: any[];
  idMutualSend: string = '';
  ngOnInit(): void {
    this.getSendstList();
    this.friendsPageServiceWS.selectedSendService();
    this.getIDURLSendsList()
    this.setSendFirst();
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }

  // đóng danh sách bạn chung
  onClickExitMutual() {
    this.idMutualSend = '';
  }
  // sắp xếp danh danh bạn chung
  sortMututalSends() {
    this.mutualSendList = this.mutualSendList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // lấy ra danh sách bạn chung
  onClickGetIDFriendMutual(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.mutualSendList = []
    let listFriends = []
    this.idMutualSend = id
    let temp
    // lấy ra danh sách bạn bè của user hiện tại
    this.contactsServiceWS.getListIDFriendsByIDUser(parseIDUser).on('value', (data) => {
          listFriends = []
          data.forEach(element => {
              if(element.val().ton_tai == 0) 
                listFriends.push(element.key)
          }); 
          // lấy ra danh sách bạn bè của id request đang được chọn
              this.contactsServiceWS.getListIDFriendsByIDUser(id).on('value', (request) => {
                  this.mutualSendList = []
                  // tìm kiếm bạn chung
                  request.forEach(request_sub => {
                      listFriends.forEach(element => {
                        if(request_sub.val().ton_tai == 0 && request_sub.key == element) {
                        
                          // lấy ra thông tin bạn chung
                          this.sendListServiceWS.getInforSend(request_sub.key).on('value',(data) =>{
                              console.log(this.mutualSendList)
                              temp = new SendInforWS()
                              let checkAdd = true;
                              temp.id = data.key
                              temp.name = data.val().ten
                              temp.img = data.val().link_hinh
                              temp.sex = data.val().gioi_tinh
                              temp.date = request_sub.val().ngay_tao
                               // thêm vào danh sách sau đó sắp xếp theo ABCD
                               // kiểm tra có nên thêm vào dnah sách hay không
                                this.mutualSendList.forEach(resultCheck => {
                                  if(resultCheck.id == temp.id)
                                      checkAdd = false;
                              });
                              if(checkAdd) {
                                this.mutualSendList.push(temp)
                              } else {
                                this.mutualSendList.forEach((element,index) => {
                                    if(element.id == temp.id) {
                                      if(element.img != temp.img || element.name != temp.img || element.sex != temp.sex || element.date != temp.date) {
                                        this.mutualSendList[index] = temp
                                      }
                                    }
                                });
                              }
                              this.sortMututalSends()
                          } );
                          
                        }
                      });
                  });
              })
    })
  }

  // lấy ra idUrl
  getIDURLSendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

 

  

  //  chuyển đường dẫn
  moveLinkSends(link: string) {
    this.router.navigate(['/bessenger-ws/ban-be/da-gui/' + link]);
  }

  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: SendInforWS, id: string) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfileSend(friend.id);
      this.moveLinkSends(friend.id);
      
    }
  }

  // chọn người đầu tiên hiển thị trong danh sách
  setSendFirst() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
        // lấy ra tất cả id bạn bè của người đang đăng nhập
        this.sendListServiceWS.getSendInforByIDUser(parseIDUser).once('value', (data) => {
          this.friendsPageServiceWS.sendFirstList = []
          if(data.val() != null) {
              let temp
              // lấy ra thông tin chi tiết của từng id bạn bè
              data.forEach(element => {
              if(element.val().ton_tai == 0) {
                temp = this.sendListServiceWS.getListSendInforByIDSendOneShot(element.key);
                temp.dateSend = element.val().ngay_tao
                temp.id = element.key
                if(temp != null) {
                    this.friendsPageServiceWS.sendFirstList.push(temp)
                    // sắp xếp
                    this.friendsPageServiceWS.sortSendsFrist()
                }
              }
              });
              // chuyển đến thằng đầu tiên
              if(this.friendsPageServiceWS.sendFirstList.length > 0) {
                this.moveLinkSends(this.friendsPageServiceWS.sendFirstList[0].id)
                this.sendFriendToProfileSend(this.friendsPageServiceWS.sendFirstList[0].id);
              } else {
                this.moveLinkSends('')
                this.sendFriendToProfileSend(null);
              }
          } else {
            this.moveLinkSends('')
            this.sendFriendToProfileSend(null);
          }
        
        })
      

  } else {
    // nếu địa chỉ là /lien-lac/xxxxx kiểm tra xem id có trong danh sách lời mời hay không
    this.sendListServiceWS.getSendInforByIDUser(parseIDUser).once('value', (data) => {
      let check = true
        if(data.val() != null) {
          let index = 0
          data.forEach(element => {
              if(element.val().ton_tai == 0) {
                if(element.key == this.iDUrl){
                  this.moveLinkSends(element.key)
                  this.sendFriendToProfileSend(element.key)
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

  // send object đén profile
  sendFriendToProfileSend(id: any) {
    this.contactsServiceWS.setFriendInforService(id);
  }

  // get data từ service
  getSendstList() {
    let count = 0
    let friendsTempOfUser = []
    this.friendsPageServiceWS.sendstList = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
   
    this.sendListServiceWS.getSendInforByIDUser(parseIDUser).on('value', (data) => {
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
          this.friendsPageServiceWS.sendstList = []
          data.forEach((element) => {
            // lấy ra danh sách request
            if(element.val().ton_tai == 0) {
              let temp = this.sendListServiceWS.getListSendInforByIDSend(element.key)
              temp.dateSend = element.val().ngay_tao
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
                    this.friendsPageServiceWS.sortSendListDate();
                   
                    setTimeout(() => {
                      this.friendsPageServiceWS.setLoading(false)
                    }, 0);
                })
                this.friendsPageServiceWS.sendstList.push(temp);
                this.friendsPageServiceWS.sortSendListDate();
              }
            }
          })
          // lấy số lượng request
          this.friendsPageServiceWS.setSizeSends(this.friendsPageServiceWS.sendstList.length)
          // lấy ra bạn chung
        }
         // nếu danh sách rỗng thì thêm size = 0
         if(this.friendsPageServiceWS.sendstList.length == 0) {
              this.friendsPageServiceWS.setSizeSends(0)
              this.sendFriendToProfileSend(null)
            }
           
     
    })
    
  }
  undoSendRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListServiceWS.acceptRequestService(id, parseIDUser).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendListServiceWS.editSendService(id,parseIDUser).update({
      ton_tai: 1
    })
    // trở về đường dẫn mặc định không có id
    this.moveLinkSends('')
  }
}

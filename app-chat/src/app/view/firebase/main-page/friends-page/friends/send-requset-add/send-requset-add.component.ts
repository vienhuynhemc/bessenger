import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/firebase/friends-page/request_infor';
import { SendInfor } from 'src/app/models/firebase/friends-page/send_infor';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-send-requset-add',
  templateUrl: './send-requset-add.component.html',
  styleUrls: ['./send-requset-add.component.scss'],
})
export class SendRequsetAddComponent implements OnInit, OnDestroy {
  constructor(
    private contactsService: ContactsService,
    public friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    private sendListService: SendAddFriendService,
    private requestListService: RequestAddFriendsService
  ) {}
  iDUrl: any;
  valueSub: Subscription;
  mutualSendList: any[];
  idMutualSend: string = '';
  ngOnInit(): void {
    this.getSendstList();
    this.friendsPageService.selectedSendService();
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
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.mutualSendList = []
    let listFriends = []
    this.idMutualSend = id
    let temp
    // lấy ra danh sách bạn bè của user hiện tại
    this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (data) => {
          listFriends = []
          data.forEach(element => {
              if(element.val().ton_tai == 0) 
                listFriends.push(element.key)
          }); 
          // lấy ra danh sách bạn bè của id request đang được chọn
              this.contactsService.getListIDFriendsByIDUser(id).on('value', (request) => {
                  this.mutualSendList = []
                  // tìm kiếm bạn chung
                  request.forEach(request_sub => {
                      listFriends.forEach(element => {
                        if(request_sub.val().ton_tai == 0 && request_sub.key == element) {
                        
                          // lấy ra thông tin bạn chung
                          this.sendListService.getInforSend(request_sub.key).on('value',(data) =>{
                              console.log(this.mutualSendList)
                              temp = new SendInfor()
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
    this.router.navigate(['/bessenger/ban-be/da-gui/' + link]);
  }

  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: SendInfor, id: string) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfileSend(friend.id);
      this.moveLinkSends(friend.id);
      
    }
  }

  // chọn người đầu tiên hiển thị trong danh sách
  setSendFirst() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
        // lấy ra tất cả id bạn bè của người đang đăng nhập
        this.sendListService.getSendInforByIDUser(parseIDUser).once('value', (data) => {
          this.friendsPageService.sendFirstList = []
          if(data.val() != null) {
              let temp
              // lấy ra thông tin chi tiết của từng id bạn bè
              data.forEach(element => {
              if(element.val().ton_tai == 0) {
                temp = this.sendListService.getListSendInforByIDSendOneShot(element.key);
                temp.dateSend = element.val().ngay_tao
                temp.id = element.key
                if(temp != null) {
                    this.friendsPageService.sendFirstList.push(temp)
                    // sắp xếp
                    this.friendsPageService.sortSendsFrist()
                }
              }
              });
              // chuyển đến thằng đầu tiên
              if(this.friendsPageService.sendFirstList.length > 0) {
                this.moveLinkSends(this.friendsPageService.sendFirstList[0].id)
                this.sendFriendToProfileSend(this.friendsPageService.sendFirstList[0].id);
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
    this.sendListService.getSendInforByIDUser(parseIDUser).once('value', (data) => {
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
    this.contactsService.setFriendInforService(id);
  }

  // get data từ service
  getSendstList() {
    let count = 0
    let friendsTempOfUser = []
    this.friendsPageService.sendstList = []
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
   
    this.sendListService.getSendInforByIDUser(parseIDUser).on('value', (data) => {
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
          this.friendsPageService.sendstList = []
          data.forEach((element) => {
            // lấy ra danh sách request
            if(element.val().ton_tai == 0) {
              let temp = this.sendListService.getListSendInforByIDSend(element.key)
              temp.dateSend = element.val().ngay_tao
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
                    this.friendsPageService.sortSendListDate();
                   
                    setTimeout(() => {
                      this.friendsPageService.setLoading(false)
                    }, 0);
                })
                this.friendsPageService.sendstList.push(temp);
                this.friendsPageService.sortSendListDate();
              }
            }
          })
          // lấy số lượng request
          this.friendsPageService.setSizeSends(this.friendsPageService.sendstList.length)
          // lấy ra bạn chung
        }
         // nếu danh sách rỗng thì thêm size = 0
         if(this.friendsPageService.sendstList.length == 0) {
              this.friendsPageService.setSizeSends(0)
              this.sendFriendToProfileSend(null)
            }
           
     
    })
    
  }
  undoSendRequest(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(id, parseIDUser).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendListService.editSendService(id,parseIDUser).update({
      ton_tai: 1
    })
    // trở về đường dẫn mặc định không có id
    this.moveLinkSends('')
  }
}

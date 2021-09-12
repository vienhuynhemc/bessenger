import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';
import { AddFriendsInfor } from 'src/app/models/firebase/friends-page/add_friends';
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { AddFriendsService } from 'src/app/service/firebase/friends-page/add-friends/add-friends.service';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit, OnDestroy {
  
  valueSub: Subscription;
  iDUrl: any;
  mutualAddList: any[];
  idMutualAdd: string = '';
 
  constructor(
    public friendsPageService: FriendsPageService,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    public addListService: AddFriendsService,
    private requestListService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService
  ) {}

  ngOnInit(): void {
    this.friendsPageService.selectedAddFriendsService();
    this.getIDURLFriendsList()
    this.getListAdd()
  }
  onClickExitMutual() {
    this.idMutualAdd = '';
  }
  sortMututalAdd() {
    this.mutualAddList = this.mutualAddList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  onClickGetIDFriendMutual(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let listFriends = []
    this.idMutualAdd= id;
    let req
    // lấy ra danh sách bạn bè id đang đăng nhập
    this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (friend) => {
      listFriends = []
        friend.forEach(element => {
            if(element.val().ton_tai == 0)
              listFriends.push(element.key)
        });
        // lấy ra danh sách bạn bè của id ad
        this.contactsService.getListIDFriendsByIDUser(id).on('value', (friend_in)=> {
          this.mutualAddList = []
          friend_in.forEach(friend_i=> {
            listFriends.forEach(lfriends => {
              // kiểm tra có là bạn chung hay không
                if(friend_i.val().ton_tai == 0 && friend_i.key == lfriends) {
                    this.requestListService.getInforRequest(friend_i.key).on('value', (result) => {
                      req = new AddFriendsInfor()
                      let checkAdd = true;
                      req.id = result.key
                      req.img = result.val().link_hinh
                      req.name = result.val().ten
                      req.sex = result.val().gioi_tinh
                      req.date = friend_i.val().ngay_tao
                      // kiểm tra có nên thêm vào dnah sách hay không
                      this.mutualAddList.forEach(element => {
                          if(element.id == req.id)
                              checkAdd = false;
                      });
                      if(checkAdd) {
                        this.mutualAddList.push(req)
                      } else {
                        this.mutualAddList.forEach((element,index) => {
                            if(element.id == req.id) {
                              if(element.img != req.img || element.name != req.img || element.sex != req.sex || element.date != req.date) {
                                this.mutualAddList[index] = req
                              }
                            }
                        });
                      }
                      this.sortMututalAdd()
                    })
                    // thêm vào danh sách sau đó sắp xếp theo ABCD
                }
            });
          });
        })
    })
  }
  moveLink(link: string) {
    this.router.navigate(['/bessenger/ban-be/them-ban/' + link]);
  }
  // lấy ra idUrl
  getIDURLFriendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
    
  }

  // send object đén profile
  sendFriendToProfile(id: any, addOrUndor: any) {
    this.contactsService.setAddInforService(id,addOrUndor);
    // loading
  }

  // click vào bất kì người nào
  onClickSelectedFriend(friend: AddFriendsInfor, iDURL: any) {
      if (friend != null && this.iDUrl != friend.id) {
        this.sendFriendToProfile(friend.id, friend.checkAddOrUndo);
        this.moveLink(friend.id);
      }
  }
  // lấy ra danh sách tìm kiếm
  getListAdd() {
    if(this.iDUrl != null) {
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // danh sách bạn bè của id đang đăng nhập
    this.addListService.getListFriendsByIDUser(parseIDUser).on('value', (friends) => {
      setTimeout(() => {
        this.friendsPageService.setLoading(true)
      }, 0);
      let checkScroll = false;
      let listFriendsMe = [];
      if(friends.val() != null) {
        let check = true;
        // lấy ra danh sách bạn bè
        friends.forEach(f_item => {
            if(f_item.val().ton_tai == 0)
              listFriendsMe.push(f_item.key)
        });
        // lấy ra danh sách người dùng đang đăng nhập nhận yêu cầu
        this.addListService.getRequestInforByIDUser(parseIDUser).once('value', (request) => {
          let listMeRequest = []
          if(request.val() != null) {
            request.forEach(r_item => {
              if(r_item.val().ton_tai == 0) 
                listMeRequest.push(r_item.key)
            });
          }
          
          // lấy ra danh sách người dùng đang đăng nhập đã gửi yeu cầu
         
          this.addListService.getSendInforByIDUser(parseIDUser).once('value', (sends) => {
            let listMeSends = []
            if(sends.val() != null) {
              sends.forEach(s_item => {
                if(s_item.val().ton_tai == 0) 
                  listMeSends.push(s_item.key)
              });
            }
            // lấy ra danh sách tài khoản trên server
            this.addListService.getAllAccount().on('value', (account) => {
                if(account.val() != null && check) {
                  this.friendsPageService.addList = []
                  account.forEach(a_item => {
                    // nếu id != id người đang đăng nhập và có ký tự nhập vào, không nằm trong danh sách bạn bè, không nằm trong danh sách gửi yêu cầu, không nằm trong danh sách nhận yêu cầu
                    // nếu id trùng với id trên url + load lần đầu
                    if(a_item.key != parseIDUser 
                        && a_item.key == this.iDUrl 
                        && !listMeSends.includes(a_item.key)
                        && !listMeRequest.includes(a_item.key)
                        && !listFriendsMe.includes(a_item.key)
                        ) {
                          let accountTemp = new AddFriendsInfor();
                          accountTemp.id = a_item.key;
                          accountTemp.name = a_item.val().ten;
                          accountTemp.img = a_item.val().link_hinh;
                          accountTemp.checkAddOrUndo = 'them';
                          if(this.friendsPageService.saveAddList.length != 0) {
                            this.friendsPageService.saveAddList.forEach(element => {
                                if(element.id == accountTemp.id)
                                  accountTemp.checkAddOrUndo = element.checkAddOrUndo;
                            });
                            
                          } else {
                            accountTemp.checkAddOrUndo = 'them';
                          }
                          this.friendsPageService.addList.push(accountTemp)
                         } else {
                          //  nếu không phải load lần đầu và id không trùng với idurl
                            if(this.friendsPageService.saveAddList.length >0) {
                              this.friendsPageService.saveAddList.forEach(element => {
                                  let accountTemp = new AddFriendsInfor();
                                  accountTemp.id = a_item.key;
                                  accountTemp.name = a_item.val().ten;
                                  accountTemp.img = a_item.val().link_hinh;
                                  accountTemp.checkAddOrUndo = 'them';
                                  if(element.id == a_item.key) {
                                    this.friendsPageService.saveAddList.forEach(element => {
                                          if(element.id == accountTemp.id)
                                            accountTemp.checkAddOrUndo = element.checkAddOrUndo;
                                    });
                                    this.friendsPageService.addList.push(accountTemp)
                                  } else if(a_item.key != parseIDUser 
                                      && !listMeSends.includes(a_item.key)
                                      && !listMeRequest.includes(a_item.key)
                                      && !listFriendsMe.includes(a_item.key)
                                      && a_item.val().ten.toLowerCase().trim().includes(this.friendsPageService.searchVal)
                                    ) {
                                      this.friendsPageService.addList.push(accountTemp)
                                  }
                              });
                              // nếu load lần đầu thì thêm người dùng có id trùng id trên url + những người có tên trùng với ô search
                            } else {
                              if(this.friendsPageService.searchVal != '') {
                                if(a_item.key != parseIDUser 
                                  && a_item.val().ten.toLowerCase().trim().includes(this.friendsPageService.searchVal)
                                  && !listMeSends.includes(a_item.key)
                                  && !listMeRequest.includes(a_item.key)
                                  && !listFriendsMe.includes(a_item.key)) {
                                    let accountTemp = new AddFriendsInfor();
                                    accountTemp.id = a_item.key;
                                    accountTemp.name = a_item.val().ten;
                                    accountTemp.img = a_item.val().link_hinh;
                                    accountTemp.checkAddOrUndo = 'them';
                                    this.friendsPageService.addList.push(accountTemp)
                                  }
                              }
                            }
                      }
                   
                  });
                  // duyệt qua danh sách từng thằng trong danh sách tìm kiếm
                  this.friendsPageService.addList.forEach(AddFriends => {
                  // tìm ra danh sách bạn bè của từng thằng đó
                      this.addListService.getListFriendsByIDUser(AddFriends.id).on('value', (Add_item) => {
                        let countMutual = 0;
                        // nếu thằng đó có bạn bè
                        if(Add_item.val() != null) {
                          // duyệt qua danh sách bạn bè
                          Add_item.forEach(f_of_Add => {
                            // duyệt qua danh sách bạn bè của thằng đang đăng nhập
                              listFriendsMe.forEach(friends_me => {
                                  if(f_of_Add.key == friends_me && f_of_Add.val().ton_tai == 0) {
                                    countMutual++;
                                  }
                              });
                          });
                          if(countMutual != 0) {
                            AddFriends.mutualFriends = countMutual;
                          }
                        }
                      })
                  });
                 
                  if(check) {
                    if(this.friendsPageService.addList.length > 0) {
                      this.friendsPageService.setSizeAdd(this.friendsPageService.addList.length);
                      // nếu vừa load lại trang mới mà có id thì chuyển id sang profile
                      if(this.friendsPageService.searchVal == '') {
                      this.contactsService.setAddInforService(
                       this.friendsPageService.addList[0].id,
                        this.friendsPageService.addList[0].checkAddOrUndo
                      );
                    }
                      check = false
                    } else {
                      
                      this.router.navigate(['/**']);
                      check = false
                    }
                  }
                }
            })
          })
        })
      }
      setTimeout(() => {
        this.friendsPageService.setLoading(false)
      }, 0);
    })
    } else {
      setTimeout(() => {
        this.friendsPageService.setLoading(true)
      }, 0);
      this.contactsService.setAddInforService(null,null);
      this.friendsPageService.saveAddList = []
      this.friendsPageService.addList = []
      this.friendsPageService.setSizeAdd(0);
      this.friendsPageService.searchVal = '';
      setTimeout(() => {
        this.friendsPageService.setLoading(false)
      }, 0);
    }
  }
  
  // thêm bạn
  onClickAddFriends(item: AddFriendsInfor, index: number) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.friendsPageService.addList[index].checkAddOrUndo = 'thu_hoi';
      let checkAdd = false;
    // cập nhật danh sách lưu đã thêm
      this.friendsPageService.saveAddList.forEach((element) => {
        if (element.id == item.id) {
          element.checkAddOrUndo = this.friendsPageService.addList[index].checkAddOrUndo;
          checkAdd = true;
        }
      });
      if(!checkAdd){
        this.friendsPageService.saveAddList.push({
          id: item.id,
          checkAddOrUndo: this.friendsPageService.addList[index].checkAddOrUndo,
        });
      }
       // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0

    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id,parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0
    })
    // thêm bạn nhưng không chuyển trang profile
    if(this.iDUrl == item.id) {
      this.contactsService.setAddInforService(
            item.id,
            item.checkAddOrUndo
      );
    }
    
    
  }

  // thu hồi yêu cầu kết bạn
  onClickUndoAddFriends(item: AddFriendsInfor, index: number) {
    this.friendsPageService.addList[index].checkAddOrUndo = 'them';
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // cập nhật danh sách lưu đã thêm
    let checkAdd = false;
      this.friendsPageService.saveAddList.forEach((element) => {
        if (element.id == item.id) {
          element.checkAddOrUndo = this.friendsPageService.addList[index].checkAddOrUndo;
          checkAdd = true;
        }
      });
      if(!checkAdd){
        this.friendsPageService.saveAddList.push({
          id: item.id,
          checkAddOrUndo: this.friendsPageService.addList[index].checkAddOrUndo,
        });
      }
          // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ton_tai: 1
    })
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id,parseIDUser).update({
      ton_tai: 1
    })
    // hủy thêm bạn nhưng không chuyển trang profile
      if(this.iDUrl == item.id) {
        this.contactsService.setAddInforService(
              item.id,
              item.checkAddOrUndo
        );
      }
   
    
     
    
}
}

import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterContentInit, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked , AfterContentChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { Subscription } from 'rxjs';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { RequestAddFriendsService } from 'src/app/service/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/friends-page/send-add/send-add-friend.service';

import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit, OnDestroy, AfterViewChecked  {
  friendsPageDefautl: number;
  private valueFromChildSubscription: Subscription;
  idFriendFrist: any;
 
  constructor(
    private main_page_service: MainPageService,
    private route: ActivatedRoute,
    private router: Router,
    public friendsPageService: FriendsPageService,
    private cdr: ChangeDetectorRef,
    public contactsService: ContactsService,
    public requestListService: RequestAddFriendsService,
    public sendsListService: SendAddFriendService
  ) {}
  ngAfterViewChecked(): void {
    
    this.cdr.detectChanges()
  }

  
  
  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectFriendsPage();
    }, 0);
    this.getSelectedFriendsPage();
    
  }
  
  // get về trạng thái page
  getSelectedFriendsPage() {
    this.valueFromChildSubscription = this.friendsPageService.friendsDefault.subscribe(friendsDefault => 
      {this.friendsPageDefautl = friendsDefault,
      this.onClickMenu(this.friendsPageDefautl);
      });
    
  }
 

  // click menu ban be, loi moi, da gui
  onClickMenu(index: number) {
    const friends = document.getElementById('btn-friends');
   
    const request = document.getElementById('btn-request');
    const send = document.getElementById('btn-send');
    const iconFriends = document.getElementById('icon_f');
    const iconRequest = document.getElementById('icon_r');
    const iconSend = document.getElementById('icon_s');
    if (index === 0) {
      friends.style.cssText = 'background-color: #3275f7;color: white;';
      iconFriends.style.color = 'white';

      request.style.cssText = 'background-color: white;color: black;';
      iconRequest.style.color = 'rgb(136, 133, 133)';

      send.style.cssText = 'background-color: white;color: black;';
      iconSend.style.color = 'rgb(136, 133, 133)';
    } else if (index === 1) {
      friends.style.cssText = 'background-color: white;color: black;';
      iconFriends.style.color = 'rgb(136, 133, 133)';

      request.style.cssText = 'background-color: #3275f7;color: white;';
      iconRequest.style.color = 'white';

      send.style.cssText = 'background-color: white; color: black;';
      iconSend.style.color = 'rgb(136, 133, 133)';
    } else {
      friends.style.cssText = 'background-color: white; color: black;';
      iconFriends.style.color = 'rgb(136, 133, 133)';

      request.style.cssText = 'background-color: white; color: black;';
      iconRequest.style.color = 'rgb(136, 133, 133)';

      send.style.cssText = 'background-color: #3275f7; color: white;';
      iconSend.style.color = 'white';
    }
  }
  
 

 // chuyển trang
  moveToFriends(): void {
      if(this.friendsPageDefautl != 0) {
        this.router.navigate(['lien-lac/'], { relativeTo: this.route});
        this.friendsPageService.selectedFriendsPageDefaultSerivce();
        this.contactsService.setFriendInforService(null);
      }
  }
  moveToRequest(): void {
    if(this.friendsPageDefautl != 1) {
      this.router.navigate(['loi-moi/'], { relativeTo: this.route});
      this.friendsPageService.selectedRequestService()
      this.contactsService.setFriendInforService(null);
    }
  
  }
  moveToSend(): void {
    if(this.friendsPageDefautl != 2) {
      this.router.navigate(['da-gui/'], { relativeTo: this.route});
      this.friendsPageService.selectedSendService()
      this.contactsService.setFriendInforService(null);
    }
  }

  // xoa ban be

   // không xóa 
   onClickNonAcceptUnFriend() {
    this.friendsPageService.setIDUnFriend('');
    this.friendsPageService.setNameUnFriend('');
  }

  sendFriendToProfile(id: any) {
    this.contactsService.setFriendInforService(id);
  }
  // chấp nhận xóa kết bạn
  onClickAcceptUnFriend() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.contactsService.unFriendByIDUser(this.friendsPageService.getIDUnFriend(), parseIDUser).update({
      ton_tai: 1
    })
    this.contactsService.unFriendByIDUser(parseIDUser, this.friendsPageService.getIDUnFriend()).update({
      ton_tai: 1
    })
    this.router.navigate(['/bessenger/ban-be/lien-lac/']);
    this.sendFriendToProfile(null);
    this.friendsPageService.setIDUnFriend('');
    this.friendsPageService.setNameUnFriend('');
}

  // tìm kiếm bạn bè
  searchFriends(searchValue: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.friendsPageService.friendsList = [];
    this.contactsService
      .getListIDFriendsByIDUser(parseIDUser)
      .on('value', (data) => {
        // loading
       
        this.friendsPageService.friendsList = [];
        
        if (data.val() != null) {
          data.forEach((element) => {
           
            // lấy ra danh sách bạn bè
            if (element.val().ton_tai == 0) {
              let temp = this.contactsService.getListFriendsInforByIDFriends(
                element.key
              );

              if (temp != null && temp.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) {
                this.friendsPageService.friendsList.push(temp);
              }
            }
          });

          // lấy số lượng bạn bè
          this.friendsPageService.setSizeFriends(
            this.friendsPageService.friendsList.length
          );
          // lấy ra bạn chung của mỗi người
          //  duyệt qua từng mã tài khoản bạn bè

          data.forEach((element) => {
            let count = 0;
            // lấy ra danh sách bạn bè của mỗi mã tài khoản bạn bè
            this.contactsService
              .getListIDFriendsByIDUser(element.key)
              .on('value', (data_friends) => {
                // sort theo tên
                setTimeout(() => {
                  this.friendsPageService.setLoading(true)
                }, 0);
                this.friendsPageService.sortFriendsListNameABC();
                if (data_friends.val() != null) {
                  // kiểm tra có bao nhiêu bạn chung
                  data_friends.forEach((element_f) => {
                    this.friendsPageService.friendsList.forEach((element) => {
                      if (
                        element_f.val().ton_tai == 0 &&
                        element_f.key != parseIDUser &&
                        element_f.key == element.id
                      ) {
                        count++;
                      }
                    });
                  });
                  // thêm bạn chung vào bạn bè
                  this.friendsPageService.friendsList.forEach((element) => {
                    if (element.id == data_friends.key)
                      element.mutualFriends = count;
                  });
                  count = 0;
                }
                setTimeout(() => {
                  this.friendsPageService.setLoading(false)
                }, 0);
              });
          });
        }
        // nếu danh sách rỗng thì thêm size = 0
        if (this.friendsPageService.friendsList.length == 0) {
          this.friendsPageService.setSizeFriends(0);
        }
       
      });
  }

  // tìm kiếm danh sách lời mời kết bạn
  searchRequest(searchValue: string) {
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
     
      this.friendsPageService.requestList = []
      data.forEach((element) => {
         // lấy ra danh sách request
        if(element.val().ton_tai == 0) {
          let temp = this.requestListService.getListRequestInforByIDRequest(element.key)
          temp.dateRequest = element.val().ngay_tao
          if(temp != null && temp.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) {
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
      
    })
  }

  // tìm kiếm danh sách lời mời kết bạn
  searchSends(searchValue: string) {
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
      this.friendsPageService.sendstList = []
      data.forEach((element) => {
         // lấy ra danh sách request
        if(element.val().ton_tai == 0) {
          let temp = this.sendsListService.getListSendInforByIDSend(element.key)
          temp.dateSend = element.val().ngay_tao
          if(temp != null && temp.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) {
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
                this.friendsPageService.sortSendListDate();
            })
            this.friendsPageService.sendstList.push(temp);
             this.friendsPageService.sortSendListDate();
          }
        }
      })
      // lấy số lượng request
      this.friendsPageService.setSizeRequest(this.friendsPageService.requestList.length)
      // lấy ra bạn chung
      
    })
  }
}

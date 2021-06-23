import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterContentInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { Subscription } from 'rxjs';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit, OnDestroy  {
  friendsPageDefautl: number;
  private valueFromChildSubscription: Subscription;
  idFriendFrist: any;
 
  constructor(
    private main_page_service: MainPageService,
    private route: ActivatedRoute,
    private router: Router,
    public friendsPageService: FriendsPageService,
    private cdr: ChangeDetectorRef,
    public contactsService: ContactsService
  ) {}

  
  
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

  ngAfterViewChecked(){
   this.cdr.detectChanges();
  
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
    }
  }
  moveToRequest(): void {
    if(this.friendsPageDefautl != 1) {
      this.router.navigate(['loi-moi/'], { relativeTo: this.route});
      this.friendsPageService.selectedRequestService()
    }
   
  
  }
  moveToSend(): void {
    if(this.friendsPageDefautl != 2) {
    this.router.navigate(['da-gui/0'], { relativeTo: this.route});
    this.friendsPageService.selectedSendService()
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
      this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (data) => {
        this.friendsPageService.friendsList = [];
        // mảng tạm thời lưu tất cả bạn bè để tìm ra bạn chung
        let friendsListTemp = [];
        data.forEach((element) => {
          // lấy ra danh sách bạn bè
          if (element.val().ton_tai == 0) {
            let temp = this.contactsService.getListFriendsInforByIDFriends(
              element.key
            );
            // lưu tất cả bạn bè vào mảng tạm
              if(temp != null ) friendsListTemp.push(temp)
              // bạn bè tìm được nếu có cùng kí tự với kí tự trong ô
              if (temp != null && temp.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) this.friendsPageService.friendsList.push(temp);
          }
        });
        // lấy số lượng bạn bè
        this.friendsPageService.setSizeFriends(this.friendsPageService.friendsList.length)
        // lấy ra bạn chung của mỗi người
        //  duyệt qua từng mã tài khoản bạn bè
        data.forEach(element => {
            let count = 0;
            // lấy ra danh sách bạn bè của mỗi mã tài khoản bạn bè
            this.contactsService.getListIDFriendsByIDUser(element.key).on('value', (data_friends) => {
              if(data_friends.val() != null) {
                // kiểm tra có bao nhiêu bạn chung
                data_friends.forEach(element_f => {
                  // duyệt qua mảng tạm để có đủ bạn chung
                  friendsListTemp.forEach(element => {
                    if(element_f.val().ton_tai == 0 && element_f.key != parseIDUser && element_f.key == element.id) {
                      count++;
                    }
                  })
                });
                // thêm bạn chung vào bạn bè
                this.friendsPageService.friendsList.forEach(element => {
                    if(element.id == data_friends.key)
                      element.mutualFriends = count;
                });
                count = 0;
              }
            })
        })
      });
  
}
}

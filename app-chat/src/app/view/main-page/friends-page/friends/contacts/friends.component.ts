import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/friends-page/profile-friend/profile-friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  public friendFrist: FriendInfor;
  // danh sách bạn bè chung
  mutualFriendsList: any [];
  indexOption: number = -1;
  optionClick: number = -1;
  xOption: number = -1;
  yOption: number = -1;
  xIcon: number = -1;
  yIcon: number = -1;
  iDUrl: any;
  valueSub: Subscription;
  idMutualFriend: string = '';
  constructor(
    public contactsService: ContactsService,
    public friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    private profileFriendService: ProfileFriendService
  ) {}
  ngOnInit(): void {
    this.onClickOutFocusOption = this.onClickOutFocusOption.bind(this);
    document.addEventListener('click', this.onClickOutFocusOption);
    this.getListFriends();
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
    this.getIDURLFriendsList();
    this.setFriendFirst();
    
  }
  // Lấy ra danh sách bạn chung
  onClickGetIDFriendMutual(id: string, listFriendsUser: FriendInfor[]) {
    this.idMutualFriend = id;
    this.mutualFriendsList = [];
    // id user hiện tại
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // tìm ra danh sách bạn bè của id bạn bè vừa nhận vào
    this.contactsService.getListIDFriendsByIDUser(this.idMutualFriend).on('value', (data) => {
        this.mutualFriendsList = []
        data.forEach(element => {
          // id bạn bè != id đang đăng nhập
            if(element.key != parseIDUser && element.val().ton_tai == 0) {
              // duyệt qua danh sách bạn bè của id đang đăng nhập
              listFriendsUser.forEach(itemF => {
                // nếu trùng với id bạn bè của bạn vừa lấy ra
                if(itemF.id == element.key) {
                  this.mutualFriendsList.push(this.contactsService.getListFriendsInforByIDFriends(element.key))
                }
              });
            }
        });
       
    })
  }
  onClickExitMutual() {
    this.idMutualFriend = '';
  }
  // lấy ra người muốn hủy kết bạn
  onClickUnFriend(id: string, name: string) {
    this.friendsPageService.setIDUnFriend(id)
    this.friendsPageService.setNameUnFriend(name);
    this.optionClick = -1;
  
  }
  // selected bạn bè đầu tiên trong danh sách
  setFriendFirst() {
    setTimeout(() => {
      this.friendsPageService.setLoading(true)
    }, 0);

    // nếu địa chỉ là /lien-lac
    if(this.iDUrl == null) {
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.contactsService.getListIDFriendsByIDUser(parseIDUser).once('value', (data) => {
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
                this.moveLink(data.key)
                this.sendFriendToProfile(data.key);
                loop++;
              }
            })
          }
        });
      });
  } else {
   
    // nếu địa chỉ là /lien-lac/xxxxx
    this.sendFriendToProfile(this.iDUrl);
  }
  }
  
   // chuyển đến trang tin nhắn
   onClickMessage(id: string) {
    let countCheck = 0;
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.profileFriendService.getConversation().once('value', (data) => {
      data.forEach(element_x => {
          if(countCheck != -1) {
            element_x.forEach(element => {
                if(element.key == parseIDUser || element.key == id)
                  countCheck++;
            });
            if(countCheck == 2) {
              this.profileFriendService.getKindConversation(element_x.key).once('value',(data) => {
                  if(data.val().loai_cuoc_tro_truyen == 'don') {
                    this.router.navigate(['/bessenger/tin-nhan/' + element_x.key]);
                    countCheck = -1;
                  }
              })
            } else 
            countCheck = 0;
        }
      });
    })
  }

  // lấy ra idUrl
  getIDURLFriendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  moveLink(link: string) {
    this.router.navigate(['/bessenger/ban-be/lien-lac/' + link]);
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
  }

  // Khi click vào bạn bè bất kì
  onClickSelectedFriend(friend: FriendInfor, iDURL: any) {
    if (this.optionClick == -1) {
      if (friend != null && this.iDUrl != friend.id) {
        this.sendFriendToProfile(friend.id);
        this.moveLink(friend.id);
        
      }
    }
   
  }

  // hiển thị option, xử lý click lại chính nó
  onClickOptionGroup(index: number) {
    if (index === this.optionClick) {
      if (this.optionClick == -1) this.optionClick = index;
      else this.optionClick = -1;
    } else {
      this.optionClick = index;
    }
    // lấy ra x và y của thẻ div option
    const optionGroup = <HTMLInputElement>(
      document.getElementById('option-' + index)
    );
    const boundingGroup = optionGroup.getBoundingClientRect();
    this.xOption = boundingGroup.left;
    this.yOption = boundingGroup.top;
    // lấy ra x và y của thẻ div icon mở option
    const iconClick = <HTMLInputElement>(
      document.getElementById('icon-option-' + index)
    );
    const boundingIcon = iconClick.getBoundingClientRect();
    this.xIcon = boundingIcon.left;
    this.yIcon = boundingIcon.top;
  }

  // xử lý khi click ngoài option thì tắt option
  public onClickOutFocusOption(event: MouseEvent) {
    const xClick = event.clientX;
    const yClick = event.clientY;
    // nếu click x,y không nằm trong option
    if (
      xClick < this.xOption ||
      xClick > this.xOption + 170 ||
      yClick < this.yOption ||
      yClick > this.yOption + 100
    ) {
      // nếu click x,y không nằm trong icon mở option
      if (
        xClick < this.xIcon ||
        xClick > this.xIcon + 20 ||
        yClick < this.yIcon ||
        yClick > this.yIcon + 20
      ) {
        this.optionClick = -1;
      }
    }
  }

  // send object đén profile
  sendFriendToProfile(id: any) {
    this.contactsService.setFriendInforService(id);
     // loading
    setTimeout(() => {
      this.friendsPageService.setLoading(false)
    }, 0);
  }

  // get data từ service
  getListFriends() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.contactsService.getListIDFriendsByIDUser(parseIDUser).on('value', (data) => {
      // loading
      setTimeout(() => {
        this.friendsPageService.setLoading(true)
      }, 0);
      this.friendsPageService.friendsList = [];
      data.forEach((element) => {
        // lấy ra danh sách bạn bè
        if (element.val().ton_tai == 0) {
          let temp = this.contactsService.getListFriendsInforByIDFriends(
            element.key
          );
          if (temp != null) { 
          this.friendsPageService.friendsList.push(temp);
         
        }
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
                this.friendsPageService.friendsList.forEach(element => {
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
 // loading
    setTimeout(() => {
      this.friendsPageService.setLoading(false)
    }, 0);
  }
  
}

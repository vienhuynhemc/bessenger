import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
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
import { FriendInfor } from 'src/app/models/firebase/friends-page/friend_Infor';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { ProfileFriendService } from 'src/app/service/firebase/friends-page/profile-friend/profile-friend.service';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  public friendFrist: FriendInfor;
  // danh sách bạn bè chung
  mutualFriendsList: any[];
  indexOption: number = -1;
  optionClick: number = -1;
  xOption: number = -1;
  yOption: number = -1;
  xIcon: number = -1;
  yIcon: number = -1;
  iDUrl: any;
  statusMe: string = 'tat';
  valueSub: Subscription;
  idMutualFriend: string = '';
  constructor(
    public contactsService: ContactsService,
    public friendsPageService: FriendsPageService,
    private route: ActivatedRoute,
    private router: Router,
    private profileFriendService: ProfileFriendService,
    private settingsSerivce: SettingsServiceService
  ) {}
  ngOnInit(): void {
    this.onClickOutFocusOption = this.onClickOutFocusOption.bind(this);
    document.addEventListener('click', this.onClickOutFocusOption);
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
    this.getIDURLFriendsList();
    this.getSettingsMe()
    this.getListFriends();
    this.setFriendFirst();
  }
  // sắp xếp danh danh bạn chung
  sortMututalFriends() {
    this.mutualFriendsList = this.mutualFriendsList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  // Lấy ra danh sách bạn chung

  onClickGetIDFriendMutual(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let listFriends = [];
    this.idMutualFriend = id;
    let temp;
    this.contactsService
      .getListIDFriendsByIDUser(parseIDUser)
      .on('value', (friend) => {
        listFriends = [];
        friend.forEach((element) => {
          if (element.val().ton_tai == 0) listFriends.push(element.key);
        });
        // lấy ra danh sách bạn bè của id request
        this.contactsService
          .getListIDFriendsByIDUser(id)
          .on('value', (friend_in) => {
            this.mutualFriendsList = [];
            friend_in.forEach((friend_i) => {
              listFriends.forEach((lfriends) => {
                // kiểm tra có là bạn chung hay không
                if (
                  friend_i.val().ton_tai == 0 &&
                  friend_i.key != parseIDUser &&
                  friend_i.key == lfriends
                ) {
                  this.contactsService
                    .getFriendByID(friend_i.key)
                    .on('value', (result) => {
                      temp = new FriendInfor();
                      let checkAdd = true;
                      temp.id = result.key;
                      temp.name = result.val().ten;
                      temp.img = result.val().link_hinh;
                      temp.sex = result.val().gioi_tinh;
                      temp.date = friend_i.val().ngay_tao;
                      this.mutualFriendsList.forEach(element => {
                        if(element.id == temp.id)
                            checkAdd = false;
                    });
                    if(checkAdd) {
                      this.mutualFriendsList.push(temp)
                    } else {
                      this.mutualFriendsList.forEach((element,index) => {
                          if(element.id == temp.id) {
                            if(element.img != temp.img || element.name != temp.img || element.sex != temp.sex || element.date != temp.date) {
                              this.mutualFriendsList[index] = temp
                            }
                          }
                      });
                    }
                     // thêm vào danh sách sau đó sắp xếp theo ABCD
                      this.sortMututalFriends();
                    });
                }
              });
            });
          });
      });
  }

  onClickExitMutual() {
    this.idMutualFriend = '';
  }
  // lấy ra người muốn hủy kết bạn
  onClickUnFriend(id: string, name: string) {
    this.friendsPageService.setIDUnFriend(id);
    this.friendsPageService.setNameUnFriend(name);
    this.optionClick = -1;
  }
  // selected bạn bè đầu tiên trong danh sách
  setFriendFirst() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // nếu địa chỉ là /lien-lac
    this.friendsPageService.friendFirstList = [];
    let friendsListTemp = [];
    if (this.iDUrl == null) {
      // lấy ra danh sách id bạn bè để làm điều kiện chọn bạn bè đầu tiên
      this.contactsService.getListIDFriendsByIDUser(parseIDUser).once(
        'value',
        (data) => {
          data.forEach((element) => {
            if (element.val() != null && element.val().ton_tai == 0)
              friendsListTemp.push(element.key);
          });
        // lấy ra danh sách id bạn bè để lấy ra thông tin cá nhân mỗi ng
        this.contactsService
          .getListIDFriendsByIDUser(parseIDUser)
          .once('value', (data) => {
            this.friendsPageService.friendFirstList = [];
            let count = 0;
            if (data.val() != null) {
              data.forEach((element) => {
                if (element.val().ton_tai == 0) {
                  // lấy ra thông tin cá nhân
                  this.contactsService
                    .getFriendByID(element.key)
                    .once('value', (result) => {
                      count++;
                      let temp = new FriendInfor();
                      temp.id = result.key;
                      temp.img = result.val().link_hinh;
                      temp.name = result.val().ten;
                      temp.sex = result.val().gioi_tinh;
                      temp.date = result.val().ngay_tao;
                      temp.lastOnline = 0;
                      if (temp != null) {
                        this.friendsPageService.friendFirstList.push(temp);
                        // sắp xếp
                      }
                      // lặp qua đủ các bạn bè thì chọn bạn bè đầu tiên
                      if (count == friendsListTemp.length) {
                        this.friendsPageService.sortFriendsFirstListNameABC();
                        // chuyển đến thằng đầu tiên
                        if (
                          this.friendsPageService.friendFirstList.length > 0
                        ) {
                          this.moveLink(
                            this.friendsPageService.friendFirstList[0].id
                          );
                          this.sendFriendToProfile(
                            this.friendsPageService.friendFirstList[0].id
                          );
                        } else {
                          this.moveLink('');
                          this.sendFriendToProfile(null);
                        }
                      }
                    });
                }
              });
            } else {
              this.moveLink('');
              this.sendFriendToProfile(null);
            }
          })
        });
    } else {
      // nếu địa chỉ là /lien-lac/xxxxx kiểm tra có trong danh sách bạn bè hay nếu không có
      this.contactsService
        .getListIDFriendsByIDUser(parseIDUser)
        .once('value', (data) => {
          let check = true;
          if (data.val() != null) {
            data.forEach((element,index) => {
              if (element.val().ton_tai == 0) {
                if (element.key == this.iDUrl) {
                  this.moveLink(element.key);
                  this.sendFriendToProfile(element.key);
                  check = false;
                  // scroll tới người được chọn
                  if(element.key == this.iDUrl && index > 4) {
                    const scroll = document.getElementById('scroll-content');
                    scroll.scrollTo({ top: index*23, behavior: "smooth" })
                  }
                }
              }
            });
            if (check) this.router.navigate(['/**']);
          } else {
            this.router.navigate(['/**']);
          }
        });
    }
  }

  // chuyển đến trang tin nhắn
  onClickMessage(id: string) {
    let countCheck = 0;
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.profileFriendService.getConversation().once('value', (data) => {
      data.forEach((element_x) => {
        if (countCheck != -1) {
          element_x.forEach((element) => {
            if (element.key == parseIDUser || element.key == id) countCheck++;
          });
        
          if (countCheck == 2) {
            this.profileFriendService
              .getKindConversation(element_x.key)
              .once('value', (data) => {
                if (data.val().loai_cuoc_tro_truyen == 'don') {
                  this.router.navigate([
                    '/bessenger/tin-nhan/' + element_x.key,
                  ]);
                  countCheck = -1;
                }
              });
          } else countCheck = 0;
        }
      });
    });
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
    if(this.valueSub != undefined)
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
  }

  // get data từ service
  getListFriends() {
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

              if (temp != null) {
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
                  this.friendsPageService.setLoading(true);
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
                  this.friendsPageService.setLoading(false);
                }, 0);
              });
          });
        }
        // nếu danh sách rỗng thì thêm size = 0
        if (this.friendsPageService.friendsList.length == 0) {
          this.friendsPageService.setSizeFriends(0);
          this.sendFriendToProfile(null);
        }
      });
  }
  
  getSettingsMe() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.settingsSerivce.accessSettings(parseIDUser).on('value', set => {
      this.statusMe = set.val().trang_thai_hoat_dong;
    })
  }
}

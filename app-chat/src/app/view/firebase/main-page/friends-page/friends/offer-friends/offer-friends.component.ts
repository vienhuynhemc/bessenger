import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferFriendsInfor } from 'src/app/models/firebase/friends-page/offer_friends';
import { ContactsService } from 'src/app/service/firebase/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/firebase/friends-page/friends-page.service';
import { OfferFriendsService } from 'src/app/service/firebase/friends-page/offer-friends/offer-friends.service';
import { RequestAddFriendsService } from 'src/app/service/firebase/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/firebase/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-offer-friends',
  templateUrl: './offer-friends.component.html',
  styleUrls: ['./offer-friends.component.scss'],
})
export class OfferFriendsComponent implements OnInit {
  valueSub: Subscription;
  iDUrl: any;
  mutualOfferList: any[];
  idMutualOffer: string = '';
  // mặc định lấy ra 20
  sizeGetData = 20;
  constructor(
    public friendsPageService: FriendsPageService,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private requestListService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService,
    private offerListService: OfferFriendsService
  ) {}

  ngOnInit(): void {
    this.friendsPageService.selectedOffersFriendsService();
    this.getIDURLFriendsList();
    // nếu k có id thì reset lại tất cả
    if(this.iDUrl == null) {
      this.friendsPageService.saveOfferList = []
      this.friendsPageService.offerList = []
      this.friendsPageService.setSizeOffer(0)
    }
    this.getDataOfferFriends(this.sizeGetData);
  }

  moveLink(link: string) {
    this.router.navigate(['/bessenger/ban-be/de-xuat/' + link]);
  }
  // lấy ra idUrl
  getIDURLFriendsList() {
    this.valueSub = this.route.paramMap.subscribe((params) => {
      this.iDUrl = params.get('id');
    });
  }

  onClickSelectedFriend(friend: OfferFriendsInfor, iDURL: any) {
    if (friend != null && this.iDUrl != friend.id) {
      this.sendFriendToProfile(friend.id, friend.checkAddOrUndo);
      this.moveLink(friend.id);
    }
  }

  sendFriendToProfile(id: any, addOrUndor: any) {
    this.contactsService.setOfferInforService(id, addOrUndor);
    // loading
  }

  sortMututalOffer() {
    this.mutualOfferList = this.mutualOfferList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  // tắt bạn chung
  onClickExitMutual() {
    this.idMutualOffer = '';
  }
  // lấy danh sách bạn chung
  onClickGetIDFriendMutual(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let listFriends = [];
    this.idMutualOffer = id;
    let req;
    // lấy ra danh sách bạn bè id đang đăng nhập
    this.contactsService
      .getListIDFriendsByIDUser(parseIDUser)
      .on('value', (friend) => {
        listFriends = [];
        friend.forEach((element) => {
          if (element.val().ton_tai == 0) listFriends.push(element.key);
        });
        // lấy ra danh sách bạn bè của id ad
        this.contactsService
          .getListIDFriendsByIDUser(id)
          .on('value', (friend_in) => {
            this.mutualOfferList = [];
            friend_in.forEach((friend_i) => {
              listFriends.forEach((lfriends) => {
                // kiểm tra có là bạn chung hay không
                if (friend_i.val().ton_tai == 0 && friend_i.key == lfriends) {
                  this.requestListService
                    .getInforRequest(friend_i.key)
                    .on('value', (result) => {
                      req = new OfferFriendsInfor();
                      let checkAdd = true;
                      req.id = result.key;
                      req.img = result.val().link_hinh;
                      req.name = result.val().ten;
                      req.sex = result.val().gioi_tinh;
                      req.date = friend_i.val().ngay_tao;
                      // kiểm tra có nên thêm vào dnah sách hay không
                      this.mutualOfferList.forEach((element) => {
                        if (element.id == req.id) checkAdd = false;
                      });
                      if (checkAdd) {
                        this.mutualOfferList.push(req);
                      } else {
                        this.mutualOfferList.forEach((element, index) => {
                          if (element.id == req.id) {
                            if (
                              element.img != req.img ||
                              element.name != req.img ||
                              element.sex != req.sex ||
                              element.date != req.date
                            ) {
                              this.mutualOfferList[index] = req;
                            }
                          }
                        });
                      }
                      this.sortMututalOffer();
                    });
                  // thêm vào danh sách sau đó sắp xếp theo ABCD
                }
              });
            });
          });
      });
  }

  // lấy dữ liệu
  getDataOfferFriends(sizeGet: number) {
    //  nếu link không có id
    let check = false;
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    // danh sách bạn bè của id đang đăng nhập
    this.offerListService
      .getListFriendsByIDUser(parseIDUser)
      .on('value', (friends) => {
        setTimeout(() => {
          this.friendsPageService.setLoading(true);
        }, 0);
        let checkScroll = false;
        let listFriendsMe = [];
        // kiểm tra scroll

          // lấy ra danh sách bạn bè
          friends.forEach((f_item) => {
            if (f_item.val().ton_tai == 0) listFriendsMe.push(f_item.key);
          });

          // lấy ra danh sách người dùng đang đăng nhập nhận yêu cầu
          this.offerListService
            .getRequestInforByIDUser(parseIDUser)
            .once('value', (request) => {
              let listMeRequest = [];
              if (request.val() != null) {
                request.forEach((r_item) => {
                  if (r_item.val().ton_tai == 0) listMeRequest.push(r_item.key);
                });
              }

              // lấy ra danh sách người dùng đang đăng nhập đã gửi yeu cầu
              this.offerListService
                .getSendInforByIDUser(parseIDUser)
                .once('value', (sends) => {
                  let listMeSends = [];
                  if (sends.val() != null) {
                    sends.forEach((s_item) => {
                      if (s_item.val().ton_tai == 0)
                        listMeSends.push(s_item.key);
                    });
                  }

                  // lấy ra danh sách tài khoản trên server
                  this.offerListService
                    .getAllAccount()
                    .on('value', (account) => {
                      if (account.val() != null) {
                        this.friendsPageService.offerList = [];
                        let offerFriendsTemp = [];
                        account.forEach((a_item) => {
                          // nếu id != id người đang đăng nhập và có ký tự nhập vào, không nằm trong danh sách bạn bè, không nằm trong danh sách gửi yêu cầu, không nằm trong danh sách nhận yêu cầu
                          if (
                            a_item.key != parseIDUser &&
                            !listFriendsMe.includes(a_item.key) &&
                            !listMeRequest.includes(a_item.key) &&
                            !listMeSends.includes(a_item.key)
                          ) {
                            let accountTemp = new OfferFriendsInfor();
                            accountTemp.id = a_item.key;
                            accountTemp.name = a_item.val().ten;
                            accountTemp.img = a_item.val().link_hinh;
                            accountTemp.checkAddOrUndo = 'them';

                            if (
                              this.friendsPageService.saveOfferList.length != 0
                            ) {
                              this.friendsPageService.saveOfferList.forEach(
                                (element) => {
                                  if (element.id == accountTemp.id)
                                    accountTemp.checkAddOrUndo =
                                      element.checkAddOrUndo;
                                }
                              );
                            } else {
                              accountTemp.checkAddOrUndo = 'them';
                            }
                            offerFriendsTemp.push(accountTemp);
                          } else {
                            // xét xem có nằm trong danh sách vừa kết bạn không để k bị 404
                            if (
                              this.friendsPageService.saveOfferList.length > 0
                            ) {
                              this.friendsPageService.saveOfferList.forEach(
                                (element) => {
                                  if (element.id == a_item.key) {
                                    let accountTemp = new OfferFriendsInfor();
                                    accountTemp.id = a_item.key;
                                    accountTemp.name = a_item.val().ten;
                                    accountTemp.img = a_item.val().link_hinh;
                                    accountTemp.checkAddOrUndo = 'them';
                                    this.friendsPageService.saveOfferList.forEach(
                                      (element) => {
                                        if (element.id == accountTemp.id)
                                          accountTemp.checkAddOrUndo =
                                            element.checkAddOrUndo;
                                      }
                                    );
                                    offerFriendsTemp.push(accountTemp);
                                  }
                                }
                              );
                            }
                          }
                        });

                        // duyệt qua danh sách từng thằng trong danh sách tìm kiếm nếu có phần tử
                        if (offerFriendsTemp.length > 0) {
                          let checkIDURL = 0;
                          offerFriendsTemp.forEach((AddFriends) => {
                            // tìm ra danh sách bạn bè của từng thằng đó
                            this.offerListService
                              .getListFriendsByIDUser(AddFriends.id)
                              .on('value', (Add_item) => {
                                let countMutual = 0;
                                // nếu thằng đó có bạn bè
                                if (Add_item.val() != null) {
                                  // duyệt qua danh sách bạn bè
                                  Add_item.forEach((f_of_Add) => {
                                    // duyệt qua danh sách bạn bè của thằng đang đăng nhập
                                    listFriendsMe.forEach((friends_me) => {
                                      if (
                                        f_of_Add.key == friends_me &&
                                        f_of_Add.val().ton_tai == 0
                                      ) {
                                        countMutual++;
                                      }
                                    });
                                  });
                                  if (countMutual != 0) {
                                    AddFriends.mutualFriends = countMutual;
                                  }
                                }
                              });
                          });
                          // nếu danh xuất đề xuất lớn hơn hoặc bằng 6
                          if (offerFriendsTemp.length >= sizeGet) {
                            for (let index = 0; index < sizeGet; index++) {
                              if (
                                !this.friendsPageService.offerList.includes(
                                  offerFriendsTemp[index]
                                )
                              )
                                this.friendsPageService.offerList.push(
                                  offerFriendsTemp[index]
                                );
                            }
                            // kiểm tra đường dẫn, nếu đã có id thì kiểm tra id có trong danh sách đề xuất hay k
                            if (this.iDUrl != null) {
                              let checkEmpty = false;
                              // nếu danh sách đề xuất đã tồn tại id trùng với id trong url
                              this.friendsPageService.offerList.forEach(
                                (element) => {
                                  if (element.id == this.iDUrl) {
                                    checkEmpty = true;
                                    checkIDURL = 1;
                                    if (!check) {
                                      this.sendFriendToProfile(
                                        element.id,
                                        element.checkAddOrUndo
                                      );
                                    }
                                  }
                                }
                              );
                              // nếu danh sách đề xuất không tồn tại id trùng với id trong url
                              if (!checkEmpty) {
                                // duyệt qua danh sách tạm để tìm bổ sung
                                offerFriendsTemp.forEach((element) => {
                                  if (element.id == this.iDUrl) {
                                    this.friendsPageService.offerList.push(
                                      element
                                    );
                                    checkEmpty = true;
                                    checkIDURL = 1;
                                    if (!check) {
                                      this.sendFriendToProfile(
                                        element.id,
                                        element.checkAddOrUndo
                                      );
                                    }
                                  }
                                });
                              }
                            } else {
                              checkIDURL = 2;
                            }
                          } else {
                            offerFriendsTemp.forEach((element) => {
                              if (
                                !this.friendsPageService.offerList.includes(
                                  element
                                )
                              )
                                this.friendsPageService.offerList.push(element);
                            });
                            // kiểm tra đường dẫn, nếu đã có id thì kiểm tra id có trong danh sách đề xuất hay k
                            if (this.iDUrl != null) {
                              let checkEmpty = false;
                              // nếu danh sách đề xuất đã tồn tại id trùng với id trong url
                              this.friendsPageService.offerList.forEach(
                                (element) => {
                                  if (element.id == this.iDUrl) {
                                    checkEmpty = true;
                                    checkIDURL = 1;
                                    if (!check) {
                                      this.sendFriendToProfile(
                                        element.id,
                                        element.checkAddOrUndo
                                      );
                                    }
                                  }
                                }
                              );
                              // nếu danh sách đề xuất không tồn tại id trùng với id trong url
                              if (!checkEmpty) {
                                // duyệt qua danh sách tạm để tìm bổ sung
                                offerFriendsTemp.forEach((element) => {
                                  if (element.id == this.iDUrl) {
                                    this.friendsPageService.offerList.push(
                                      element
                                    );
                                    checkIDURL = 1;
                                    if (!check) {
                                      this.sendFriendToProfile(
                                        element.id,
                                        element.checkAddOrUndo
                                      );
                                    }
                                  }
                                });
                              }
                            } else {
                              checkIDURL = 2;
                            }
                          }
                          this.friendsPageService.sortMutualFriendsOffer();
                          // scroll lớn hơn 5 thì dùng scroll
                          if (
                            this.friendsPageService.offerList.length > 5 &&
                            this.iDUrl != null &&
                            !checkScroll
                          ) {
                            this.friendsPageService.offerList.forEach(
                              (element, index) => {
                                if (element.id == this.iDUrl && index > 4) {
                                  const scroll =
                                    document.getElementById('scroll-content');
                                  scroll.scrollTo({
                                    top: index * 23,
                                    behavior: 'smooth',
                                  });
                                  // kiểm tra sợ bị lặp scroll nhiều lần
                                  if (scroll.scrollTop >= index * 20)
                                    checkScroll = true;
                                }
                              }
                            );
                          }
                          this.friendsPageService.setSizeOffer(
                            this.friendsPageService.offerList.length
                          );

                          // !check là load 1 lần tránh 404
                          if (!check) {
                            if (checkIDURL == 0) {
                              this.router.navigate(['/**']);
                            } else if (checkIDURL == 1) {
                              this.moveLink(this.iDUrl);
                            } else {
                              this.router.navigate([
                                '/bessenger/ban-be/de-xuat',
                              ]);
                              this.sendFriendToProfile(null, null);
                              this.friendsPageService.saveOfferList = [];
                            }
                            check = true;
                          }
                        } else {
                          this.friendsPageService.setSizeOffer(0);
                          if (!check) {
                            this.router.navigate(['/bessenger/ban-be/de-xuat']);
                            this.sendFriendToProfile(null, null);
                            this.friendsPageService.saveOfferList = [];
                            check = true;
                          }
                        }
                      }
                    });
                });
            });
        setTimeout(() => {
          this.friendsPageService.setLoading(false);
        }, 0);
      });
  }

  // thêm bạn
  onClickAddFriends(item: OfferFriendsInfor, index: number) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.friendsPageService.offerList[index].checkAddOrUndo = 'thu_hoi';
    let checkAdd = false;
    this.friendsPageService.saveOfferList.forEach((element) => {
      if (element.id == item.id) {
        element.checkAddOrUndo = this.friendsPageService.offerList[index].checkAddOrUndo;
        checkAdd = true;
      }
    });
    if (!checkAdd) {
      this.friendsPageService.saveOfferList.push({
        id: item.id,
        checkAddOrUndo: this.friendsPageService.offerList[index].checkAddOrUndo,
      });
    }
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id, parseIDUser).update({
      ngay_tao: Number(new Date()),
      ton_tai: 0,
    });

    // thêm bạn nhưng không chuyển trang profile
    if (this.iDUrl == item.id) {
      this.contactsService.setOfferInforService(item.id, item.checkAddOrUndo);
    }
  }

  // thu hồi yêu cầu kết bạn
  onClickUndoAddFriends(item: OfferFriendsInfor, index: number) {
    this.friendsPageService.offerList[index].checkAddOrUndo = 'them';
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let checkAdd = false;
    this.friendsPageService.saveOfferList.forEach((element) => {
      if (element.id == item.id) {
        element.checkAddOrUndo = this.friendsPageService.offerList[index].checkAddOrUndo;
        checkAdd = true;
      }
    });
    if(!checkAdd){
      this.friendsPageService.saveOfferList.push({
        id: item.id,
        checkAddOrUndo: this.friendsPageService.offerList[index].checkAddOrUndo,
      });
    }
    // cập nhật bảng yêu cầu kết bạn
    this.requestListService.acceptRequestService(item.id, parseIDUser).update({
      ton_tai: 1,
    });
    // cập nhật bảng đã gửi
    this.sendsListService.editSendService(item.id, parseIDUser).update({
      ton_tai: 1,
    });
    // hủy thêm bạn nhưng không chuyển trang profile
    if (this.iDUrl == item.id) {
      this.contactsService.setOfferInforService(item.id, item.checkAddOrUndo);
    }
  }
}

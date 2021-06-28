import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferFriendsInfor } from 'src/app/models/friends-page/offer_friends';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { OfferFriendsService } from 'src/app/service/friends-page/offer-friends/offer-friends.service';
import { RequestAddFriendsService } from 'src/app/service/friends-page/request-add/request-add-friends.service';
import { SendAddFriendService } from 'src/app/service/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-offer-friends',
  templateUrl: './offer-friends.component.html',
  styleUrls: ['./offer-friends.component.scss']
})
export class OfferFriendsComponent implements OnInit {
  
  valueSub: Subscription;
  iDUrl: any;
  mutualOfferList: any[];
  idMutualOffer: string = '';
  // mặc định lấy ra 6
  sizeGetData = 6;
  constructor(
    public friendsPageService: FriendsPageService,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private requestListService: RequestAddFriendsService,
    private sendsListService: SendAddFriendService,
    private offerListService: OfferFriendsService
    ) { }

  ngOnInit(): void {
    this.friendsPageService.selectedOffersFriendsService();
    this.getDataOfferFriends(1)
  }
 onClickSelectedFriend(friend: OfferFriendsInfor, iDURL: any) {

 }
 onClickUndoAddFriends(item: OfferFriendsInfor, index: number) {}

 onClickAddFriends(item: OfferFriendsInfor, index: number) {}

 onClickGetIDFriendMutual(id: string) {}
 sortMututalAdd() {
  this.mutualOfferList = this.mutualOfferList.sort((nameIn1, nameIn2) => {
    var x = nameIn1.getNameLast();
    var y = nameIn2.getNameLast();
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
// lấy dữ liệu
 getDataOfferFriends(sizeGet: number) {
  //  nếu link không có id
  if(this.iDUrl == null) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    
    // danh sách bạn bè của id đang đăng nhập
    this.offerListService.getListFriendsByIDUser(parseIDUser).on('value', (friends) => {
      let listFriendsMe = [];
      if(friends.val() != null) {
        // lấy ra danh sách bạn bè
        friends.forEach(f_item => {
            if(f_item.val().ton_tai == 0)
              listFriendsMe.push(f_item.key)
        });

        // lấy ra danh sách người dùng đang đăng nhập nhận yêu cầu
        this.offerListService.getRequestInforByIDUser(parseIDUser).once('value', (request) => {
          let listMeRequest = []
          if(request.val() != null) {
            request.forEach(r_item => {
              if(r_item.val().ton_tai == 0) 
                listMeRequest.push(r_item.key)
            });
          }

          // lấy ra danh sách người dùng đang đăng nhập đã gửi yeu cầu
          this.offerListService.getSendInforByIDUser(parseIDUser).once('value', (sends) => {
            let listMeSends = []
            if(sends.val() != null) {
              sends.forEach(s_item => {
                if(s_item.val().ton_tai == 0) 
                  listMeSends.push(s_item.key)
              });
            }
          
              // lấy ra danh sách tài khoản trên server
              this.offerListService.getAllAccount().on('value', (account) => {
                  if(account.val() != null) {
                    this.friendsPageService.offerList = []
                    let offerFriendsTemp = []
                    account.forEach(a_item => {
                      // nếu id != id người đang đăng nhập và có ký tự nhập vào, không nằm trong danh sách bạn bè, không nằm trong danh sách gửi yêu cầu, không nằm trong danh sách nhận yêu cầu
                        if(a_item.key != parseIDUser 
                          && !listFriendsMe.includes(a_item.key)
                          && !listMeRequest.includes(a_item.key)
                          && !listMeSends.includes(a_item.key)) {
                            let accountTemp = new OfferFriendsInfor();
                            accountTemp.id = a_item.key;
                            accountTemp.name = a_item.val().ten;
                            accountTemp.img = a_item.val().link_hinh;
                            accountTemp.checkAddOrUndo = 'them';
                            
                            if(this.friendsPageService.saveOfferList.length != 0) {
                              this.friendsPageService.saveOfferList.forEach(element => {
                                  if(element.id == accountTemp.id)
                                    accountTemp.checkAddOrUndo = element.checkAddOrUndo;
                              });
                              
                            } else {
                              accountTemp.checkAddOrUndo = 'them';
                            }
                            offerFriendsTemp.push(accountTemp)
                           
                           
                        }
                    });
                    // duyệt qua danh sách từng thằng trong danh sách tìm kiếm
                    offerFriendsTemp.forEach(AddFriends => {
                    // tìm ra danh sách bạn bè của từng thằng đó
                        this.offerListService.getListFriendsByIDUser(AddFriends.id).on('value', (Add_item) => {
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
                    for (let index = 0; index < sizeGet; index++) {
                          this.friendsPageService.offerList.push(offerFriendsTemp[index])
                    }
                    this.friendsPageService.sortMutualFriendsOffer();
                    this.friendsPageService.setSizeOffer(this.friendsPageService.offerList.length);
                    
                  }
              })
          });
        });
      }
    })
 } else {

 }
}
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FriendsPageService {
  private source = new BehaviorSubject(-1);
  public friendsDefault = this.source.asObservable();
  private isLoading: boolean;
  // danh sách yêu cầu đã gửi
  sendstList: any[];
  sizeSends: number;
  sendFirstList: any[];

  // danh sách lời mời nhận được
  requestList: any[];
  sizeRequest: number;
  requestFirstList: any[];

  // danh sách bạn bè
  friendsList: any[];
  friendFirstList: any[];
  sizeFriends: number;
  idUnfriend: string = '';
  nameUnfriend: string = '';

  // danh sách thêm bạn bè
  addList: any[];
  sizeAdd: number;
  searchVal: string ='';
  saveAddList: any[]

  // đề xuất
  offerList: any[];
  sizeOffer: number;
  searchValOffer: string ='';
  saveOfferList: any[]
  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };
  constructor(private db: AngularFireDatabase
  ) {
    this.update()
  }
  selectedFriendsPageDefaultSerivce():void {
    this.source.next(0);
  }

  selectedRequestService() {
    this.source.next(1);
  }
  
  selectedSendService() {
    this.source.next(2);
  }

  selectedAddFriendsService() {
    this.source.next(3);
  }

  selectedOffersFriendsService() {
    this.source.next(4);
  }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };

  animationCreated(animationItem: AnimationItem): void {}
  // số lượng bạn bè
  getSizeFriends() {
    return this.sizeFriends;
  }
  setSizeFriends(size: number) {
    this.sizeFriends = size;
  }
  // id người bị hủy kết bạn
  setIDUnFriend(id: string) {
    this.idUnfriend = id;
  }
  getIDUnFriend() {
    return this.idUnfriend
  }
  // tên người bị hủy kết bạn
  setNameUnFriend(name: string) {
    this.nameUnfriend = name;
  }
  getNameUnFriend() {
    return this.nameUnfriend;
  }

  // danh sách bạn bè
  getFriendsList() {
    return this.friendsList;
  }
  
  // danh sách gửi yêu cầu
   getRequestList() {
    return this.requestList;
  }
  getSizeRequest() {
    return this.sizeRequest;
  }
  setSizeRequest(size: number) {
    this.sizeRequest = size;
  }
  
  // danh sach gửi yêu cầu kết bạn
  getSendsList() {
    return this.sendstList;
  }
  getSizeSends() {
    return this.sizeSends;
  }
  setSizeSends(size: number) {
    this.sizeSends = size;
  }
  // danh sách thêm bạn
  setSizeAdd(size:number) {
    this.sizeAdd = size;
  }
  getSizeAdd() {
    return this.sizeAdd;
  }

   // danh sách de xuat
   setSizeOffer(size:number) {
    this.sizeOffer = size;
  }
    getSizeOffer() {
    return this.sizeOffer;
  }

  // sắp xếp danh sách thêm bạn theo thứ tự bạn chung từ nhiều nhất đến ít nhất
  public sortMutualFriendsAdd() {
    this.addList = this.addList.sort((mutual1, mutual2) => {
      let mutualResult_1 = mutual1.mutualFriends;
      let mutualResult_2 = mutual2.mutualFriends;
      return mutualResult_2 - mutualResult_1;
    });
  }

   // sắp xếp danh sách thêm bạn theo thứ tự bạn chung từ nhiều nhất đến ít nhất
   public sortMutualFriendsOffer() {
    this.offerList = this.offerList.sort((mutual1, mutual2) => {
      let mutualResult_1 = mutual1.mutualFriends;
      let mutualResult_2 = mutual2.mutualFriends;
      return mutualResult_2 - mutualResult_1;
    });
  }
  
   // sort thời gian gửi lời mời kết bạn từ gần nhất đến xa nhất dùng trong lấy ra danh sách request
  public sortRequestListDate() {
    this.requestList = this.requestList.sort((dateIn1, dateIn2) => {
      let date_1 = dateIn1.dateRequest;
      let date_2 = dateIn2.dateRequest;
      return date_2 - date_1;
    });
  }

   // sort thời gian gửi lời mời kết bạn từ gần nhất đến xa nhất dùng trong lấy ra request đầu tiên
  public sortRequestFrist() {
    this.requestFirstList = this.requestFirstList.sort((dateIn1, dateIn2) => {
      let date_1 = dateIn1.dateRequest;
      let date_2 = dateIn2.dateRequest;
      return date_2 - date_1;
    });
  }


   // sort thời gian mình gửi yêu cầu kết bạn từ gần nhất đến xa nhất dùng trong lấy ra danh sách send
   public sortSendListDate() {
    this.sendstList = this.sendstList.sort((dateIn1, dateIn2) => {
      let date_1 = dateIn1.dateSend;
      let date_2 = dateIn2.dateSend;
      return date_2 - date_1;
    });
  }

   // sort thời gian mình gửi yêu cầu kết bạn từ gần nhất đến xa nhất dùng trong lấy ra send đầu tiên
   public sortSendsFrist() {
    this.sendFirstList = this.sendFirstList.sort((dateIn1, dateIn2) => {
      let date_1 = dateIn1.dateSend;
      let date_2 = dateIn2.dateSend;
      return date_2 - date_1;
    });
  }

  // sort date A,B,C
  public sortFriendsListNameABC() {
    this.friendsList = this.friendsList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // sort date A,B,C danh sách tìm ra bạn bè đầu tiên
  public sortFriendsFirstListNameABC() {
    this.friendFirstList = this.friendFirstList.sort((nameIn1, nameIn2) => {
      var x = nameIn1.getNameLast();
      var y = nameIn2.getNameLast();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // cập nhật trạng thái on - off
  public update(): void {
    setTimeout(() => {
      let currentTime = Number(new Date());
      if (this.friendsList != null) {
        for (let i = 0; i < this.friendsList.length; i++) {
          this.db.database.ref('cai_dat').child(this.friendsList[i].id).on('value', set =>{
            if(set.val().trang_thai_hoat_dong == 'tat') {
              this.friendsList[i].status = false; 
            } else {
              let lan_cuoi_dang_nhap = this.friendsList[i].lastOnline;
              let overTime = currentTime - lan_cuoi_dang_nhap;
              if (overTime > 10000) {
                this.friendsList[i].status = false; 
              } else {
                this.friendsList[i].status = true;
              }
            }
          })
        }
      }
      this.update();
    }, 5000);
  }

 
}

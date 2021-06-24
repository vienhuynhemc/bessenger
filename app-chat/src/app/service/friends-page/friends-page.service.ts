import { Injectable } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/friends-page/request_infor';
import { SendInfor } from 'src/app/models/friends-page/send_infor';
import { ContactsService } from './contacts/contacts.service';

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
  sendtInfor: SendInfor;
  sendFirstList: any[];

  // danh sách lời mời nhận được
  requestList: any[];
  sizeRequest: number;
  requestInfor: RequestInfor;
  requestFirstList: any[];

  // danh sách bạn bè
  friendsList: any[];
  friendFirstList: any[];
  friendInfor: FriendInfor;
  private sizeFriends: number;
  idUnfriend: string = '';
  nameUnfriend: string = '';
  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };
  constructor(
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

  public update(): void {
    setTimeout(() => {
      let currentTime = Number(new Date());
      if (this.friendsList != null) {
        for (let i = 0; i < this.friendsList.length; i++) {
          let lan_cuoi_dang_nhap = this.friendsList[i].lastOnline;
          let overTime = currentTime - lan_cuoi_dang_nhap;
          if (overTime > 10000) {
            this.friendsList[i].status = false; 
          } else {
            this.friendsList[i].status = true;
          }
        }
      }
      this.update();
    }, 5000);
  }

}

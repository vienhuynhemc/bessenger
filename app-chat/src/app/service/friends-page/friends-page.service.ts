import { Injectable } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { RequestInfor } from 'src/app/models/friends-page/request_infor';
import { ContactsService } from './contacts/contacts.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsPageService {
  private source = new BehaviorSubject(-1);
  public friendsDefault = this.source.asObservable();
  private isLoading: boolean;
  
  // danh sách gửi yêu cầu
  requestList: any[];
  sizeRequest: number;

  requestInfor: RequestInfor;
  requestFirstList: any[];

  // danh sách bạn bè
  friendsList: any[];
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
  // sort date A,B,C
  public sortFriendsListNameABC() {
    this.friendsList = this.friendsList.sort((nameIn1, nameIn2) => {
      let name_1 = nameIn1.name;
      let name_2 = nameIn2.name;
      return name_2 - name_1;
    });
  }

}

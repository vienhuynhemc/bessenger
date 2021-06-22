import { Injectable } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { BehaviorSubject } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { ContactsService } from './contacts/contacts.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsPageService {
  private source = new BehaviorSubject(-1);
  public friendsDefault = this.source.asObservable();
  private isLoading: boolean;
  private sizeFriends: number;
  idUnfriend: string = '';
  nameUnfriend: string = '';
 
  // danh sách bạn bè
  friendsList: any[];
  friendInfor: FriendInfor;
  // danh sách bạn bè chung
  mutualFriendsList: any [];
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
 
}

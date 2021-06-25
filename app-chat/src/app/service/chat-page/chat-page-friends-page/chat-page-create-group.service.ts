import { AngularFireDatabase } from '@angular/fire/database';
import { ChatPageObjectGroup } from './../../../models/chat-page/chat-page-friends-page/chat_page_object_group';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatPageCreateGroupService {

  public isshow: boolean;
  // Danh sach tất cả user
  public all_user: ChatPageObjectGroup[];
  // Danh sách những người đã được thêm thêm vào
  public user_added: ChatPageObjectGroup[];
  // Danh sách gợi ý
  public user_search: ChatPageObjectGroup[];

  constructor(
    private db: AngularFireDatabase
  ) {
    this.init();
  }

  public fillter(value: string) {
    this.user_search = [];
    if (value.length > 0) {
      for (let i = 0; i < this.all_user.length; i++) {
        if (this.all_user[i].ten.trim().toLowerCase().includes(value.trim().toLowerCase())) {
          if (this.isNotInAdded(this.all_user[i].ma_tai_khoan)) {
            this.user_search.push(new ChatPageObjectGroup(this.all_user[i].ten, this.all_user[i].ma_tai_khoan, this.all_user[i].hinh));
          }
        }
      }
    }
  }

  public clearAdded(ma_tai_khoan: string) {
    let index = -1;
    for (let i = 0; i < this.user_added.length; i++) {
      if (this.user_added[i].ma_tai_khoan == ma_tai_khoan) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      this.user_added.splice(index, 1);
    }
  }

  public updateSearch(ten_hien_tai: string, ma_tai_khoan: string) {
    if (ten_hien_tai.trim().length > 0) {
      for (let i = 0; i < this.all_user.length; i++) {
        if (this.all_user[i].ma_tai_khoan == ma_tai_khoan) {
          let ten = this.all_user[i].ten;
          if (ten.trim().toLowerCase().includes(ten_hien_tai.trim().toLowerCase())) {
            this.user_search.push(new ChatPageObjectGroup(this.all_user[i].ten, this.all_user[i].ma_tai_khoan, this.all_user[i].hinh));
          }
          return;
        }
      }
    }
  }

  public isNotInAdded(ma_tai_khoan: string) {
    for (let i = 0; i < this.user_added.length; i++) {
      if (this.user_added[i].ma_tai_khoan == ma_tai_khoan) {
        return false;
      }
    }
    return true;
  }

  public selectUser(ma_tai_khoan: string) {
    for (let i = 0; i < this.all_user.length; i++) {
      if (this.all_user[i].ma_tai_khoan == ma_tai_khoan) {
        this.user_added.push(new ChatPageObjectGroup(this.all_user[i].ten, this.all_user[i].ma_tai_khoan, this.all_user[i].hinh));
        this.user_search = [];
        return;
      }
    }
  }

  public getAllUser() {
    return this.db.object("/tai_khoan").snapshotChanges();
  }

  public off(): void {
    this.isshow = false;
    this.init();
  }

  public init(): void {
    this.user_added = [];
    this.user_search = [];
  }

  public isOke(): boolean {
    return this.user_added.length != 0;
  }

}

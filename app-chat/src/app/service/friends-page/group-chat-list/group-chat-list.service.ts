import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class GroupChatListService {
  // danh sách nhóm chat
  groupsListService: AngularFireList<any> = null;
  constructor(public db: AngularFireDatabase) { }
  
  // lấy từ DB danh sách nhóm chat
  getGroupsListService(): AngularFireList<any> {
    return this.groupsListService;
  }
}

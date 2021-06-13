import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class AddGroupService {
  
  constructor(public db: AngularFireDatabase) { }
  // thêm group vào DB
  insertGroupChatService(group: any): void {

  }
}

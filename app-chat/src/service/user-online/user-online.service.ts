import { Injectable } from '@angular/core';
// dùng observable xử lý bất đồng bộ
import { Observable } from 'rxjs';
import { of } from 'rxjs'
// user
import { UserChat } from 'src/models/user_chat';
// firebass
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
// chứa các phương thức xử lý liên quan đến các user đang online
export class UserOnlineService {

  constructor() { }
}

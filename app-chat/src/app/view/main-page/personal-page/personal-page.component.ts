import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
  // @input truyền vào user từ component cha khi login
  user: User;
  constructor() { }

  ngOnInit(): void {
  }
  // thay đổi ảnh avata trong DB
  changeAvatar(user: User):void {

  }
  // thay đổi thông tin cá nhân
  changeProfile(user:User):void {

  }
  // thay đổi mật khẩu eventGet {user: User, newPass: string, oldPass:string}
  changePass(eventGet: any):void {

  }
}

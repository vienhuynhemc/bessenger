import { MainPageService } from './../../../service/main-page/main-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
  // @input truyền vào user từ component cha khi login
  constructor(private main_page_service: MainPageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectPersonalPage();
    }, 0);
  }
  // thay đổi ảnh avata trong DB
  changeAvatar(): void {

  }
  // thay đổi thông tin cá nhân
  changeProfile(): void {

  }
  // thay đổi mật khẩu eventGet {user: User, newPass: string, oldPass:string}
  changePass(eventGet: any): void {

  }
}

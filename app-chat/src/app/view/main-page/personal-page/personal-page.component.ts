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
    setTimeout(() => {
    this.animationCircle()
    }, 0);
  }
  // tạo animation khi load trang
  animationCircle() {
    const idLeft = document.getElementById("circle-left");
    const idCenter = document.getElementById("circle-center");
    const idRight = document.getElementById("circle-right");4
    const idCoverAvt = document.getElementById("cover-avatar-bg");
    idCenter.classList.add('circle-center-animation');
    idLeft.classList.add('circle-left-animation')
    idRight.classList.add('circle-right-animation')
    idCoverAvt.classList.add("cover-avatar-bg-animation")
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

import { ChatPageFriendsServiceService } from './../../service/chat-page/chat-page-friends-page/chat-page-friends-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPageFriendsLeftServiceService } from 'src/app/service/chat-page/chat-page-friends-page/chat-page-friends-left-service.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';
import { LoginService } from './../../service/login/login.service';
import { MainPageService } from './../../service/main-page/main-page.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login_service: LoginService,
    public main_page_service: MainPageService,
    public friendsPageService: FriendsPageService,
    private chat_page_friends_object_left_service: ChatPageFriendsLeftServiceService,
    private chat_page_firends_service: ChatPageFriendsServiceService
  ) {
  }

  ngOnInit(): void {
    if (!this.login_service.isLogin()) {
      this.router.navigate(['/dang-nhap']);
    } else {
      if (this.main_page_service.layHinh == null) {
        this.getData();
      } else {
        this.main_page_service.layHinh.unsubscribe();
        this.getData();
      }
    }
  }

  public getData() {
    this.main_page_service.layHinh = this.main_page_service.getImg().subscribe(data => {
      this.main_page_service.setImg(data.payload.toJSON());
    });
  }

  // Đăng xuất
  logOut(): void {
    this.login_service.logOut();
    this.main_page_service.reset();
    this.chat_page_friends_object_left_service.allBoxData = null;
    this.chat_page_firends_service.ban_bes = null;
    this.router.navigate(['/dang-nhap']);
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToHomePage(): void {
    this.router.navigate(['trang-chu'], { relativeTo: this.route });
  }
  moveToPersonalPage(): void {
    this.router.navigate(['thong-tin-ca-nhan'], { relativeTo: this.route });
  }
  moveToFriendsPage(): void {
    this.router.navigate(['ban-be'], { relativeTo: this.route });
    // trạng thái mặc định của friends page khi chọn nó
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
  }
  moveToChatPage(): void {
    this.router.navigate(['tin-nhan/danh-sach'], { relativeTo: this.route });
  }
  moveToChatRequestPage(): void {
    this.router.navigate(['tin-nhan-an'], { relativeTo: this.route });
  }
  moveToSettingPage(): void {
    this.router.navigate(['cai-dat'], { relativeTo: this.route });
  }
  //////////////////////////////////////////

}

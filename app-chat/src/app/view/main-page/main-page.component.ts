import { MainPageService } from './../../service/main-page/main-page.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../service/login/login.service';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';


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
    public friendsPageService: FriendsPageService
  ) {
  }

  ngOnInit(): void {
    if (!this.login_service.isLogin()) {
      this.router.navigate(['/dang-nhap']);
    }
  }

  // Đăng xuất
  logOut(): void {
    this.login_service.logOut();
    this.main_page_service.reset();
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
    this.router.navigate(['tin-nhan'], { relativeTo: this.route });
  }
  moveToChatRequestPage(): void {
    this.router.navigate(['tin-nhan-an'], { relativeTo: this.route });
  }
  moveToSettingPage(): void {
    this.router.navigate(['cai-dat'], { relativeTo: this.route });
  }
  //////////////////////////////////////////

}

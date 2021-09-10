import { RegisterAccountWsService } from './../../../service/ws/register-account/register-account-ws.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterProcessWsService } from './../../../service/ws/register-account/register-process-ws.service';
import { NotificationRegisterPageWsService } from './../../../service/ws/notification/notification-register-page-ws.service';
import { Component, OnInit } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-register-page-ws',
  templateUrl: './register-page-ws.component.html',
  styleUrls: ['./register-page-ws.component.scss']
})
export class RegisterPageWsComponent implements OnInit {

  // lottie
  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };
  public countSlide: number;
  public isRunningSlide: boolean;

  constructor(
    public notification_register_page_ws: NotificationRegisterPageWsService,
    public register_process_service_ws: RegisterProcessWsService,
    public version_service: VersionService,
    public router: Router,
    public register_account_service_ws: RegisterAccountWsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.version_service.version == 1) {
      this.router.navigate(['/change-version']);
    }
    if (!this.register_account_service_ws.isRegister()) {
      this.router.navigate(['/bessenger-ws']);
    } else {
      let count = JSON.parse(localStorage.getItem("register-process-ws"));
      if (count == null) {
        localStorage.setItem("register-process-ws", JSON.stringify("0"));
        this.register_process_service_ws.reset();
        this.register_process_service_ws.getData();
      }
      this.init();
    }
  }

  private init(): void {
    setTimeout(() => {
      this.register_process_service_ws.setLoading(false);
    }, 0);
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isRunningSlide = true;
    this.setDelay(10000);
    // Xử lý việc đi tới component tương ứng
    if (this.register_process_service_ws.isChonGioiTinh()) {
      this.moveToSelectSexPage();
    } else if (this.register_process_service_ws.isChonHinhDaiDien()) {
      this.moveToSelectAvatarPage();
    } else if (this.register_process_service_ws.isXacNhanEmail()) {
      this.moveToVerifyEmailPage();
    }
  }

  // Các hàm di chuyển trang
  moveToSelectSexPage(): void {
    this.router.navigate(['chon-gioi-tinh'], { relativeTo: this.route });
  }
  moveToSelectAvatarPage(): void {
    this.router.navigate(['chon-hinh-dai-dien'], { relativeTo: this.route });
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['xac-nhan-email'], { relativeTo: this.route });
  }

  setDelay(times: any) {
    setTimeout(() => {
      this.countSlide++;
      let nameOld = `hinh${this.countSlide}`;
      let nameNew = `hinh${this.countSlide + 1}`;
      if (this.countSlide == 5) {
        nameNew = `hinh${1}`;
        this.countSlide = 0;
      }
      let nameOldObject = document.getElementById(nameOld);
      if (nameOldObject != null) {
        nameOldObject.style.opacity = '0';
      }
      let nameNewObject = document.getElementById(nameNew);
      if (nameNewObject != null) {
        nameNewObject.style.opacity = '1';
      }
      let child = document.getElementById("child");
      if (child != null) {
        child.style.left = `${this.countSlide * 64}px`;
      }
      let content_child = document.getElementById("content_child");
      if (content_child != null) {
        content_child.innerText = `0${this.countSlide + 1}`;
      }
      // repeate
      if (this.isRunningSlide) {
        this.setDelay(times);
      }
    }, times);
  }

  animationCreated(animationItem: AnimationItem): void {
  }

}

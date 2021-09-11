import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';
import { FpProcessServiceWsService } from 'src/app/service/ws/forgot-password/fp-process-service-ws.service';
import { FpServiceWsService } from 'src/app/service/ws/forgot-password/fp-service-ws.service';
import { NotificationFpPageWsService } from 'src/app/service/ws/notification/notification-fp-page-ws.service';

@Component({
  selector: 'app-forgot-password-ws',
  templateUrl: './forgot-password-ws.component.html',
  styleUrls: ['./forgot-password-ws.component.scss']
})
export class ForgotPasswordWsComponent implements OnInit {

  public countSlide: number;
  public isRunningSlide: boolean;

  constructor(
    public notification_fp_ws: NotificationFpPageWsService,
    public fp_process_service_ws: FpProcessServiceWsService,
    private router: Router,
    private route: ActivatedRoute,
    private fp_service_ws: FpServiceWsService,
    public version_service: VersionService
  ) { }

  ngOnInit(): void {
    // change version
    if (this.version_service.version == 1) {
      this.router.navigate(['/change-version']);
    }
    if (!this.fp_service_ws.isQMK()) {
      this.router.navigate(['/bessenger-ws']);
    } else {
      let count = JSON.parse(localStorage.getItem("qmk-process-ws"));
      if (count == null) {
        localStorage.setItem("qmk-process-ws", JSON.stringify("0"));
        this.fp_process_service_ws.reset();
        this.fp_process_service_ws.getData();
      }
      this.init();
    }
  }

  public init(): void {
    setTimeout(() => {
      this.fp_process_service_ws.setLoading(false);
    }, 0);
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isRunningSlide = true;
    this.setDelay(10000);
    // Xử lý việc đi tới component tương ứng
    if (this.fp_process_service_ws.isXacNhanEmail()) {
      this.moveToVerifyEmailPage();
    } else if (this.fp_process_service_ws.isChonMatKhau()) {
      this.moveToSelectPassword();
    }
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

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectPassword(): void {
    this.router.navigate(['chon-mat-khau'], { relativeTo: this.route });
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['xac-nhan-email'], { relativeTo: this.route });
  }
  ////////////////////////////////////////

}

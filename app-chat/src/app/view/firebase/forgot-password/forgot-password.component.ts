import { VersionService } from './../../../service/version/version.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FpProcessServiceService } from 'src/app/service/firebase/forgot-password/fp-process-service.service';
import { FpServiceService } from 'src/app/service/firebase/forgot-password/fp-service.service';
import { NotificationFpPageService } from 'src/app/service/firebase/notification/notification-fp-page.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public countSlide: number;
  public isRunningSlide: boolean;

  constructor(
    public notification_fp: NotificationFpPageService,
    public fp_process_service: FpProcessServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fp_service: FpServiceService,
    public version_service: VersionService
  ) {

  }

  ngOnInit(): void {
    // change version
    if (this.version_service.version == 2) {
      this.router.navigate(['/change-version']);
    }
    if (!this.fp_service.isQMK()) {
      this.router.navigate(['/bessenger']);
    } else {
      let count = JSON.parse(localStorage.getItem("qmk-process"));
      if (count == null) {
        localStorage.setItem("qmk-process", JSON.stringify("0"));
        this.fp_process_service.reset();
        this.fp_process_service.getData();
      }
      this.init();
    }
  }

  public init(): void {
    setTimeout(() => {
      this.fp_process_service.setLoading(false);
    }, 0);
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isRunningSlide = true;
    this.setDelay(10000);
    // Xử lý việc đi tới component tương ứng
    if (this.fp_process_service.isXacNhanEmail()) {
      this.moveToVerifyEmailPage();
    } else if (this.fp_process_service.isChonMatKhau()) {
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

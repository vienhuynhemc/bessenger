import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FpProcessServiceService } from 'src/app/service/firebase/forgot-password/fp-process-service.service';
import { FpServiceService } from 'src/app/service/firebase/forgot-password/fp-service.service';
import { NotificationFpPageService } from 'src/app/service/firebase/notification/notification-fp-page.service';
import { NotificationLoginPageService } from 'src/app/service/firebase/notification/notification-login-page.service';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-fp-select-password',
  templateUrl: './fp-select-password.component.html',
  styleUrls: ['./fp-select-password.component.scss']
})
export class FpSelectPasswordComponent implements OnInit {

  public password: string;

  constructor(
    private fp_service: FpServiceService,
    public notification_fp: NotificationFpPageService,
    public fp_process_service: FpProcessServiceService,
    private router: Router,
    public notification_login_page: NotificationLoginPageService,
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
      // Xử lý việc đi tới component tương ứng
      if (this.fp_process_service.isChonMatKhau()) {
        setTimeout(() => {
          this.fp_process_service.reset();
          this.fp_process_service.getData();
        }, 0);
      } else if (this.fp_process_service.isXacNhanEmail()) {
        this.moveToSelectVerifyEmail();
      }
    }
  }

  moveToSelectVerifyEmail(): void {
    this.router.navigate(['quen-mat-khau/xac-nhan-email']);
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  changePassword(value: any) {
    let i = 0;
    let isHaveNumber = false;
    let isHaveUpcase = false;
    while (i <= value.length) {
      let character = value.charAt(i);
      if (character == character.toUpperCase() && isNaN(character)) {
        isHaveUpcase = true;
      }
      i++;
    }
    isHaveNumber = this.hasNumber(value);
    let elements = document.getElementById("level-password").children;
    if (!isHaveNumber && !isHaveUpcase && value.length > 0) {
      elements[3].textContent = "Yếu";
      (<HTMLElement>elements[3]).style.color = "#ff7b5c";
      (<HTMLElement>elements[0]).style.background = "#ff7b5c";
      (<HTMLElement>elements[1]).style.background = "#e2e2e2";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else if ((!isHaveNumber && isHaveUpcase) || (!isHaveUpcase && isHaveNumber)) {
      elements[3].textContent = "Trung bình";
      (<HTMLElement>elements[3]).style.color = "yellow";
      (<HTMLElement>elements[0]).style.background = "yellow";
      (<HTMLElement>elements[1]).style.background = "yellow";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else if (isHaveNumber && isHaveUpcase) {
      elements[3].textContent = "Mạnh";
      (<HTMLElement>elements[3]).style.color = "#20e820";
      (<HTMLElement>elements[0]).style.background = "#20e820";
      (<HTMLElement>elements[1]).style.background = "#20e820";
      (<HTMLElement>elements[2]).style.background = "#20e820";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else {
      elements[3].textContent = "Hãy nhập mật khẩu";
      (<HTMLElement>elements[3]).style.color = "#e2e2e2";
      (<HTMLElement>elements[0]).style.background = "#e2e2e2";
      (<HTMLElement>elements[1]).style.background = "#e2e2e2";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";

      document.getElementById("dk-password").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-3").style.display = "block";
    }
  }

  hiddenAndShowPassword(e: HTMLInputElement, eye: HTMLElement): void {
    if (e.type == 'text') {
      e.type = 'password';
      eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
    } else {
      e.type = 'text';
      eye.classList.add('fa-eye-slash');
      eye.classList.remove('fa-eye');
    }
  }

  public submit(): void {
    let mat_khau: string = this.password || "";
    if (mat_khau.length == 0) {
      document.getElementById("dk-password").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-3").style.display = "block";
    } else {
      this.fp_process_service.setLoading(true);
      // cập nhật mật khẩu mới lên webservice
      this.fp_service.updatePassword(mat_khau).subscribe(data => {
        // Cập nhật mật khẩu lên firebase
        this.fp_service.updatePasswordFirebase(mat_khau);
        // Xong ẩn loading
        setTimeout(() => {
          this.fp_process_service.setLoading(false);
        }, 0);
        // Xóa ma_tai_khoan và process trong localStorage
        localStorage.removeItem("ma_tai_khoan_qmk");
        localStorage.removeItem("qmk-process");
        // Hiển thị thông báo cho trang đăng nhập
        this.notification_login_page.setTitle("Lấy lại mật khẩu thành công!");
        this.notification_login_page.setChild("Đã tới lúc đăng nhập và thưởng thức nào!");
        this.notification_login_page.showPop();
        // Chuyển tới trang đăng nhập
        this.router.navigate(['/dang-nhap']);
      });
    }
  }

}

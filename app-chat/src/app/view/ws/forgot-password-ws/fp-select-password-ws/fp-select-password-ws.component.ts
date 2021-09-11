import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';
import { FpProcessServiceWsService } from 'src/app/service/ws/forgot-password/fp-process-service-ws.service';
import { FpServiceWsService } from 'src/app/service/ws/forgot-password/fp-service-ws.service';
import { NotificationFpPageWsService } from 'src/app/service/ws/notification/notification-fp-page-ws.service';
import { NotificationLoginPageWsService } from 'src/app/service/ws/notification/notification-login-page-ws.service';

@Component({
  selector: 'app-fp-select-password-ws',
  templateUrl: './fp-select-password-ws.component.html',
  styleUrls: ['./fp-select-password-ws.component.scss']
})
export class FpSelectPasswordWsComponent implements OnInit {

  public password: string;

  constructor(
    private fp_service_ws: FpServiceWsService,
    public notification_fp_ws: NotificationFpPageWsService,
    public fp_process_service_ws: FpProcessServiceWsService,
    private router: Router,
    public notification_login_page_ws: NotificationLoginPageWsService,
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
      // Xử lý việc đi tới component tương ứng
      if (this.fp_process_service_ws.isChonMatKhau()) {
        setTimeout(() => {
          this.fp_process_service_ws.reset();
          this.fp_process_service_ws.getData();
        }, 0);
      } else if (this.fp_process_service_ws.isXacNhanEmail()) {
        this.moveToSelectVerifyEmail();
      }
    }
  }

  moveToSelectVerifyEmail(): void {
    this.router.navigate(['quen-mat-khau-ws/xac-nhan-email']);
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
      this.fp_process_service_ws.setLoading(true);
      // cập nhật mật khẩu mới lên webservice
      this.fp_service_ws.updatePassword(mat_khau).subscribe(data => {
        // Cập nhật mật khẩu lên firebase
        this.fp_service_ws.updatePasswordFirebase(mat_khau);
        // Xong ẩn loading
        setTimeout(() => {
          this.fp_process_service_ws.setLoading(false);
        }, 0);
        // Xóa ma_tai_khoan và process trong localStorage
        localStorage.removeItem("ma_tai_khoan_qmk_ws");
        localStorage.removeItem("qmk-process-ws");
        // Hiển thị thông báo cho trang đăng nhập
        this.notification_login_page_ws.setTitle("Lấy lại mật khẩu thành công!");
        this.notification_login_page_ws.setChild("Đã tới lúc đăng nhập và thưởng thức nào!");
        this.notification_login_page_ws.showPop();
        // Chuyển tới trang đăng nhập
        this.router.navigate(['/dang-nhap-ws']);
      });
    }
  }

}

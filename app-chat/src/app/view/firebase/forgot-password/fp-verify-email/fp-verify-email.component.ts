import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';
import { FpProcessServiceService } from 'src/app/service/firebase/forgot-password/fp-process-service.service';
import { FpServiceService } from 'src/app/service/firebase/forgot-password/fp-service.service';
import { FpVerifyEmailService } from 'src/app/service/firebase/forgot-password/fp-verify-email.service';
import { NotificationFpPageService } from 'src/app/service/firebase/notification/notification-fp-page.service';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-fp-verify-email',
  templateUrl: './fp-verify-email.component.html',
  styleUrls: ['./fp-verify-email.component.scss']
})
export class FpVerifyEmailComponent implements OnInit {

  // 6 số
  public num1: string;
  public num2: string;
  public num3: string;
  public num4: string;
  public num5: string;
  public num6: string;

  constructor(
    private fp_service: FpServiceService,
    public notification_fp: NotificationFpPageService,
    public fp_process_service: FpProcessServiceService,
    private router: Router,
    private fp_verify_email_service: FpVerifyEmailService,
    public version_service: VersionService
  ) { }

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
        this.moveToSelectPassword()
      } else if (this.fp_process_service.isXacNhanEmail()) {
        setTimeout(() => {
          this.fp_process_service.reset();
          this.fp_process_service.getData();
        }, 0);
      }
    }
  }

  moveToSelectPassword(): void {
    this.router.navigate(['quen-mat-khau/chon-mat-khau']);
  }

  public handleButton(button: HTMLButtonElement): void {
    let count = 0;
    if (this.num1 != undefined && this.num1 != null) {
      count++;
    }
    if (this.num2 != undefined && this.num2 != null) {
      count++;
    }
    if (this.num3 != undefined && this.num3 != null) {
      count++;
    }
    if (this.num4 != undefined && this.num4 != null) {
      count++;
    }
    if (this.num5 != undefined && this.num5 != null) {
      count++;
    }
    if (this.num6 != undefined && this.num6 != null) {
      count++;
    }
    if (count == 6) {
      button.disabled = false;
      button.classList.remove("button-done-select");
      button.classList.add("button-select");
    } else {
      button.disabled = true;
      button.classList.add("button-done-select");
      button.classList.remove("button-select");
    }
  }

  public reSendEmail(): void {
    // gửi email rồi tới trang đăng ký
    let code: string = "";
    for (let i = 0; i < 6; i++) {
      let newNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;;
      code += newNumber + "";
    }
    let newData = new RegisterObjectSendMail();
    newData.code = code;
    // Lấy email từ firebase
    this.fp_verify_email_service.getEmail().subscribe(data => {
      // Tải
      let value = data[0]['email'];
      newData.email = value;
      // Tải xong gửi email
      this.fp_verify_email_service.sendMailQMK(newData).subscribe((data) => {
        // Cập nhật lại dữ liệu trên firebase
        this.fp_verify_email_service.updateEmail(newData.code).subscribe(data => {
          // Xong ẩn loading
          setTimeout(() => {
            this.fp_process_service.setLoading(false);
          }, 0);
          // Hiện notification
          this.notification_fp.setTitle("Gửi lại mã thành công!")
          this.notification_fp.setChild("Email có chứa mã mới đã được chúng tôi gửi lại đến bạn, vui lòng kiểm tra email");
          this.notification_fp.showPop();
        });
      });
    });
  }

  public submit(error: HTMLElement): void {
    let code: string = this.num1 + "" + this.num2 + "" + this.num3 + "" + this.num4 + "" + this.num5 + "" + this.num6;
    this.fp_verify_email_service.submit(code).subscribe(data => {
      if (data.length > 0) {
        // ẩn loading
        setTimeout(() => {
          this.fp_process_service.setLoading(false);
        }, 0);
        // Chuyển tới bước tiếp theo
        localStorage.setItem("qmk-process", JSON.stringify("1"));
        this.fp_process_service.reset();
        this.fp_process_service.getData();
        this.moveToSelectPassword();
      } else {
        setTimeout(() => {
          this.fp_process_service.setLoading(false);
        }, 0);
        error.style.display = "block";
      }
    })
  }


}

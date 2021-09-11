import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';
import { NotificationLoginPageService } from 'src/app/service/firebase/notification/notification-login-page.service';
import { NotificationRegisterPageService } from 'src/app/service/firebase/notification/notification-register-page.service';
import { RegisterAccountService } from 'src/app/service/firebase/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/firebase/register-account/register-process.service';
import { VerifyEmailService } from 'src/app/service/firebase/register-account/verify-email.service';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  // 6 số
  public num1: string;
  public num2: string;
  public num3: string;
  public num4: string;
  public num5: string;
  public num6: string;

  constructor(
    private register_account_service: RegisterAccountService,
    private router: Router,
    public register_process_service: RegisterProcessService,
    private verify_email_service: VerifyEmailService,
    public notification_register_page_service: NotificationRegisterPageService,
    public notification_login_page: NotificationLoginPageService,
    public version_service: VersionService,
  ) { }

  ngOnInit(): void {
    if (this.version_service.version == 2) {
      this.router.navigate(['/change-version']);
    }
    if (!this.register_account_service.isRegister()) {
      this.router.navigate(['/bessenger']);
    } else {
      // Xử lý việc đi tới component tương ứng
      if (this.register_process_service.isChonGioiTinh()) {
        this.moveToSelectSexPage();
      } else if (this.register_process_service.isChonHinhDaiDien()) {
        this.moveToSelectAvatarPage();
      } else if (this.register_process_service.isXacNhanEmail()) {
        setTimeout(() => {
          this.register_process_service.reset();
          this.register_process_service.getData();
        }, 0);
      }
    }
  }

  public submit(error: HTMLElement): void {
    let code: string = this.num1 + "" + this.num2 + "" + this.num3 + "" + this.num4 + "" + this.num5 + "" + this.num6;
    this.verify_email_service.submit(code).subscribe(data => {
      if (data.length > 0) {
        // Update lại tài khoản trên database webservice là đã kích hoạt rồi
        this.verify_email_service.turnOnAccount().subscribe(data => {
          // lấy ra mã tài khoản để thêm cài đặt
          this.register_account_service.accessSettings().set({
            trang_thai_hoat_dong: 'bat',
            khong_lam_phien: 'bat',
            hien_thi_ban_xem_truoc: 'bat',
            am_thanh_thong_bao:'bat'
          })
          // Xóa ma_tai_khoan và register-process trong localStorage
          localStorage.removeItem("ma_tai_khoan");
          localStorage.removeItem("register-process");
          // ẩn loading

          setTimeout(() => {
            this.register_process_service.setLoading(false);
          }, 0);
          // thêm cài đặt cho tài khoản

          // Hiển thị thông báo cho trang đăng nhập
          this.notification_login_page.setTitle("Đăng ký thành công!");
          this.notification_login_page.setChild("Đã tới lúc đăng nhập và thưởng thức nào!");
          this.notification_login_page.showPop();
          // Chuyển tới trang đăng nhập
          this.router.navigate(['/dang-nhap']);
          
        });
      } else {
        setTimeout(() => {
          this.register_process_service.setLoading(false);
        }, 0);
        error.style.display = "block";
      }
    })
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

  public goBack(): void {
    localStorage.setItem("register-process", JSON.stringify("1"));
    this.register_process_service.reset();
    this.register_process_service.getData();
    this.moveToSelectAvatarPage();
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
    this.verify_email_service.getEmail().subscribe(data => {
      // Tải
      let value = data[0]['email'];
      newData.email = value;
      // Tải xong gửi email
      this.register_account_service.sendMail(newData).subscribe((data) => {
        // Cập nhật lại dữ liệu trên firebase
        this.verify_email_service.updateEmail(newData.code).subscribe(data => {
          // Xong ẩn loading
          setTimeout(() => {
            this.register_process_service.setLoading(false);
          }, 0);
          // Hiện notification
          this.notification_register_page_service.setTitle("Gửi lại mã thành công!")
          this.notification_register_page_service.setChild("Email có chứa mã mới đã được chúng tôi gửi lại đến bạn, vui lòng kiểm tra email");
          this.notification_register_page_service.showPop();
        });
      });
    });
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectAvatarPage(): void {
    this.router.navigate(['dang-ky/chon-hinh-dai-dien']);
  }
  moveToSelectSexPage(): void {
    this.router.navigate(['dang-ky/chon-gioi-tinh']);
  }
  ////////////////////////////////////////

}

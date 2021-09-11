import { VerifyEmailWsService } from './../../../../service/ws/register-account/verify-email-ws.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';
import { NotificationLoginPageWsService } from 'src/app/service/ws/notification/notification-login-page-ws.service';
import { NotificationRegisterPageWsService } from 'src/app/service/ws/notification/notification-register-page-ws.service';
import { RegisterAccountWsService } from 'src/app/service/ws/register-account/register-account-ws.service';
import { RegisterProcessWsService } from 'src/app/service/ws/register-account/register-process-ws.service';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';

@Component({
  selector: 'app-verify-email-ws',
  templateUrl: './verify-email-ws.component.html',
  styleUrls: ['./verify-email-ws.component.scss']
})
export class VerifyEmailWsComponent implements OnInit {

  // 6 số
  public num1: string;
  public num2: string;
  public num3: string;
  public num4: string;
  public num5: string;
  public num6: string;

  constructor(
    private router: Router,
    public register_process_service_ws: RegisterProcessWsService,
    public notification_register_page_service_ws: NotificationRegisterPageWsService,
    public notification_login_page_ws: NotificationLoginPageWsService,
    public version_service: VersionService,
    public register_account_service_ws: RegisterAccountWsService,
    public verify_email_service_ws: VerifyEmailWsService
  ) { }

  ngOnInit(): void {
    if (this.version_service.version == 1) {
      this.router.navigate(['/change-version']);
    }
    if (!this.register_account_service_ws.isRegister()) {
      this.router.navigate(['/bessenger-ws']);
    } else {
      // Xử lý việc đi tới component tương ứng
      if (this.register_process_service_ws.isChonGioiTinh()) {
        this.moveToSelectSexPage();
      } else if (this.register_process_service_ws.isChonHinhDaiDien()) {
        this.moveToSelectAvatarPage();
      } else if (this.register_process_service_ws.isXacNhanEmail()) {
        setTimeout(() => {
          this.register_process_service_ws.reset();
          this.register_process_service_ws.getData();
        }, 0);
      }
    }
  }

  public submit(error: HTMLElement): void {
    let code: string = this.num1 + "" + this.num2 + "" + this.num3 + "" + this.num4 + "" + this.num5 + "" + this.num6;
    this.verify_email_service_ws.submit(code).subscribe(data => {
      if (data.length > 0) {
        // Update lại tài khoản trên database webservice là đã kích hoạt rồi
        this.verify_email_service_ws.turnOnAccount().subscribe(data => {
          // lấy ra mã tài khoản để thêm cài đặt
          this.register_account_service_ws.accessSettings().set({
            trang_thai_hoat_dong: 'bat',
            khong_lam_phien: 'bat',
            hien_thi_ban_xem_truoc: 'bat',
            am_thanh_thong_bao: 'bat'
          })
          // Xóa ma_tai_khoan và register-process trong localStorage
          localStorage.removeItem("ma_tai_khoan_ws");
          localStorage.removeItem("register-process-ws");
          // ẩn loading

          setTimeout(() => {
            this.register_process_service_ws.setLoading(false);
          }, 0);
          // thêm cài đặt cho tài khoản

          // Hiển thị thông báo cho trang đăng nhập
          this.notification_login_page_ws.setTitle("Đăng ký thành công!");
          this.notification_login_page_ws.setChild("Đã tới lúc đăng nhập và thưởng thức nào!");
          this.notification_login_page_ws.showPop();
          // Chuyển tới trang đăng nhập
          this.router.navigate(['/dang-nhap-ws']);

        });
      } else {
        setTimeout(() => {
          this.register_process_service_ws.setLoading(false);
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
    localStorage.setItem("register-process-ws", JSON.stringify("1"));
    this.register_process_service_ws.reset();
    this.register_process_service_ws.getData();
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
    this.verify_email_service_ws.getEmail().subscribe(data => {
      // Tải
      let value = data[0]['email'];
      newData.email = value;
      // Tải xong gửi email
      this.register_account_service_ws.sendMail(newData).subscribe((data) => {
        // Cập nhật lại dữ liệu trên firebase
        this.verify_email_service_ws.updateEmail(newData.code).subscribe(data => {
          // Xong ẩn loading
          setTimeout(() => {
            this.register_process_service_ws.setLoading(false);
          }, 0);
          // Hiện notification
          this.notification_register_page_service_ws.setTitle("Gửi lại mã thành công!")
          this.notification_register_page_service_ws.setChild("Email có chứa mã mới đã được chúng tôi gửi lại đến bạn, vui lòng kiểm tra email");
          this.notification_register_page_service_ws.showPop();
        });
      });
    });
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectAvatarPage(): void {
    this.router.navigate(['dang-ky-ws/chon-hinh-dai-dien']);
  }
  moveToSelectSexPage(): void {
    this.router.navigate(['dang-ky-ws/chon-gioi-tinh']);
  }
  ////////////////////////////////////////

}

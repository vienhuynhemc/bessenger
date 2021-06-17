import { NotificationRegisterPageService } from './../../../service/notification/notification-register-page.service';
import { VerifyEmailService } from './../../../service/register-account/verify-email.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterObjectSendMail } from 'src/app/models/regiser-account/register_object_send_mail';
import { RegisterAccountService } from 'src/app/service/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/register-account/register-process.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private register_account_service: RegisterAccountService,
    private router: Router,
    public register_process_service: RegisterProcessService,
    private verify_email_service: VerifyEmailService,
    public notification_register_page_service: NotificationRegisterPageService
  ) { }

  ngOnInit(): void {
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

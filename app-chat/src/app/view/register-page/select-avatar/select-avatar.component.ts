import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAccountService } from 'src/app/service/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/register-account/register-process.service';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {

  constructor(
    private register_account_service: RegisterAccountService,
    private router: Router,
    public register_process_service: RegisterProcessService
  ) { }

  ngOnInit(): void {
    if (!this.register_account_service.isRegister()) {
      this.router.navigate(['/bessenger']);
    } else {
      // Xử lý việc đi tới component tương ứng
      if (this.register_process_service.isChonGioiTinh()) {
        this.moveToSelectSexPage();
      } else if (this.register_process_service.isChonHinhDaiDien()) {
        setTimeout(() => {
          this.register_process_service.reset();
          this.register_process_service.getData();
        }, 0);
      } else if (this.register_process_service.isXacNhanEmail()) {
        this.moveToVerifyEmailPage();
      }
    }
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectSexPage(): void {
    this.router.navigate(['dang-ky/chon-gioi-tinh']);
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['dang-ky/xac-nhan-email']);
  }
  ////////////////////////////////////////
}

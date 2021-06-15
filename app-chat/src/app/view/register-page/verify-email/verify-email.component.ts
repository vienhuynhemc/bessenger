import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        this.moveToSelectAvatarPage();
      } else if (this.register_process_service.isXacNhanEmail()) {
        setTimeout(() => {
          this.register_process_service.reset();
          this.register_process_service.getData();
        }, 0);
      }
    }
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

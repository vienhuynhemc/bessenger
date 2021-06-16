import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAccountService } from 'src/app/service/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/register-account/register-process.service';

@Component({
  selector: 'app-select-sex',
  templateUrl: './select-sex.component.html',
  styleUrls: ['./select-sex.component.scss']
})
export class SelectSexComponent implements OnInit {

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
        setTimeout(() => {
          this.register_process_service.reset();
          this.register_process_service.getData();
        }, 0);
      } else if (this.register_process_service.isChonHinhDaiDien()) {
        this.moveToSelectAvatarPage();
      } else if (this.register_process_service.isXacNhanEmail()) {
        this.moveToVerifyEmailPage();
      }
    }
  }

  public selectSex(gioiTinh: string) {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    // Cập nhật lại dữ liệu trong localStorage
    localStorage.setItem("register-process", JSON.stringify("1"));
    setTimeout(() => {
      this.register_process_service.reset();
      this.register_process_service.getData();
    }, 0);
    // Tải hình mặt định tương ứng lên firebase và cập dữ liệu trong firebase
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    this.register_account_service.taiHinhMacDinhChoTaiKhoan(ma_tai_khoan, gioiTinh);
    // Ẩn loading
    setTimeout(() => {
      this.register_process_service.setLoading(false);
    }, 0);
    // Di chuyển tới bước tiếp theo
    this.register_process_service.reset();
    this.register_process_service.getData();
    this.moveToSelectAvatarPage();
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectAvatarPage(): void {
    this.router.navigate(['dang-ky/chon-hinh-dai-dien']);
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['dang-ky/xac-nhan-email']);
  }
  ////////////////////////////////////////

}

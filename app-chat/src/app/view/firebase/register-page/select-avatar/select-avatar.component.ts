import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAccountService } from 'src/app/service/firebase/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/firebase/register-account/register-process.service';
import { SelectAvatarService } from 'src/app/service/firebase/register-account/select-avatar.service';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {

  // Link hình ảnh đại diện từ firebase
  public url_img_avatar: string;

  constructor(
    private register_account_service: RegisterAccountService,
    private router: Router,
    public register_process_service: RegisterProcessService,
    private select_avatar_service: SelectAvatarService,
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
        setTimeout(() => {
          this.register_process_service.reset();
          this.register_process_service.getData();
        }, 0);
        this.init();
      } else if (this.register_process_service.isXacNhanEmail()) {
        this.moveToVerifyEmailPage();
      }
    }
  }

  public init(): void {
    // Lấy hình đại diện của mã tài khoản đang đăng ký từ firebase
    if (this.select_avatar_service.layHinh == null) {
      this.getData();
    } else {
      this.select_avatar_service.layHinh.unsubscribe();
      this.getData();
    }
  }

  public getData() {
    this.select_avatar_service.layHinh = this.select_avatar_service.getImg().subscribe(snap => {
      // Tải
      let value = snap.payload.toJSON();
      this.url_img_avatar = value['link_hinh'];
      // Tải xong ẩn loading
      setTimeout(() => {
        this.register_process_service.setLoading(false);
      }, 0);
    });
  }

  public goNext(): void {
    localStorage.setItem("register-process", JSON.stringify("2"));
    this.register_process_service.reset();
    this.register_process_service.getData();
    this.moveToVerifyEmailPage();
  }

  public goBack(): void {
    localStorage.setItem("register-process", JSON.stringify("0"));
    this.register_process_service.reset();
    this.register_process_service.getData();
    this.moveToSelectSexPage();
  }

  public chonHinh(event) {
    // Tải hình lên firebase
    this.select_avatar_service.updateImageToFirebase(event.target.files.item(0));
  }

  public chonHinhTuMay(element: HTMLInputElement) {
    element.click();
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

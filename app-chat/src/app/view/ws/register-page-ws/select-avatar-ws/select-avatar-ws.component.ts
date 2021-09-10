import { SelectAvatarWsService } from './../../../../service/ws/register-account/select-avatar-ws.service';
import { RegisterProcessWsService } from './../../../../service/ws/register-account/register-process-ws.service';
import { RegisterAccountWsService } from './../../../../service/ws/register-account/register-account-ws.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-select-avatar-ws',
  templateUrl: './select-avatar-ws.component.html',
  styleUrls: ['./select-avatar-ws.component.scss']
})
export class SelectAvatarWsComponent implements OnInit {

   // Link hình ảnh đại diện từ firebase
   public url_img_avatar: string;

  constructor(
    public version_service: VersionService,
    private router: Router,
    public register_account_service_ws:RegisterAccountWsService,
    public register_process_service_ws:RegisterProcessWsService,
    public select_avatar_service_ws:SelectAvatarWsService
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
        setTimeout(() => {
          this.register_process_service_ws.reset();
          this.register_process_service_ws.getData();
        }, 0);
        this.init();
      } else if (this.register_process_service_ws.isXacNhanEmail()) {
        this.moveToVerifyEmailPage();
      }
    }
  }

  public init(): void {
    // Lấy hình đại diện của mã tài khoản đang đăng ký từ firebase
    if (this.select_avatar_service_ws.layHinh == null) {
      this.getData();
    } else {
      this.select_avatar_service_ws.layHinh.unsubscribe();
      this.getData();
    }
  }

  public getData() {
    this.select_avatar_service_ws.layHinh = this.select_avatar_service_ws.getImg().subscribe(snap => {
      // Tải
      let value = snap.payload.toJSON();
      this.url_img_avatar = value['link_hinh'];
      // Tải xong ẩn loading
      setTimeout(() => {
        this.register_process_service_ws.setLoading(false);
      }, 0);
    });
  }

  public goNext(): void {
    localStorage.setItem("register-process-ws", JSON.stringify("2"));
    this.register_process_service_ws.reset();
    this.register_process_service_ws.getData();
    this.moveToVerifyEmailPage();
  }

  public goBack(): void {
    localStorage.setItem("register-process-ws", JSON.stringify("0"));
    this.register_process_service_ws.reset();
    this.register_process_service_ws.getData();
    this.moveToSelectSexPage();
  }

  public chonHinh(event) {
    // Tải hình lên firebase
    this.select_avatar_service_ws.updateImageToFirebase(event.target.files.item(0));
  }

  public chonHinhTuMay(element: HTMLInputElement) {
    element.click();
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToSelectSexPage(): void {
    this.router.navigate(['dang-ky-ws/chon-gioi-tinh']);
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['dang-ky-ws/xac-nhan-email']);
  }
  ////////////////////////////////////////

}

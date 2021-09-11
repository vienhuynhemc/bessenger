import { RegisterProcessWsService } from './../../../../service/ws/register-account/register-process-ws.service';
import { RegisterAccountWsService } from './../../../../service/ws/register-account/register-account-ws.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/service/version/version.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-select-sex-ws',
  templateUrl: './select-sex-ws.component.html',
  styleUrls: ['./select-sex-ws.component.scss']
})
export class SelectSexWsComponent implements OnInit {

  constructor(
    public version_service: VersionService,
    private router: Router,
    public register_account_service_ws:RegisterAccountWsService,
    public register_process_service_ws:RegisterProcessWsService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
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
        setTimeout(() => {
          this.register_process_service_ws.reset();
          this.register_process_service_ws.getData();
        }, 0);
      } else if (this.register_process_service_ws.isChonHinhDaiDien()) {
        this.moveToSelectAvatarPage();
      } else if (this.register_process_service_ws.isXacNhanEmail()) {
        this.moveToVerifyEmailPage();
      }
    }
  }

  // Các hàm di chuyển trang
  moveToSelectAvatarPage(): void {
    this.router.navigate(['dang-ky-ws/chon-hinh-dai-dien']);
  }
  moveToVerifyEmailPage(): void {
    this.router.navigate(['dang-ky-ws/xac-nhan-email']);
  }

  public selectSex(gioiTinh: string) {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service_ws.setLoading(true);
    }, 0);
    // Cập nhật lại dữ liệu trong localStorage
    localStorage.setItem("register-process-ws", JSON.stringify("1"));
    setTimeout(() => {
      this.register_process_service_ws.reset();
      this.register_process_service_ws.getData();
    }, 0);
    // Tải hình mặt định tương ứng lên firebase và cập dữ liệu trong firebase
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
    this.register_account_service_ws.taiHinhMacDinhChoTaiKhoan(gioiTinh).subscribe(data => {
      let file: File = new File([data], ma_tai_khoan + ".png", { type: data.type });
      let filePath: string = "/tai_khoan_ws/" + ma_tai_khoan + ".png";
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
      uploadTask.snapshotChanges().pipe(
        finalize(
          () => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              let gioi_tinh_string: string = "Nam";
              if (gioiTinh == 'nu') {
                gioi_tinh_string = "Nữ";
              }
              this.db.object("/tai_khoan_ws/" + ma_tai_khoan).update({ hinh: filePath, link_hinh: downloadURL, gioi_tinh: gioi_tinh_string });
            });
          }
        )
      ).subscribe();
      uploadTask.percentageChanges().subscribe(percent => {
        console.log("Tiến độ tải hình giới tính: "+percent);
        if (percent == 100) {
          // Ẩn loading
          setTimeout(() => {
            this.register_process_service_ws.setLoading(false);
          }, 0);
          // Di chuyển tới bước tiếp theo
          this.register_process_service_ws.reset();
          this.register_process_service_ws.getData();
          this.moveToSelectAvatarPage();
        }
      });
    });
  }

}

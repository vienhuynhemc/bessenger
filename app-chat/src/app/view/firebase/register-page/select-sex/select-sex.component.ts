import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAccountService } from 'src/app/service/firebase/register-account/register-account.service';
import { RegisterProcessService } from 'src/app/service/firebase/register-account/register-process.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { VersionService } from 'src/app/service/version/version.service';

@Component({
  selector: 'app-select-sex',
  templateUrl: './select-sex.component.html',
  styleUrls: ['./select-sex.component.scss']
})
export class SelectSexComponent implements OnInit {

  constructor(
    private register_account_service: RegisterAccountService,
    private router: Router,
    public register_process_service: RegisterProcessService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
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
    this.register_account_service.taiHinhMacDinhChoTaiKhoan(gioiTinh).subscribe(data => {
      let file: File = new File([data], ma_tai_khoan + ".png", { type: data.type });
      let filePath: string = "/tai_khoan/" + ma_tai_khoan + ".png";
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
              this.db.object("/tai_khoan/" + ma_tai_khoan).update({ hinh: filePath, link_hinh: downloadURL, gioi_tinh: gioi_tinh_string });
            });
          }
        )
      ).subscribe();
      uploadTask.percentageChanges().subscribe(percent => {
        console.log("Tiến độ tải hình giới tính: "+percent);
        if (percent == 100) {
          // Ẩn loading
          setTimeout(() => {
            this.register_process_service.setLoading(false);
          }, 0);
          // Di chuyển tới bước tiếp theo
          this.register_process_service.reset();
          this.register_process_service.getData();
          this.moveToSelectAvatarPage();
        }
      });
    });
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

import { AngularFireStorage } from '@angular/fire/storage';
import { RegisterProcessService } from 'src/app/service/register-account/register-process.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectAvatarService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private register_process_service: RegisterProcessService
  ) { }

  public getImg() {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    return this.db.object("/tai_khoan/" + ma_tai_khoan).snapshotChanges();
  }

  public updateImageToFirebase(file): void {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    let filePath: string = "/tai_khoan/" + ma_tai_khoan + ".png";
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(
        () => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.db.object("/tai_khoan/" + ma_tai_khoan).update({ hinh: filePath, link_hinh: downloadURL });
          });
        }
      )
    ).subscribe();
    uploadTask.percentageChanges().subscribe(percent => {
      console.log("Tiến độ tải hình đại diện mới lên firebase: " + percent);
      if (percent == 100) {
        // Ẩn loading
        setTimeout(() => {
          this.register_process_service.setLoading(false);
        }, 0);
      }
    });
  }

}

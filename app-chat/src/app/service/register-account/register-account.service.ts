import { AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AccountWebservice } from 'src/app/models/regiser-account/account_webserivce';
import { RegisterObjectSendMail } from './../../models/regiser-account/register_object_send_mail';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterAccountService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";
  // Thông tin tài khoản mới
  private ma_tai_khoan: string;

  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.getData();
  }

  public sendMail(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmail.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient
      .get<any>(url);
  }

  public checkEmail(email: string): Observable<AccountWebservice[]> {
    const url = `${this.REST_API_SERVER}/kiem_tra_email.php?email=${email}`;
    return this.httpClient.get<any>(url);
  }

  public insertNewAccountToFirebase(ten: string, email: string, password: string, code: string): void {
    let currentTime = Number(new Date());
    // add database
    let tai_khoan = this.db.list("/tai_khoan");
    let new_account = tai_khoan.push(
      {
        ten: ten,
        email: email,
        ngay_tao: currentTime,
        mat_khau: password
      }
    );
    // local storage lưu mã tài khoản
    localStorage.setItem("ma_tai_khoan", JSON.stringify(new_account.key));
    this.getData();
    // Đẩy cho firebase cái hình mặt định
    this.taiHinhMacDinhChoTaiKhoan(new_account.key,"nam");
    // Thêm dữ liêu vô webservice
    this.themDuLieuTaiKhoanMoiWebservice(ten, email, password, code);
  }

  private themDuLieuTaiKhoanMoiWebservice(ten: string, email: string, password: string, code: string) {
    const url = `${this.REST_API_SERVER}/them_mot_tai_khoan_moi.php?code=${code}&&email=${email}&&ten=${ten}&&mat_khau=${password}&&ma_tai_khoan=${this.ma_tai_khoan}&&trang_thai_kich_hoat=chua`;
    this.httpClient.get(url).subscribe(data => { });
  }

  public taiHinhMacDinhChoTaiKhoan(ma_tai_khoan:string,gioi_tinh:string): void {
    // Tải hình từ assets
    let link_hinh:string = "assets/images/register-page/nam.png";
    let gioi_tinh_string:string = "Nam";
    if(gioi_tinh == "nu"){
      gioi_tinh_string = "Nữ"
      link_hinh = "assets/images/register-page/nu.png";
    }

    this.httpClient.get(link_hinh, { responseType: 'blob' }).subscribe(data => {
      let file: File = new File([data], ma_tai_khoan + ".png", { type: data.type });
      let filePath: string = "/tai_khoan/" + ma_tai_khoan + ".png";
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
      uploadTask.snapshotChanges().pipe(
        finalize(
          () => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              this.db.object("/tai_khoan/" + ma_tai_khoan).update({ hinh: filePath, link_hinh: downloadURL,gioi_tinh:gioi_tinh_string });
            });
          }
        )
      ).subscribe();
      uploadTask.percentageChanges().subscribe(percent => {
        // Percent là % tải hình
      });
    });
  }

  public getData(): void {
    this.ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
  }

  public isRegister(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan")) != null;
  }

  public list: any[];

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AccountWebservice } from 'src/app/models/regiser-account/account_webserivce';
import { RegisterObjectSendMail } from './../../models/regiser-account/register_object_send_mail';

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
  }

  public themDuLieuTaiKhoanMoiWebservice(ten: string, email: string, password: string, code: string,ma_tai_khoan:string) {
    const url = `${this.REST_API_SERVER}/them_mot_tai_khoan_moi.php?code=${code}&&email=${email}&&ten=${ten}&&mat_khau=${password}&&ma_tai_khoan=${ma_tai_khoan}&&trang_thai_kich_hoat=chua`;
    return this.httpClient.get(url);
  }

  public taiHinhMacDinhChoTaiKhoan(gioiTinh:string){
    // Tải hình từ assets
    let link_hinh:string = "assets/images/register-page/nam.png";
    return this.httpClient.get(link_hinh, { responseType: 'blob' });
  }

  public getData(): void {
    this.ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
  }

  public isRegister(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan")) != null;
  }

  public list: any[];

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';
import { AccountWebservice } from 'src/app/models/firebase/regiser-account/account_webserivce';

@Injectable({
  providedIn: 'root',
})
export class RegisterAccountService {
  private REST_API_SERVER = 'https://bessenger.000webhostapp.com';
  // Thông tin tài khoản mới
  private ma_tai_khoan: string;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.getData();
  }
  
  // truy cập vào id người dùng trong cài đặt ở database
  public accessSettings() {
    let maTaiKhoan = JSON.parse(localStorage.getItem('ma_tai_khoan'));
    return this.db.database.ref('cai_dat').child(maTaiKhoan);
  }
  public sendMail(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmail.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient.get<any>(url);
  }

  public sendMailQMK(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmailQMK.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient.get<any>(url);
  }

  public checkEmail(email: string): Observable<AccountWebservice[]> {
    const url = `${this.REST_API_SERVER}/kiem_tra_email.php?email=${email}`;
    return this.httpClient.get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem('ma_tai_khoan_qmk'));
    const url = `${this.REST_API_SERVER}/cap_nhat_code.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.httpClient.get<any>(url);
  }

  public insertNewAccountToFirebase(
    ten: string,
    email: string,
    password: string,
    code: string
  ): void {
    let currentTime = Number(new Date());
    // add database
    let tai_khoan = this.db.list('/tai_khoan');
    let new_account = tai_khoan.push({
      ten: ten,
      email: email,
      ngay_tao: currentTime,
      mat_khau: password,
      lan_cuoi_dang_nhap: currentTime,
    });
    // local storage lưu mã tài khoản
    localStorage.setItem('ma_tai_khoan', JSON.stringify(new_account.key));
    this.getData();
  }

  public themDuLieuTaiKhoanMoiWebservice(
    ten: string,
    email: string,
    password: string,
    code: string,
    ma_tai_khoan: string
  ) {
    const url = `${this.REST_API_SERVER}/them_mot_tai_khoan_moi.php?code=${code}&&email=${email}&&ten=${ten}&&mat_khau=${password}&&ma_tai_khoan=${ma_tai_khoan}&&trang_thai_kich_hoat=chua`;
    return this.httpClient.get(url);
  }

  public taiHinhMacDinhChoTaiKhoan(gioiTinh: string) {
    // Tải hình từ assets
    let link_hinh: string = 'assets/images/register-page/nam.png';
    if (gioiTinh == 'nu') {
      link_hinh = 'assets/images/register-page/nu.png';
    }
    return this.httpClient.get(link_hinh, { responseType: 'blob' });
  }

  public getData(): void {
    this.ma_tai_khoan = JSON.parse(localStorage.getItem('ma_tai_khoan'));
  }

  public isRegister(): boolean {
    return JSON.parse(localStorage.getItem('ma_tai_khoan')) != null;
  }

  public list: any[];
}

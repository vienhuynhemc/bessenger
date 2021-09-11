import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AccountWebservice } from 'src/app/models/firebase/regiser-account/account_webserivce';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountWsService {

  private REST_API_SERVER = 'https://bessenger.000webhostapp.com';
  // Thông tin tài khoản mới
  private ma_tai_khoan: string;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.getData();
  }

  public insertNewAccountToFirebase(
    ten: string,
    email: string,
    password: string,
    code: string
  ): void {
    let currentTime = Number(new Date());
    // add database
    let tai_khoan = this.db.list('/tai_khoan_ws');
    let new_account = tai_khoan.push({
      ten: ten,
      email: email,
      ngay_tao: currentTime,
      mat_khau: password,
      mat_khau_2: password,
      lan_cuoi_dang_nhap: currentTime,
    });
    // local storage lưu mã tài khoản
    localStorage.setItem('ma_tai_khoan_ws', JSON.stringify(new_account.key));
    this.getData();
  }

  public getData(): void {
    this.ma_tai_khoan = JSON.parse(localStorage.getItem('ma_tai_khoan_ws'));
  }

  public themDuLieuTaiKhoanMoiWebservice(
    ten: string,
    email: string,
    password: string,
    code: string,
    ma_tai_khoan: string
  ) {
    const url = `${this.REST_API_SERVER}/them_mot_tai_khoan_moi_ws.php?code=${code}&&email=${email}&&ten=${ten}&&mat_khau=${password}&&mat_khau_2=${password}&&ma_tai_khoan=${ma_tai_khoan}&&trang_thai_kich_hoat=chua`;
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

  public sendMail(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmail.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient.get<any>(url);
  }

  public isRegister(): boolean {
    return JSON.parse(localStorage.getItem('ma_tai_khoan_ws')) != null;
  }

  public accessSettings() {
    let maTaiKhoan = JSON.parse(localStorage.getItem('ma_tai_khoan_ws'));
    return this.db.database.ref('cai_dat_ws').child(maTaiKhoan);
  }

  public checkEmail(email: string): Observable<AccountWebservice[]> {
    const url = `${this.REST_API_SERVER}/kiem_tra_email_ws.php?email=${email}`;
    return this.httpClient.get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem('ma_tai_khoan_qmk_ws'));
    const url = `${this.REST_API_SERVER}/cap_nhat_code_ws.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.httpClient.get<any>(url);
  }

  public sendMailQMK(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmailQMK_ws.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient.get<any>(url);
  }


}

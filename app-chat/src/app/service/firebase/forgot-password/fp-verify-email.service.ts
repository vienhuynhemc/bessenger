import { FpProcessServiceService } from './fp-process-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RegisterProcessService } from '../register-account/register-process.service';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';

@Injectable({
  providedIn: 'root'
})
export class FpVerifyEmailService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private fp_process_service: FpProcessServiceService,
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { }

  public getEmail(): Observable<any> {
    // Hiện loading
    setTimeout(() => {
      this.fp_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk"));
    const url = `${this.REST_API_SERVER}/lay_email_tu_ma_tai_khoan.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http
      .get<any>(url);
  }

  public sendMailQMK(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmailQMK.php?code=${data.code}&&email=${data.email}`;
    return this.http
      .get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk"));
    const url = `${this.REST_API_SERVER}/cap_nhat_code.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http
      .get<any>(url);
  }


  public submit(code: string) {
    // Hiện loading
    setTimeout(() => {
      this.fp_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk"));
    const url = `${this.REST_API_SERVER}/kiem_tra_code.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http.get<any>(url);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';
import { FpProcessServiceWsService } from './fp-process-service-ws.service';

@Injectable({
  providedIn: 'root'
})
export class FpVerifyEmailWsService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private fp_process_service_ws: FpProcessServiceWsService,
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { }

  public getEmail(): Observable<any> {
    // Hiện loading
    setTimeout(() => {
      this.fp_process_service_ws.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws"));
    const url = `${this.REST_API_SERVER}/lay_email_tu_ma_tai_khoan_ws.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http
      .get<any>(url);
  }

  public sendMailQMK(data: RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmailQMK_ws.php?code=${data.code}&&email=${data.email}`;
    return this.http
      .get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws"));
    const url = `${this.REST_API_SERVER}/cap_nhat_code_ws.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http
      .get<any>(url);
  }

  public submit(code: string) {
    // Hiện loading
    setTimeout(() => {
      this.fp_process_service_ws.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws"));
    const url = `${this.REST_API_SERVER}/kiem_tra_code_ws.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http.get<any>(url);
  }
}

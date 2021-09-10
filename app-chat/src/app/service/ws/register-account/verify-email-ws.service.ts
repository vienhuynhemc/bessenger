import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RegisterProcessWsService } from './register-process-ws.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailWsService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private register_process_service_ws: RegisterProcessWsService,
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { }

  public submit(code: string) {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service_ws.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
    const url = `${this.REST_API_SERVER}/kiem_tra_code_ws.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http.get<any>(url);
  }

  public turnOnAccount() {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service_ws.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
    const url = `${this.REST_API_SERVER}/cap_nhat_trang_thai_kich_hoat_ws.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http.get<any>(url);
  }

  public getEmail(): Observable<any> {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service_ws.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
    const url = `${this.REST_API_SERVER}/lay_email_tu_ma_tai_khoan_ws.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http
      .get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
    const url = `${this.REST_API_SERVER}/cap_nhat_code_ws.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http
      .get<any>(url);
  }
}

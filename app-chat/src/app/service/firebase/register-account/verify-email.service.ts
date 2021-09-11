import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { RegisterProcessService } from './register-process.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private register_process_service: RegisterProcessService,
    private db: AngularFireDatabase,
    private http:HttpClient
  ) { }

  public getEmail(): Observable<any> {
    // Hiện loading
    setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    const url = `${this.REST_API_SERVER}/lay_email_tu_ma_tai_khoan.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http
      .get<any>(url);
  }

  public submit(code:string){
     // Hiện loading
     setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    const url = `${this.REST_API_SERVER}/kiem_tra_code.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http.get<any>(url);
  }

  public turnOnAccount(){
     // Hiện loading
     setTimeout(() => {
      this.register_process_service.setLoading(true);
    }, 0);
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    const url = `${this.REST_API_SERVER}/cap_nhat_trang_thai_kich_hoat.php?ma_tai_khoan=${ma_tai_khoan}`;
    return this.http.get<any>(url);
  }

  public updateEmail(code: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan"));
    const url = `${this.REST_API_SERVER}/cap_nhat_code.php?ma_tai_khoan=${ma_tai_khoan}&&code=${code}`;
    return this.http
      .get<any>(url);
  }
}

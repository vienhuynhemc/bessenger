import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginWsService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private http: HttpClient
  ) { }

  public isLogin(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws")) != null;
  }

  public checkEmail(email: string) {
    const url = `${this.REST_API_SERVER}/kiem_tra_email_dang_nhap_ws.php?email=${email}`;
    return this.http.get<any>(url);
  }

  public login(ma_tai_khoan:string,email:string): void {
    localStorage.setItem("ma_tai_khoan_dn_ws", JSON.stringify(ma_tai_khoan));
    localStorage.setItem("email_dn_ws",JSON.stringify(email));
  }

  public logOut(): void {
    localStorage.removeItem('ma_tai_khoan_dn_ws');
    localStorage.removeItem("email_dn_ws");
  }

}

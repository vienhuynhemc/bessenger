import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private http: HttpClient
  ) {
  }

  public checkEmail(email: string) {
    const url = `${this.REST_API_SERVER}/kiem_tra_email_dang_nhap.php?email=${email}`;
    return this.http.get<any>(url);
  }

  public logOut(): void {
    localStorage.removeItem('ma_tai_khoan_dn');
  }

  public isLogin(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan_dn")) != null;
  }

  public login(ma_tai_khoan:string): void {
    localStorage.setItem("ma_tai_khoan_dn", JSON.stringify(ma_tai_khoan));
  }

}

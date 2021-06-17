import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() {
  }

  public logOut(): void {
    localStorage.removeItem('ma_tai_khoan_dn');
  }

  public isLogin(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan_dn")) != null;
  }

  public login(): void {
    localStorage.setItem("ma_tai_khoan_dn", JSON.stringify("abc"));
  }

}

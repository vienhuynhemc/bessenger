import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogin: boolean;

  constructor() {
    this.isLogin = JSON.parse(localStorage.getItem('login'));
  }

  public isLoginSuccess(): boolean {
    return this.isLogin;
  }

  public logOut(): void {
    localStorage.removeItem('login');
  }

}

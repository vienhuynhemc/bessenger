import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogin: boolean;

  constructor() {
    this.getData();
  }

  public isLoginSuccess(): boolean {
    return this.isLogin;
  }

  public logOut(): void {
    localStorage.removeItem('login');
    this.getData();
  }

  public login(): void {
    localStorage.setItem('login', "true");
    this.getData();
  }

  public getData(): void {
    this.isLogin = JSON.parse(localStorage.getItem('login'));
  }

}

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FpServiceWsService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  public isQMK(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws")) != null;
  }

  public updatePassword(password: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws"));
    const url = `${this.REST_API_SERVER}/cap_nhat_password_ws.php?ma_tai_khoan=${ma_tai_khoan}&&mat_khau=${password}`;
    return this.http
      .get<any>(url);
  }

  public updatePasswordFirebase(mat_khau: string): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk_ws"));
    this.db.object("/tai_khoan_ws/" + ma_tai_khoan).update({ mat_khau_2: mat_khau });
  }
}

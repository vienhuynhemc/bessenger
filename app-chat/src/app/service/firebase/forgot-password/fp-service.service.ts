import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FpServiceService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  public isQMK(): boolean {
    return JSON.parse(localStorage.getItem("ma_tai_khoan_qmk")) != null;
  }

  public updatePassword(password: string) {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk"));
    const url = `${this.REST_API_SERVER}/cap_nhat_password.php?ma_tai_khoan=${ma_tai_khoan}&&mat_khau=${password}`;
    return this.http
      .get<any>(url);
  }

  public updatePasswordFirebase(mat_khau: string): void {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_qmk"));
    this.db.object("/tai_khoan/" + ma_tai_khoan).update({ mat_khau: mat_khau });
  }

}

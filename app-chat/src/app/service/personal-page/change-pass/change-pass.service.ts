import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {
  private REST_API_SERVER = 'https://bessenger.000webhostapp.com';

  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) { }

  public updatePass(pass: string, ma_tai_khoan: string) {
    const url = `${this.REST_API_SERVER}/cap_nhat_password.php?ma_tai_khoan=${ma_tai_khoan}&&mat_khau=${pass}`;
    return this.httpClient.get<any>(url);
  }
  public accesstai_khoan() {
    return this.db.database.ref('tai_khoan');
  }
}

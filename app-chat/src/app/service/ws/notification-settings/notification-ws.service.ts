import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationWsService {

  constructor(private db: AngularFireDatabase) { }
  public accessSettings(maTaiKhoan: string) {
    return this.db.database.ref('cai_dat_ws').child(maTaiKhoan);
  }
  
  public access_cuoc_tro_chuyen() {
    return this.db.database.ref('cuoc_tro_chuyen_ws');
  }

  public access_thanh_vien_cuoc_tro_chuyen() {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws');
  }

  public access_chi_tiet_cuoc_tro_chuyen() {
    return this.db.database.ref('chi_tiet_cuoc_tro_chuyen_ws');
  }

  public access_tai_khoan() {
    return this.db.database.ref('tai_khoan_ws');
  }
  
  public access_thong_tin_tro_chuyen_nhom() {
    return this.db.database.ref('thong_tin_tro_chuyen_nhom_ws');
  }
}

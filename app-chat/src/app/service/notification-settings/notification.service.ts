import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private db: AngularFireDatabase) { }
  public accessSettings(maTaiKhoan: string) {
    return this.db.database.ref('cai_dat').child(maTaiKhoan);
  }
  
  public access_cuoc_tro_chuyen() {
    return this.db.database.ref('cuoc_tro_chuyen');
  }

  public access_thanh_vien_cuoc_tro_chuyen() {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen');
  }

  public access_chi_tiet_cuoc_tro_chuyen() {
    return this.db.database.ref('chi_tiet_cuoc_tro_chuyen');
  }
}

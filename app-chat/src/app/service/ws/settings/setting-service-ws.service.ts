import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceWsService {

  private source = new BehaviorSubject('trang_thai_hoat_dong');
  public stateDefault = this.source.asObservable();
  stateStatus: string = 'tat'
  stateSetting: string = 'trang_thai_hoat_dong';
  constructor(private db: AngularFireDatabase) { }
  selectedStateNotification():void {
    this.source.next('thong_bao');
  }
  selectedStateStatus():void {
    this.source.next('trang_thai_hoat_dong');
  }
  selectedStateSupport():void {
    this.source.next('ho_tro');
  }
  

  public accessSettings(maTaiKhoan: string) {
    return this.db.database.ref('cai_dat_ws').child(maTaiKhoan);
  }

  public accessAcc() {
    return this.db.database.ref('tai_khoan_ws');
  }
  getStatusMe() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'));
    this.accessSettings(idUser).on('value', set => {
      this.stateStatus = set.val().trang_thai_hoat_dong;
    })
  }
}

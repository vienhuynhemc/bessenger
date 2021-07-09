import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecallMessengerService {

  public ma_tin_nhan:string;
  public ma_cuoc_tro_chuyen:string;
  public is_show:boolean;

  constructor(
    private db:AngularFireDatabase
  ) { }

  public thuHoi(){
    let currentTime = Number(new Date());
    this.db.object("/chi_tiet_cuoc_tro_chuyen/"+this.ma_cuoc_tro_chuyen+"/"+this.ma_tin_nhan).update({loai_tin_nhan:"thu_hoi",ngay_thu_hoi:currentTime});
    this.is_show =false;
    this.ma_cuoc_tro_chuyen =null;
    this.ma_cuoc_tro_chuyen = null;
  }

}

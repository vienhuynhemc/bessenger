import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class RecallMessengerWsService {

  public ma_tin_nhan:string;
  public ma_cuoc_tro_chuyen:string;
  public is_show:boolean;

   // lottie
   public options: AnimationOptions = {
    path: '/assets/json/lottie/thu_hoi.json',
  };

  constructor(
    private db:AngularFireDatabase
  ) { }

  public animationCreated(animationItem: AnimationItem): void {
  }


  public thuHoi(){
    let currentTime = Number(new Date());
    this.db.object("/chi_tiet_cuoc_tro_chuyen_ws/"+this.ma_cuoc_tro_chuyen+"/"+this.ma_tin_nhan).update({loai_tin_nhan:"thu_hoi",ngay_thu_hoi:currentTime});
    // thu hồi file đã gửi
    this.db.database.ref('file_da_gui_ws').child(this.ma_cuoc_tro_chuyen).child(this.ma_tin_nhan).once('value', result => {
        if(result.val() != null) {
          this.db.database.ref('file_da_gui_ws').child(this.ma_cuoc_tro_chuyen).child(this.ma_tin_nhan).update({
            ton_tai: 1
          })
        }
    })
    this.is_show =false;
    this.ma_cuoc_tro_chuyen =null;
    
  }
}

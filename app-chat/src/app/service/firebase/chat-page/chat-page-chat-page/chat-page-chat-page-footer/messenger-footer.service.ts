import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ObjectChatFooter } from 'src/app/models/firebase/chat-page/chat-page-chat-page/footer/object_chat_footer';

@Injectable({
  providedIn: 'root'
})
export class MessengerFooterService {

  public chenh_lech_height: number;
  public object_chat_footer: ObjectChatFooter;

  // service
  public layData: Subscription;

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.chenh_lech_height = 0;
    this.object_chat_footer = new ObjectChatFooter();
  }

  public getHeight(): string {
    return (633 - this.chenh_lech_height) + "px";
  }

  public getThongTinCoBan(id: string) {
    return this.db.object("/cuoc_tro_chuyen/" + id).snapshotChanges();
  }

  public dienThongTinCoBan(object: Object) {
    if (object != null) {
      this.object_chat_footer.loai = object['loai_cuoc_tro_truyen'];
      this.object_chat_footer.mau = object['mau'];
      this.object_chat_footer.mau_duoi = object['duoi'];
      this.object_chat_footer.mau_tren = object['mau_tren'];
      if(this.object_chat_footer.mau == '#3275f7'){
        this.object_chat_footer.mau =  'linear-gradient(0deg,#3275f7, #3275f7)';
        this.object_chat_footer.mau_tren = "#3275f7";
        this.object_chat_footer.mau_duoi = "#3275f7";
      }
      this.object_chat_footer.bieu_tuong_cam_xuc = object['bieu_tuong_cam_xuc'];
      this.object_chat_footer.bieu_tuong_cam_xuc_alt ="Gửi "+ object['bieu_tuong_cam_xuc_alt'];
    }
  }

}

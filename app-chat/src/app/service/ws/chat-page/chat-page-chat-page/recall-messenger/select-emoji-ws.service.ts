import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { EmojiMessenger } from 'src/app/models/firebase/chat-page/chat-page-chat-page/content/select-emoji/emoji_messenger';
import { CamXucTinNhanWS } from 'src/app/models/ws/chat-page/chat-page-chat-page/content/select-emoji/cam_xuc_tin_nhan_ws';
import { EmojiMessengerWS } from 'src/app/models/ws/chat-page/chat-page-chat-page/content/select-emoji/emoji_messenger_ws';

@Injectable({
  providedIn: 'root'
})
export class SelectEmojiWsService {
 // Danh sách emoji
 public emojis: EmojiMessengerWS[];

 // is show detail
 public is_show_detail: boolean;

 public arrays: CamXucTinNhanWS[];
 is_have_tim: boolean;
 is_have_cuoi: boolean;
 is_have_wow: boolean;
 is_have_buon: boolean;
 is_have_gian: boolean;
 is_have_like: boolean;
 is_have_dislike: boolean;
 public tim: CamXucTinNhanWS[];
 public cuoi: CamXucTinNhanWS[];
 public wow: CamXucTinNhanWS[];
 public buon: CamXucTinNhanWS[];
 public gian: CamXucTinNhanWS[];
 public like: CamXucTinNhanWS[];
 public dislike: CamXucTinNhanWS[];
 public count: number;
 public now: CamXucTinNhanWS[];
 public mtn: string;
 public mctc: string;

 // service
 public isLayThongTin: Subscription;

 constructor(
   private db: AngularFireDatabase
 ) {
   this.emojis = [];
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/32/2764.png", "tim"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t8e/1/32/1f606.png", "cuoi"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png", "wow"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tc8/1/32/1f622.png", "buon"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tc6/1/32/1f620.png", "gian"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tb6/1/32/1f44d.png", "like"));
   this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t37/1/32/1f44e.png", "dislike"));
   this.arrays = [];
   this.tim = [];
   this.cuoi = [];
   this.wow = [];
   this.gian = [];
   this.buon = [];
   this.like = [];
   this.dislike = [];
   this.now = [];
 }

 public openDetail(array: CamXucTinNhanWS[], mtn: string, mctc: string) {
   this.is_show_detail = !this.is_show_detail;
   this.arrays = array;
   this.mtn = mtn;
   this.mctc = mctc;
   this.update()
 }

 public update() {
   //reset
   this.is_have_buon = false;
   this.is_have_cuoi = false;
   this.is_have_dislike = false;
   this.is_have_wow = false;
   this.is_have_tim = false;
   this.is_have_like = false;
   this.is_have_gian = false;
   this.tim = [];
   this.cuoi = [];
   this.wow = [];
   this.gian = [];
   this.buon = [];
   this.like = [];
   this.dislike = [];
   // Lấy data
   if (this.isLayThongTin == null) {
     this.getData();
   } else {
     this.isLayThongTin.unsubscribe();
     this.getData();
   }
 }

 public getData() {
   this.isLayThongTin = this.db.object("/tai_khoan_ws").snapshotChanges().subscribe(data => {
     let object = data.payload.toJSON();
     Object.entries(object).forEach(([k, v]) => {
       for (let i = 0; i < this.arrays.length; i++) {
         if (this.arrays[i].ma_tai_khoan == k) {
           this.arrays[i].hinh = v['link_hinh'];
         }
       }
     });
     // new
     this.count = 0;
     this.now = this.arrays;
     let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
     for (let i = 0; i < this.arrays.length; i++) {
       if (this.arrays[i].ma_tai_khoan == mtk) {
         this.arrays[i].is_ban_than = true;
       }
       if (this.arrays[i].loai_cam_xuc == 'tim') {
         this.is_have_tim = true;
         this.tim.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'cuoi') {
         this.is_have_cuoi = true;
         this.cuoi.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'wow') {
         this.is_have_wow = true;
         this.wow.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'buon') {
         this.is_have_buon = true;
         this.buon.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'gian') {
         this.is_have_gian = true;
         this.gian.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'like') {
         this.is_have_like = true;
         this.like.push(this.arrays[i]);
       } else if (this.arrays[i].loai_cam_xuc == 'dislike') {
         this.is_have_dislike = true;
         this.dislike.push(this.arrays[i]);
       }
     }
   })
 }

 public closeDetail() {
   this.is_show_detail = false;
 }

 public select(i: number) {
   if (this.count != i) {
     this.count = i;
     if (this.count == 0) {
       this.now = this.arrays;
     } else if (this.count == 1) {
       this.now = this.tim;
     }
     else if (this.count == 2) {
       this.now = this.cuoi;
     }
     else if (this.count == 3) {
       this.now = this.wow;
     }
     else if (this.count == 4) {
       this.now = this.buon;
     }
     else if (this.count == 5) {
       this.now = this.gian;
     }
     else if (this.count == 6) {
       this.now = this.like;
     }
     else if (this.count == 7) {
       this.now = this.dislike;
     }
   }
 }

 public go(item: CamXucTinNhanWS, i: number) {
   if (item.is_ban_than) {
     let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
     this.db.object("/chi_tiet_cuoc_tro_chuyen_ws/" + this.mctc + "/" + this.mtn + "/cam_xuc_tin_nhan/" +mtk).remove();
     this.is_show_detail =false;
   }
 }
}

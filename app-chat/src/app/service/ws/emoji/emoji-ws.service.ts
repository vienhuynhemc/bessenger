import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EmojiObjectWS } from 'src/app/models/ws/emoji/emoji_object_ws';

@Injectable({
  providedIn: 'root'
})
export class EmojiWsService {

  
  public mat_cuois: EmojiObjectWS[];
  public dong_vats: EmojiObjectWS[];
  public rau_cus: EmojiObjectWS[];
  public do_chois: EmojiObjectWS[];
  public du_lichs: EmojiObjectWS[];
  public bong_dens: EmojiObjectWS[];
  public dinh_kems: EmojiObjectWS[];
  public cos: EmojiObjectWS[];
  public lich_sus: EmojiObjectWS[];


  constructor(
    private db: AngularFireDatabase,
  ) {
    this.mat_cuois = [];
    this.dong_vats = [];
    this.rau_cus = [];
    this.do_chois = [];
    this.du_lichs = [];
    this.bong_dens = [];
    this.dinh_kems = [];
    this.cos = [];
    this.lich_sus = [];
    this.getMatCuoi().subscribe(data => { this.dienMatCuoi(data.payload.toJSON()) });
    this.getDongVat().subscribe(data => this.dienDongVat(data.payload.toJSON()));
    this.getRauCu().subscribe(data => this.dienRauCu(data.payload.toJSON()));
    this.getDoChoi().subscribe(data => this.dienDoChoi(data.payload.toJSON()));
    this.getDuLich().subscribe(data => this.dienDuLich(data.payload.toJSON()));
    this.getBongDen().subscribe(data => this.dienBongDen(data.payload.toJSON()));
    this.getDinhKem().subscribe(data => this.dienDinhKem(data.payload.toJSON()));
    this.getCo().subscribe(data => this.dienCo(data.payload.toJSON()));
    this.getLichSu().subscribe(data => this.dienLichSu(data.payload.toJSON()));
  }

  public isOKe() {
    return this.mat_cuois.length != 0 && this.dong_vats.length != 0 && this.rau_cus.length != 0
      && this.do_chois.length != 0 && this.du_lichs.length != 0 && this.bong_dens.length != 0 && this.dinh_kems.length != 0
      && this.cos.length != 0;
  }

  public getMatCuoi() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEOvwkIoeSqi_ux0x/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienMatCuoi(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEOvwkIoeSqi_ux0x";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.mat_cuois = mat_cuois;
  }

  public getDongVat() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP0BTjcDApLk99KI/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDongVat(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP0BTjcDApLk99KI";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.dong_vats = mat_cuois;
  }

  public getRauCu() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP1vZh0K_7iUbtGX/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienRauCu(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP1vZh0K_7iUbtGX";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.rau_cus = mat_cuois;
  }

  public getDoChoi() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP39ma6Q-HHEV6ts/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDoChoi(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP39ma6Q-HHEV6ts";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.do_chois = mat_cuois;
  }

  public getDuLich() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP4Xr2MzhBRuyUCj/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDuLich(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP4Xr2MzhBRuyUCj";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.du_lichs = mat_cuois;
  }

  public getBongDen() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP641-Cyy1KS2aua/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienBongDen(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP641-Cyy1KS2aua";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.bong_dens = mat_cuois;
  }

  public getDinhKem() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEP9AplzMgsIJ8KGE/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDinhKem(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEP9AplzMgsIJ8KGE";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.dinh_kems = mat_cuois;
  }

  public getCo() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdSEPDnUhKtt-g-DvZp/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienCo(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObjectWS();
      element.ma_nhom = "-MdSEPDnUhKtt-g-DvZp";
      element.ma_emoji = id;
      element.src = data['src'];
      element.alt = data['alt'];
      mat_cuois.push(element);
    });
    this.cos = mat_cuois;
  }

  public getLichSu() {
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    return this.db.object("/lich_su_su_dung_bieu_tuong_cam_xuc_ws/" + mtk).snapshotChanges();
  }

  public dienLichSu(object: Object) {
    let mat_cuois: EmojiObjectWS[] = [];
    if (object != null) {
      Object.entries(object).forEach(([id, data]) => {
        let element = new EmojiObjectWS();
        element.ma_nhom = data['ma_nhom'];
        element.ma_emoji = data['ma_emoji'];
        element.src = data['src'];
        element.alt = data['alt'];
        mat_cuois.push(element);
      });
    }
    this.lich_sus = mat_cuois;
  }

  public updateHistory(item: EmojiObjectWS) {
    // check thử lịch sử tồn tại chưa
    let index = this.isExistsInHistory(item);
    if (index == -1) {
      if (this.lich_sus.length < 8) {
        this.lich_sus.unshift(item);
      } else {
        this.lich_sus.pop();
        this.lich_sus.unshift(item);
      }
    } else {
      this.lich_sus.splice(index, 1);
      this.lich_sus.unshift(item);
    }
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    return this.db.object("/lich_su_su_dung_bieu_tuong_cam_xuc_ws/" + mtk).set(this.lich_sus);
  }

  public isExistsInHistory(item: EmojiObjectWS): number {
    for (let i = 0; i < this.lich_sus.length; i++) {
      if (item.ma_emoji == this.lich_sus[i].ma_emoji) {
        return i;
      }
    }
    return -1;
  }
}

import { EmojiObject } from './../../models/emoji/emoji_object';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  public mat_cuois: EmojiObject[];
  public dong_vats: EmojiObject[];
  public rau_cus: EmojiObject[];
  public do_chois: EmojiObject[];
  public du_lichs: EmojiObject[];
  public bong_dens: EmojiObject[];
  public dinh_kems: EmojiObject[];
  public cos: EmojiObject[];
  public lich_sus: EmojiObject[];


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
    this.getMatCuoi().subscribe(data => this.dienMatCuoi(data.payload.toJSON()));
    this.getDongVat().subscribe(data => this.dienDongVat(data.payload.toJSON()));
    this.getRauCu().subscribe(data => this.dienRauCu(data.payload.toJSON()));
    this.getDoChoi().subscribe(data => this.dienDoChoi(data.payload.toJSON()));
    this.getDuLich().subscribe(data => this.dienDuLich(data.payload.toJSON()));
    this.getBongDen().subscribe(data => this.dienBongDen(data.payload.toJSON()));
    this.getDinhKem().subscribe(data => this.dienDinhKem(data.payload.toJSON()));
    this.getCo().subscribe(data => this.dienCo(data.payload.toJSON()));
    this.getLichSu().subscribe(data => this.dienLichSu(data.payload.toJSON()));
  }

  public getMatCuoi() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfZ_8JsXgwng_mE8/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienMatCuoi(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfZ_8JsXgwng_mE8";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.mat_cuois = mat_cuois;
  }

  public getDongVat() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfeR6vilqJpQKff6/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDongVat(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfeR6vilqJpQKff6";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.dong_vats = mat_cuois;
  }

  public getRauCu() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfgxHMLb9MRJLojG/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienRauCu(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfgxHMLb9MRJLojG";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.rau_cus = mat_cuois;
  }

  public getDoChoi() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfiuOdR5CxjxvjUk/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDoChoi(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfiuOdR5CxjxvjUk";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.do_chois = mat_cuois;
  }

  public getDuLich() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfl7yjPiksocB0d7/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDuLich(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfl7yjPiksocB0d7";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.du_lichs = mat_cuois;
  }

  public getBongDen() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfnTICbGaUkqlCPx/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienBongDen(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfnTICbGaUkqlCPx";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.bong_dens = mat_cuois;
  }

  public getDinhKem() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfr2oR7uV3xwJTkM/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienDinhKem(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfr2oR7uV3xwJTkM";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.dinh_kems = mat_cuois;
  }

  public getCo() {
    return this.db.object("/bieu_tuong_cam_xuc/-MdDKfyoopg0XaS-7kbA/danh_sach_bieu_tuong").snapshotChanges();
  }

  public dienCo(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    Object.entries(object).forEach(([id, data]) => {
      let element = new EmojiObject();
      element.ma_nhom = "-MdDKfyoopg0XaS-7kbA";
      element.ma_emoji = id;
      element.src = data['src'];
      mat_cuois.push(element);
    });
    this.cos = mat_cuois;
  }

  public getLichSu() {
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/lich_su_su_dung_bieu_tuong_cam_xuc/" + mtk).snapshotChanges();
  }

  public dienLichSu(object: Object) {
    let mat_cuois: EmojiObject[] = [];
    if (object != null) {
      Object.entries(object).forEach(([id, data]) => {
        let element = new EmojiObject();
        element.ma_nhom = data['ma_nhom'];
        element.ma_emoji = data['ma_emoji'];
        element.src = data['src'];
        mat_cuois.push(element);
      });
    }
    this.lich_sus = mat_cuois;
  }

  public updateHistory(item: EmojiObject) {
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
    let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/lich_su_su_dung_bieu_tuong_cam_xuc/" + mtk).set(this.lich_sus);
  }

  public isExistsInHistory(item: EmojiObject): number {
    for (let i = 0; i < this.lich_sus.length; i++) {
      if (item.ma_emoji == this.lich_sus[i].ma_emoji) {
        return i;
      }
    }
    return -1;
  }
}

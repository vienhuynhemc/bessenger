import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public img:string;

  // Mục đích để xử tô xanh cái icon bên trái
  private trang_chu_duoc_chon: boolean;
  private tin_nhan_duoc_chon: boolean;
  private tin_nhan_an_duoc_chon: boolean;
  private ban_be_duoc_chon: boolean;
  private thong_tin_ca_nhan_duoc_chon: boolean;
  private cai_dat_duoc_chon: boolean;

  // Service
  // 1. Lấy hình
  public layHinh:Subscription;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.trang_chu_duoc_chon = false;
    this.tin_nhan_duoc_chon = false;
    this.tin_nhan_an_duoc_chon = false;
    this.ban_be_duoc_chon = false;
    this.thong_tin_ca_nhan_duoc_chon = false;
    this.cai_dat_duoc_chon = false;
    this.updateOnline();
  }

  public getImg(){
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
    return this.db.object("/tai_khoan/"+ma_tai_khoan).snapshotChanges();
  }

  public setImg(object:Object){
    this.img = object['link_hinh'];
  }

  public updateOnline(): void {
    setTimeout(() => {
      let currentTime = Number(new Date());
      let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
      if (ma_tai_khoan != null) {
        this.db.object("/lan_cuoi_dang_nhap/" + ma_tai_khoan).update({ lan_cuoi_dang_nhap: currentTime });
      }
      this.updateOnline();
    }, 5000);
  }

  public selectTrangChu(): void {
    this.trang_chu_duoc_chon = true;
  }

  public selectPersonalPage(): void {
    this.thong_tin_ca_nhan_duoc_chon = true;
  }

  public selectSettingPage(): void {
    this.cai_dat_duoc_chon = true;
  }

  public selectFriendsPage(): void {
    this.ban_be_duoc_chon = true;
  }

  public selectChatRequestPage(): void {
    this.tin_nhan_an_duoc_chon = true;
  }

  public selectChatPage(): void {
    this.tin_nhan_duoc_chon = true;
  }

  public reset(): void {
    this.trang_chu_duoc_chon = false;
    this.tin_nhan_duoc_chon = false;
    this.tin_nhan_an_duoc_chon = false;
    this.ban_be_duoc_chon = false;
    this.thong_tin_ca_nhan_duoc_chon = false;
    this.cai_dat_duoc_chon = false;
  }

  public isSelectHomePage(): boolean {
    return this.trang_chu_duoc_chon;
  }

  public isSelectChatPage(): boolean {
    return this.tin_nhan_duoc_chon;
  }

  public isSelectChatRequestPage(): boolean {
    return this.tin_nhan_an_duoc_chon;
  }

  public isSelectFriendsPage(): boolean {
    return this.ban_be_duoc_chon;
  }

  public isSelectPersonalPage(): boolean {
    return this.thong_tin_ca_nhan_duoc_chon;
  }

  public isSelectSettingPage(): boolean {
    return this.cai_dat_duoc_chon;
  }

}

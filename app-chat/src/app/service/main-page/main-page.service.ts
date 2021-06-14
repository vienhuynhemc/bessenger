import { Injectable, OnChanges, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  // Mục đích để xử tô xanh cái icon bên trái
  private trang_chu_duoc_chon: boolean;
  private tin_nhan_duoc_chon: boolean;
  private tin_nhan_an_duoc_chon: boolean;
  private ban_be_duoc_chon: boolean;
  private thong_tin_ca_nhan_duoc_chon: boolean;
  private cai_dat_duoc_chon: boolean;

  constructor() {
    this.trang_chu_duoc_chon = false;
    this.tin_nhan_duoc_chon = false;
    this.tin_nhan_an_duoc_chon = false;
    this.ban_be_duoc_chon = false;
    this.thong_tin_ca_nhan_duoc_chon = false;
    this.cai_dat_duoc_chon = false;
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

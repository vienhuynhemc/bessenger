import { Injectable } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class ChatPageProcessServiceWsService {

  private chon_gioi_tinh_duoc_chon: boolean;
  private chon_hinh_dai_dien_duoc_chon: boolean;
  private xac_nhan_email_chon: boolean;
  private isLoading: boolean;
  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  constructor() {
    this.chon_gioi_tinh_duoc_chon = false;
    this.chon_hinh_dai_dien_duoc_chon = false;
    this.xac_nhan_email_chon = false;
    this.getData();
  }

  public animationCreated(animationItem: AnimationItem): void {
  }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };

  public getData(): void {
    this.reset();
    let count = JSON.parse(localStorage.getItem("register-process"));
    if (count == "0") {
      this.chon_gioi_tinh_duoc_chon = true;
    } else if (count == "1") {
      this.chon_hinh_dai_dien_duoc_chon = true;
    } else if (count == "2") {
      this.xac_nhan_email_chon = true;
    }
  }

  public reset(): void {
    this.chon_gioi_tinh_duoc_chon = false;
    this.chon_hinh_dai_dien_duoc_chon = false;
    this.xac_nhan_email_chon = false;
  }

  public isChonGioiTinh(): boolean {
    return this.chon_gioi_tinh_duoc_chon;
  }

  public isChonHinhDaiDien(): boolean {
    return this.chon_hinh_dai_dien_duoc_chon;
  }

  public isXacNhanEmail(): boolean {
    return this.xac_nhan_email_chon;
  }
}

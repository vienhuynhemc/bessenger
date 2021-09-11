import { Injectable } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class FpProcessServiceWsService {

  private chon_mat_khau_duoc_chon: boolean;
  private xac_nhan_email_chon: boolean;
  private isLoading: boolean;
  // lottie
  public optionsLoading: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  constructor() {
    this.chon_mat_khau_duoc_chon = false;
    this.xac_nhan_email_chon = false;
    this.getData();
  }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };

  public getData(): void {
    this.reset();
    let count = JSON.parse(localStorage.getItem("qmk-process-ws"));
    if (count == "0") {
      this.xac_nhan_email_chon = true;
    } else if (count == "1") {
      this.chon_mat_khau_duoc_chon = true;
    }
  }

  public reset(): void {
    this.xac_nhan_email_chon = false;
    this.chon_mat_khau_duoc_chon = false;
  }


  public isChonMatKhau(): boolean {
    return this.chon_mat_khau_duoc_chon;
  }

  public isXacNhanEmail(): boolean {
    return this.xac_nhan_email_chon;
  }


  public animationCreatedLoading(animationItem: AnimationItem): void {
  }
}

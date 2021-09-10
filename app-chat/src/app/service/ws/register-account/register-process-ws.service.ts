import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterProcessWsService {

  private chon_gioi_tinh_duoc_chon: boolean;
  private chon_hinh_dai_dien_duoc_chon: boolean;
  private xac_nhan_email_chon: boolean;
  private isLoading: boolean;

  constructor() {
    this.chon_gioi_tinh_duoc_chon = false;
    this.chon_hinh_dai_dien_duoc_chon = false;
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
    let count = JSON.parse(localStorage.getItem("register-process-ws"));
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

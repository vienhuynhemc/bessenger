import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Persional } from 'src/app/models/firebase/persional/persional';

@Injectable({
  providedIn: 'root'
})
export class PersionalService {
  persional: Persional = new Persional();
  private isLoading: boolean;

  constructor(private db: AngularFireDatabase) { }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };
  
  accesstai_khoan() {
    return this.db.database.ref('tai_khoan');
  }
  getProfile() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'))
    setTimeout(() => {
      this.setLoading(true)
    }, 0);
    this.accesstai_khoan().child(parseIDUser).on('value', profile => {
      this.persional.email = profile.val().email;
      this.persional.sex = profile.val().gioi_tinh;
      this.persional.picture = profile.val().hinh;
      this.persional.linkPicture = profile.val().link_hinh;
      this.persional.pass = profile.val().mat_khau;
      this.persional.dateCreate = profile.val().ngay_tao;
      this.persional.name = profile.val().ten;
      setTimeout(() => {
        this.setLoading(false)
      }, 0);
    }) 
  }
}

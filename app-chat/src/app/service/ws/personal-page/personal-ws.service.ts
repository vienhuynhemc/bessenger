import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { PersonalWS } from 'src/app/models/ws/personal/personal_ws';

@Injectable({
  providedIn: 'root'
})
export class PersonalWsService {
  persional: PersonalWS = new PersonalWS();
  private isLoading: boolean;

  constructor(private db: AngularFireDatabase) { }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };
  
  accesstai_khoan() {
    return this.db.database.ref('tai_khoan_ws');
  }
  getProfile() {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'))
    setTimeout(() => {
      this.setLoading(true)
    }, 0);
    this.accesstai_khoan().child(parseIDUser).on('value', profile => {
      this.persional.email = profile.val().email;
      this.persional.sex = profile.val().gioi_tinh;
      this.persional.picture = profile.val().hinh;
      this.persional.linkPicture = profile.val().link_hinh;
      this.persional.pass = profile.val().mat_khau_2;
      this.persional.dateCreate = profile.val().ngay_tao;
      this.persional.name = profile.val().ten;
      setTimeout(() => {
        this.setLoading(false)
      }, 0);
    }) 
  }
}

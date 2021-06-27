import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MessengerFooterService {

  public chenh_lech_height: number;

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.chenh_lech_height = 0;
  }

  public getHeight(): string {
    return (633 - this.chenh_lech_height) + "px";
  }

}

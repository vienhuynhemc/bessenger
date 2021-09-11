import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceWsService {

  private source = new BehaviorSubject('trang_thai_hoat_dong');
  public stateDefault = this.source.asObservable();
  stateStatus: string = 'tat'
  stateSetting: string = 'trang_thai_hoat_dong';
  constructor(private db: AngularFireDatabase) { }

  selectedStateStatus():void {
    this.source.next('trang_thai_hoat_dong');
  }
}

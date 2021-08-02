import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {
  private source = new BehaviorSubject('trang_thai_hoat_dong');
  public stateDefault = this.source.asObservable();
  constructor() { }
  selectedStateNotification():void {
    this.source.next('thong_bao');
  }
  selectedStateStatus():void {
    this.source.next('trang_thai_hoat_dong');
  }
  selectedStateSupport():void {
    this.source.next('ho_tro');
  }
}

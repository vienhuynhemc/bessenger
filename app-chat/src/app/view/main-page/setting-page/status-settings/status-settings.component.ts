import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Setting } from 'src/app/models/settings/setting';
import { SettingsServiceService } from 'src/app/service/settings/settings-service.service';

@Component({
  selector: 'app-status-settings',
  templateUrl: './status-settings.component.html',
  styleUrls: ['./status-settings.component.scss']
})
export class StatusSettingsComponent implements OnInit,OnDestroy {
  constructor(private settings_service: SettingsServiceService) { }
  stateSubscription: Subscription;
  state: string = ''
  settingObject: Setting = new Setting();
  ngOnInit(): void {
    this.changeState()
    this.getSetting()
    
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
  getSetting() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.settings_service.accessSettings(idUser).on('value', set =>{ 
      this.settingObject = new Setting()
      this.settingObject.ma_tai_khoan = set.key
      this.settingObject.am_thanh_thong_bao = set.val().am_thanh_thong_bao;
      this.settingObject.hien_thi_ban_xem_truoc = set.val().hien_thi_ban_xem_truoc;
      this.settingObject.khong_lam_phien = set.val().khong_lam_phien;
      this.settingObject.trang_thai_hoat_dong = set.val().trang_thai_hoat_dong;
      
    })
  }
  
  // đặt lại trạng thái hoạt động
  changeStatusOnline(state: string) {
    if(state != this.settingObject.trang_thai_hoat_dong) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        trang_thai_hoat_dong: state
      })
    }
  }
  // cài đặt thông báo
  changeNotification(state: string) {
    if(state != this.settingObject.khong_lam_phien) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        khong_lam_phien: state
      })
    }
  }
  // cài đặt âm thanh thông báo
  changeSoundNotification(state: string) {
    if(state != this.settingObject.am_thanh_thong_bao) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        am_thanh_thong_bao: state
      })
    }
  }
  // cài đặt hiển thị văn bản xem trước thông báo
  changeDisplayContentMessageNotification(state: string) {
    if(state != this.settingObject.hien_thi_ban_xem_truoc) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        hien_thi_ban_xem_truoc: state
      })
    }
  }
  changeState(){
    this.stateSubscription = this.settings_service.stateDefault.subscribe((state)=> {
      const scroll = document.getElementById('content')
      this.state = state
      if(state == 'trang_thai_hoat_dong' || state == 'cai_dat') {
        scroll.scrollTop = 0
      } else if( state == 'thong_bao') {
        scroll.scrollTop = 202
      } else {
        scroll.scrollTop = 99999
      }
    })
  }
}

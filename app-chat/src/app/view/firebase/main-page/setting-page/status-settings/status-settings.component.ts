import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Setting } from 'src/app/models/firebase/settings/setting';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';

@Component({
  selector: 'app-status-settings',
  templateUrl: './status-settings.component.html',
  styleUrls: ['./status-settings.component.scss'],
})
export class StatusSettingsComponent implements OnInit, OnDestroy {
  constructor(
    private settings_service: SettingsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  state: string = 'trang_thai_hoat_dong';
  stateSubscription: Subscription;
  settingObject: Setting = new Setting();
  ngOnInit(): void {
    this.changeState();
    this.getSetting();
  }

  ngOnDestroy(): void {
    if(this.stateSubscription != undefined)
    this.stateSubscription.unsubscribe();
  }

  getSetting() {
    let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.settings_service.accessSettings(idUser).on('value', (set) => {
      this.settingObject = new Setting();
      this.settingObject.ma_tai_khoan = set.key;
      this.settingObject.am_thanh_thong_bao = set.val().am_thanh_thong_bao;
      this.settingObject.hien_thi_ban_xem_truoc =
        set.val().hien_thi_ban_xem_truoc;
      this.settingObject.khong_lam_phien = set.val().khong_lam_phien;
      this.settingObject.trang_thai_hoat_dong = set.val().trang_thai_hoat_dong;
    });
  }

  // đặt lại trạng thái hoạt động
  changeStatusOnline(state: string) {
    if (state != this.settingObject.trang_thai_hoat_dong) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        trang_thai_hoat_dong: state,
      });
    }
  }
  // cài đặt thông báo
  changeNotification(state: string) {
    if (state != this.settingObject.khong_lam_phien) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      // nếu chưa cho phép bật thông báo thì hiển thị
      if (Notification.permission != 'granted' && state == 'tat') {
        Notification.requestPermission().then((permission) => {
          // nếu cho phép hiển thị
          if (permission == 'granted') {
            this.settings_service.accessSettings(idUser).update({
              khong_lam_phien: state,
            });
             // reload để cập nhật lại cài đặt
             location.reload()
          } else {
            // hiển thị thông báo khi không cho gg gửi thông báo
            let error = document.getElementById('error-block');
            error.style.display = 'block';
          }
        });
      } else {
        this.settings_service.accessSettings(idUser).update({
          khong_lam_phien: state,
        });
         // reload để cập nhật lại cài đặt
         location.reload()
      }
    }
  }
  // cài đặt âm thanh thông báo
  changeSoundNotification(state: string) {
    if (state != this.settingObject.am_thanh_thong_bao) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        am_thanh_thong_bao: state,
      });
       // reload để cập nhật lại cài đặt
       location.reload()
    }
  }
  // cài đặt hiển thị văn bản xem trước thông báo
  changeDisplayContentMessageNotification(state: string) {
    if (state != this.settingObject.hien_thi_ban_xem_truoc) {
      let idUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
      this.settings_service.accessSettings(idUser).update({
        hien_thi_ban_xem_truoc: state,
      });
       // reload để cập nhật lại cài đặt
       location.reload()
    }
  }
  
  changeState() {
    this.stateSubscription = this.settings_service.stateDefault.subscribe(
      (state) => {
        const scroll = document.getElementById('content');
        scroll.style.scrollBehavior = 'auto'
        if(this.state != state) {
          this.state = state
          if(state == 'trang_thai_hoat_dong' && (scroll.scrollTop == 0 || scroll.scrollTop < 250 || scroll.scrollTop > 320))
            scroll.scrollTop = 0;
          else if( state == 'thong_bao' && (scroll.scrollTop <= 250  || scroll.scrollTop > 320) )
            scroll.scrollTop = 250;
          else if(state == 'ho_tro' && scroll.scrollTop <= 320 )
            scroll.scrollTop = 9999;
        }
        
      }
    );
  }

  public eventScroll(event) {
    const scroll = document.getElementById('content');
    let allElement = document.querySelectorAll('section');
    
    let i = 0;
    allElement.forEach((element) => {
      let elementTop = element.offsetTop;
      if (scroll.scrollTop >= elementTop) {
        i++;
      }
    });
   
    if(i == 0 && scroll.scrollTop >= 0 ) {
      this.changeStateScroll('trang_thai_hoat_dong')
    } else if(i == 1 && scroll.scrollTop >= 220) {
      this.changeStateScroll('thong_bao')
    } else  if(i == 2 && scroll.scrollTop >= 370 ){
      this.changeStateScroll('ho_tro')
    }

  }
  changeStateScroll(state: string) {
    this.settings_service.stateSetting = state;
  
    if (state == 'trang_thai_hoat_dong') {
      this.settings_service.selectedStateStatus();
      this.router.navigate(['trang-thai-hoat-dong/'], {
        relativeTo: this.route,
      });
    } else if (state == 'thong_bao') {
      this.settings_service.selectedStateNotification();
      this.router.navigate(['thong-bao/'], { relativeTo: this.route });
    } else {
      this.settings_service.selectedStateSupport();
      this.router.navigate(['ho-tro/'], { relativeTo: this.route });
    }
  }
}

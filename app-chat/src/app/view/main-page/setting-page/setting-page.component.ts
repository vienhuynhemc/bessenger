import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainPageService } from 'src/app/service/firebase/main-page/main-page.service';
import { SettingsServiceService } from 'src/app/service/firebase/settings/settings-service.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
})
export class SettingPageComponent implements OnInit {
  stateSubscription: Subscription;
  constructor(
    private main_page_service: MainPageService,
    public settings_service: SettingsServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectSettingPage();
    }, 0);
    this.reloadChangeState()
  }
  reloadChangeState() {
    let pathName = window.location.pathname;
    if(pathName == '/bessenger/cai-dat/trang-thai-hoat-dong') {
      this.settings_service.stateSetting = 'trang_thai_hoat_dong';
      this.settings_service.selectedStateStatus();
    } else if(pathName == '/bessenger/cai-dat/thong-bao') {
      this.settings_service.stateSetting = 'thong_bao';
      this.settings_service.selectedStateNotification();
    } else if(pathName == '/bessenger/cai-dat/ho-tro') {
      this.settings_service.stateSetting = 'ho_tro';
      this.settings_service.selectedStateSupport();
    }
  }
  clickChangeState(state: string) {
    this.settings_service.stateSetting = state;
    if (state == 'trang_thai_hoat_dong') {
      this.settings_service.selectedStateStatus();
      this.router.navigate(['trang-thai-hoat-dong/'], { relativeTo: this.route});
    } else if (state == 'thong_bao') {
      this.settings_service.selectedStateNotification();
      this.router.navigate(['thong-bao/'], { relativeTo: this.route});
    } else {
      this.settings_service.selectedStateSupport();
      this.router.navigate(['ho-tro/'], { relativeTo: this.route});
    }
  }
  
}

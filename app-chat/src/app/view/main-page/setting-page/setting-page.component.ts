import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';
import { SettingsServiceService } from 'src/app/service/settings/settings-service.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {
  state: string = 'trang_thai_hoat_dong'
  constructor(private main_page_service: MainPageService, private settings_service: SettingsServiceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectSettingPage();
    }, 0);
  }
  clickChangeState(state: string) {
    this.state = state
    if(state == 'trang_thai_hoat_dong') {
      this.settings_service.selectedStateStatus()
    } else if( state == 'thong_bao') {
      this.settings_service.selectedStateNotification()
    } else {
      this.settings_service.selectedStateSupport()
    }
  }
}

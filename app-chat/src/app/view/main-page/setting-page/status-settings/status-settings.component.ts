import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsServiceService } from 'src/app/service/settings/settings-service.service';

@Component({
  selector: 'app-status-settings',
  templateUrl: './status-settings.component.html',
  styleUrls: ['./status-settings.component.scss']
})
export class StatusSettingsComponent implements OnInit {
  constructor(private settings_service: SettingsServiceService) { }
  stateSubscription: Subscription;
  state: string = ''
  ngOnInit(): void {
    this.changeState()
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
  changeState(){
    this.stateSubscription = this.settings_service.stateDefault.subscribe((state)=> {
      console.log(state)
      const scroll = document.getElementById('content')
      this.state = state
      if(state == 'trang_thai_hoat_dong') {
        scroll.scrollTop = 0
      } else if( state == 'thong_bao') {
        scroll.scrollTop = 120
      } else {
        scroll.scrollTop = 99999
      }
    })
  }
}

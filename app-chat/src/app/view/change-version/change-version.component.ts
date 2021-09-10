import { VersionService } from './../../service/version/version.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-version',
  templateUrl: './change-version.component.html',
  styleUrls: ['./change-version.component.scss']
})
export class ChangeVersionComponent implements OnInit {

  // Bật tắt option
  public is_open_option: boolean = false;

  constructor(
    public version_service: VersionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public openOption(): void {
    this.is_open_option = !this.is_open_option;
  }

  public getImgF1(): String {
    return this.version_service.version == 1 ? 'assets/images/rt_icon.png' : 'assets/images/ws_icon.png';
  }

  public getImgF2(): String {
    return this.version_service.version == 2 ? 'assets/images/rt_icon.png' : 'assets/images/ws_icon.png';
  }

  public getTextF1():String{
    return this.version_service.version == 1 ? 'Phiên bản hiện tại là Firebase' : 'Phiên bản hiện tại là Websocket';
  }

  public getTextF2():String{
    return this.version_service.version == 2 ? 'Firebase' : 'Websocket';
  }

  public changeVersion():void{
    this.version_service.changeVersion();
    this.router.navigate(["/change-version"]);
  }

}

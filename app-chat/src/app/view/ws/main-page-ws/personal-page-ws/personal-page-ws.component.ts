import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { MainPageWsService } from 'src/app/service/ws/main-page/main-page-ws.service';
import { ChangeAvatarWsService } from 'src/app/service/ws/personal-page/change-avatar/change-avatar-ws.service';
import { PersonalWsService } from 'src/app/service/ws/personal-page/personal-ws.service';

@Component({
  selector: 'app-personal-page-ws',
  templateUrl: './personal-page-ws.component.html',
  styleUrls: ['./personal-page-ws.component.scss']
})
export class PersonalPageWsComponent implements OnInit {

  fileAvatar: File;
  urlNewAvatar: string;
  constructor(
    private main_page_service_ws: MainPageWsService,
    private router: Router,
    private route: ActivatedRoute,
    public personalServiceWS: PersonalWsService,
    private avatarServiceWS: ChangeAvatarWsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.personalServiceWS.getProfile();
    setTimeout(() => {
      this.main_page_service_ws.reset();
      this.main_page_service_ws.selectPersonalPage();
      this.animationCircle();
    }, 0);
  }
  // lottie
  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
  // tạo animation khi load trang
  animationCircle() {
    const idLeft = document.getElementById('circle-left');
    const idCenter = document.getElementById('circle-center');
    const idRight = document.getElementById('circle-right');
    const idCoverAvt = document.getElementById('cover-avatar-bg');
    idCenter.classList.add('circle-center-animation');
    idLeft.classList.add('circle-left-animation');
    idRight.classList.add('circle-right-animation');
    idCoverAvt.classList.add('cover-avatar-bg-animation');
  }
  // click thay đổi ảnh đại diện
  clickAvatar(): void {
    const avatarInput = document.getElementById('avatar-update');
    avatarInput.click();
  }

  // thay doi avatar
  changeAvatar() {
    const avatarInput = <HTMLInputElement>(
      document.getElementById('avatar-update')
    );
   
    if(avatarInput.files[0].type.split('/')[0].toLowerCase().trim() == 'image') {
      this.fileAvatar = avatarInput.files[0];
      this.urlNewAvatar = URL.createObjectURL(this.fileAvatar);
    }
  }
  changeProfile(): void {
    this.router.navigate(['doi-thong-tin'], { relativeTo: this.route });
  }

  changePass(): void {
    this.router.navigate(['doi-mat-khau'], { relativeTo: this.route });
  }
// xác nhận thay đổi avatar
  okChangeAvatar() {
    if(this.fileAvatar != null) {
      this.avatarServiceWS.accessStoragetai_khoan(this.fileAvatar);
      const avatarInput = <HTMLInputElement>(
        document.getElementById('avatar-update')
      );
      avatarInput.value = '';
      this.fileAvatar = null;
    }
  }
// không đổi avatar
  notChangeAvatar() {
    const avatarInput = <HTMLInputElement>(
      document.getElementById('avatar-update')
    );
    avatarInput.value = '';
    this.fileAvatar = null;
  }
  // đường dẫn an toàn
  uRLSafe(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}

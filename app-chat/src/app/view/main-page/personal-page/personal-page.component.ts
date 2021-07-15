import { MainPageService } from './../../../service/main-page/main-page.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persional } from 'src/app/models/persional/persional';
import { PersionalService } from 'src/app/service/personal-page/persional.service';
import { ChangeAvatarService } from 'src/app/service/personal-page/change-avatar/change-avatar.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
})
export class PersonalPageComponent implements OnInit {
  // @input truyền vào user từ component cha khi login
  fileAvatar: File;
  urlNewAvatar: string;
  constructor(
    private main_page_service: MainPageService,
    private router: Router,
    private route: ActivatedRoute,
    public persionalService: PersionalService,
    private avatarService: ChangeAvatarService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.persionalService.getProfile();
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectPersonalPage();
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
    4;
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
    this.fileAvatar = avatarInput.files[0];
    this.urlNewAvatar = URL.createObjectURL(this.fileAvatar);
  }
  changeProfile(): void {
    this.router.navigate(['doi-thong-tin'], { relativeTo: this.route });
  }

  changePass(): void {
    this.router.navigate(['doi-mat-khau'], { relativeTo: this.route });
  }
// xác nhận thay đổi avatar
  okChangeAvatar() {
    this.avatarService.accessStoragetai_khoan(this.fileAvatar);
    const avatarInput = <HTMLInputElement>(
      document.getElementById('avatar-update')
    );
    avatarInput.value = '';
    this.fileAvatar = null;
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

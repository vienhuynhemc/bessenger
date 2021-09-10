import { LoginService } from '../../service/firebase/login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})


export class NotFoundPageComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/json/lottie/404-not-found.json',
  };

  constructor(private router: Router, private login_service: LoginService) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  back(): void {
    if (this.login_service.isLogin()) {
      this.router.navigate(['/bessenger']);
    } else {
      this.router.navigate(['/dang-nhap']);
    }
  }

}

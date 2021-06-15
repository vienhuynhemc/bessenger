import { RegisterAccountService } from './../../service/register-account/register-account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  
  // lottie
  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };
  public isLoading: boolean;
  public countSlide: number;
  public isRunningSlide: boolean;

  constructor(
    public register_account_service: RegisterAccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.register_account_service.isRegister()) {
      this.router.navigate(['/bessenger']);
    } else {
      this.init();
    }
  }

  private init(): void {
    this.isLoading = false;
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isRunningSlide = true;
    this.setDelay(10000);
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  setDelay(times: any) {
    setTimeout(() => {
      this.countSlide++;
      let nameOld = `hinh${this.countSlide}`;
      let nameNew = `hinh${this.countSlide + 1}`;
      if (this.countSlide == 5) {
        nameNew = `hinh${1}`;
        this.countSlide = 0;
      }
      document.getElementById(nameOld).style.opacity = '0';
      document.getElementById(nameNew).style.opacity = '1';
      document.getElementById("child").style.left = `${this.countSlide * 64}px`;
      document.getElementById("content_child").innerText = `0${this.countSlide + 1}`;
      // repeate
      if (this.isRunningSlide) {
        this.setDelay(times);
      }
    }, times);
  }


}

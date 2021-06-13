import { LoginService } from './../../service/login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userName: string;
  public passWord: string;
  public countSlide: number;

  constructor(private router: Router, private login_service: LoginService) {
  }

  ngOnInit(): void {
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;

    if (this.login_service.isLoginSuccess()) {
      this.router.navigate(["/bessenger"]);
    }
    this.setDelay(10000);
  }


  hiddenAndShowPassword(e: HTMLInputElement, eye: HTMLElement): void {
    if (e.type == 'text') {
      e.type = 'password';
      eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
    } else {
      e.type = 'text';
      eye.classList.add('fa-eye-slash');
      eye.classList.remove('fa-eye');
    }
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
      document.getElementById("child").style.left = `${this.countSlide * 80}px`;
      document.getElementById("content_child").innerText = `0${this.countSlide+1}`;
      // repeate
      this.setDelay(times);
    }, times);
  }

}

import { MainPageService } from './../../service/main-page/main-page.service';
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
  public ten: string;
  public countSlide: number;
  public isRunningSlide:boolean;

  constructor(
    private router: Router, 
    private login_service: LoginService) {
  }

  ngOnInit(): void {
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isRunningSlide =true;

    if (this.login_service.isLoginSuccess()) {
      this.router.navigate(["/bessenger"]);
    }
    this.setDelay(10000);
  }

  dangNhap(): void {
    this.login_service.login();
    this.isRunningSlide =false;
    this.router.navigate(["/bessenger"]);
  }

  dangKyTaoKhoanChuyenComponent() {
    document.getElementById("dang-nhap").style.display = "none";
    document.getElementById("dang-ky-2").style.display = "none";
    document.getElementById("dang-ky").style.display = "block";
    document.getElementById("dang-nhap-2").style.display = "flex";
    this.reset();
  }

  dangNhapChuyenComponent() {
    document.getElementById("dang-nhap").style.display = "block";
    document.getElementById("dang-ky-2").style.display = "flex";
    document.getElementById("dang-ky").style.display = "none";
    document.getElementById("dang-nhap-2").style.display = "none";
    this.reset();
  }

  reset() {
    this.userName = "";
    this.passWord = "";
    this.ten = "";
    let elements = document.getElementById("level-password").children;
    elements[3].textContent = "Hãy nhập mật khẩu";
    (<HTMLElement>elements[3]).style.color = "#e2e2e2";
    (<HTMLElement>elements[0]).style.background = "#e2e2e2";
    (<HTMLElement>elements[1]).style.background = "#e2e2e2";
    (<HTMLElement>elements[2]).style.background = "#e2e2e2";

    document.getElementById("dk-email").style.border = "1px solid #e2e2e2";
    document.getElementById("dk-error-1").style.display = "none";

    document.getElementById("dk-ten").style.border = "1px solid #e2e2e2";
    document.getElementById("dk-error-2").style.display = "none";

    document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
    document.getElementById("dk-error-3").style.display = "none";
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

  dkTen(value) {
    if (value.trim().length > 0) {
      document.getElementById("dk-ten").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-2").style.display = "none";
    }else{
      document.getElementById("dk-ten").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-2").style.display = "block";
    }
  }

  dkEmail(value) {
    if (value.trim().length > 0) {
      document.getElementById("dk-email").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-1").style.display = "none";
    }else{
      document.getElementById("dk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-1").style.display = "block";
    }
  }

  dangKy(): void {
    let email = this.userName.trim();
    let ten = this.ten.trim();
    let mat_khau = this.passWord;
    let count = 0;
    if (email.length == 0) {
      count++;
      document.getElementById("dk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-1").style.display = "block";
    }
    if (ten.length == 0) {
      count++;
      document.getElementById("dk-ten").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-2").style.display = "block";
    }
    if (mat_khau.length == 0) {
      count++;
      document.getElementById("dk-password").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-3").style.display = "block";
    }
    console.log(count);
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
      document.getElementById("content_child").innerText = `0${this.countSlide + 1}`;
      // repeate
      if(this.isRunningSlide){
        this.setDelay(times);
      }
    }, times);
  }

  changePassword(value: any) {
    let i = 0;
    let isHaveNumber = false;
    let isHaveUpcase = false;
    while (i <= value.length) {
      let character = value.charAt(i);
      if (character == character.toUpperCase() && isNaN(character)) {
        isHaveUpcase = true;
      }
      i++;
    }
    isHaveNumber = this.hasNumber(value);
    let elements = document.getElementById("level-password").children;
    if (!isHaveNumber && !isHaveUpcase && value.length > 0) {
      elements[3].textContent = "Yếu";
      (<HTMLElement>elements[3]).style.color = "#ff7b5c";
      (<HTMLElement>elements[0]).style.background = "#ff7b5c";
      (<HTMLElement>elements[1]).style.background = "#e2e2e2";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else if ((!isHaveNumber && isHaveUpcase) || (!isHaveUpcase && isHaveNumber)) {
      elements[3].textContent = "Trung bình";
      (<HTMLElement>elements[3]).style.color = "yellow";
      (<HTMLElement>elements[0]).style.background = "yellow";
      (<HTMLElement>elements[1]).style.background = "yellow";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else if (isHaveNumber && isHaveUpcase) {
      elements[3].textContent = "Mạnh";
      (<HTMLElement>elements[3]).style.color = "#20e820";
      (<HTMLElement>elements[0]).style.background = "#20e820";
      (<HTMLElement>elements[1]).style.background = "#20e820";
      (<HTMLElement>elements[2]).style.background = "#20e820";

      document.getElementById("dk-password").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-3").style.display = "none";
    } else {
      elements[3].textContent = "Hãy nhập mật khẩu";
      (<HTMLElement>elements[3]).style.color = "#e2e2e2";
      (<HTMLElement>elements[0]).style.background = "#e2e2e2";
      (<HTMLElement>elements[1]).style.background = "#e2e2e2";
      (<HTMLElement>elements[2]).style.background = "#e2e2e2";
    
      document.getElementById("dk-password").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-3").style.display = "block";
    }
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

}

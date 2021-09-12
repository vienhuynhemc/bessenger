import { RegisterAccountWsService } from './../../../service/ws/register-account/register-account-ws.service';
import { LoginWsService } from './../../../service/ws/login/login-ws.service';
import { LoginWsWsService } from './../../../service/ws/login/login-ws-ws.service';
import { NotificationLoginPageWsService } from '../../../service/ws/notification/notification-login-page-ws.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { VersionService } from 'src/app/service/version/version.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { RegisterObjectSendMail } from 'src/app/models/firebase/regiser-account/register_object_send_mail';

@Component({
  selector: 'app-login-page-ws',
  templateUrl: './login-page-ws.component.html',
  styleUrls: ['./login-page-ws.component.scss']
})
export class LoginPageWsComponent implements OnInit {

  // lottie
  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  //recapcha
  @ViewChild('recaptcha_ws', { static: true }) recaptchaElement: ElementRef;
  public isCheckRecapcha: boolean;

  public email_quen_mat_khau: string;
  public userName: string;
  public passWord: string;
  public ten: string;
  public countSlide: number;
  public isRunningSlide: boolean;
  public isLoading: boolean;

  constructor(
    private router: Router,
    public notification_login_page_ws: NotificationLoginPageWsService,
    public login_ws_ws: LoginWsWsService,
    public version_service: VersionService,
    public login_service_ws: LoginWsService,
    public register_account_service_ws: RegisterAccountWsService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
  ) {
  }

  //recapcha
  addRecaptchaScript() {
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }
    (function (d, s, id, obj) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptcha(); return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }
  renderReCaptcha() {
    try {
      window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
        'sitekey': '6LdT1D0aAAAAAHDZf574nzU5pDf_Reb25rV6SIqY',
        'callback': (response) => {
          this.isCheckRecapcha = true;
          document.getElementById("dn-error-3").style.display = "none";
        },
        'expired-callback': (response) => {
          this.isCheckRecapcha = false;
          document.getElementById("dn-error-3").innerText = "Mã xác minh đã hết hạn, vui lòng xác minh lại"
          document.getElementById("dn-error-3").style.display = "block";
        }
      });
    } catch (e) {
    }
  }
  //////////////////////////////////////////////////////////////
  ngOnInit(): void {
    // change version
    if (this.version_service.version == 1) {
      this.router.navigate(['/change-version']);
    }
    //recapcha
    this.isCheckRecapcha = false;
    this.addRecaptchaScript();
    /////////////////////////
    document.getElementById("hinh2").style.opacity = "0";
    document.getElementById("hinh3").style.opacity = "0";
    document.getElementById("hinh4").style.opacity = "0";
    document.getElementById("hinh5").style.opacity = "0";
    this.countSlide = 0;
    this.isLoading = false;
    this.isRunningSlide = true;
    this.userName = "";
    this.passWord = "";
    if (this.login_service_ws.isLogin()) {
      this.router.navigate(["/bessenger-ws"]);
    }
    this.setDelay(10000);
  }

  animationCreated(animationItem: AnimationItem): void {
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
    } else {
      document.getElementById("dk-ten").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-2").style.display = "block";
    }
  }

  dkEmail(value) {
    if (value.trim().length > 0) {
      document.getElementById("dk-email").style.border = "1px solid #e2e2e2";
      document.getElementById("dk-error-1").style.display = "none";
    } else {
      document.getElementById("dk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-1").style.display = "block";
      document.getElementById("dk-error-1").innerText = "Email không thể thiếu"
    }
  }

  dnEmail(value) {
    if (value.trim().length > 0) {
      document.getElementById("dn-email").style.border = "1px solid #e2e2e2";
      document.getElementById("dn-error-1").style.display = "none";
    } else {
      document.getElementById("dn-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dn-error-1").style.display = "block";
      document.getElementById("dn-error-1").innerText = "Email không thể thiếu"
    }
  }

  dnPassword(value) {
    if (value.trim().length > 0) {
      document.getElementById("dn-mat-khau").style.border = "1px solid #e2e2e2";
      document.getElementById("dn-error-2").style.display = "none";
    } else {
      document.getElementById("dn-mat-khau").style.border = "1px solid #ff7b5c";
      document.getElementById("dn-error-2").style.display = "block";
      document.getElementById("dn-error-2").innerText = "Mật khẩu không thể thiếu"
    }
  }

  public hiddenQMK(): void {
    // reset
    this.email_quen_mat_khau = "";
    document.getElementById("qmk-email").style.border = "1px solid #e2e2e2";
    document.getElementById("qmk-error").style.display = "none";
    // hidden
    document.getElementById("quen-mat-khau").style.display = "none";
  }

  public qMK(): void {
    document.getElementById("quen-mat-khau").style.display = "flex";
  }

  quenMatKhauEmail(value) {
    if (value.trim().length > 0) {
      document.getElementById("qmk-email").style.border = "1px solid #e2e2e2";
      document.getElementById("qmk-error").style.display = "none";
    } else {
      document.getElementById("qmk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("qmk-error").style.display = "block";
      document.getElementById("qmk-error").innerText = "Email không thể thiếu"
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
      let nameOldObject = document.getElementById(nameOld);
      if (nameOldObject != null) {
        nameOldObject.style.opacity = '0';
      }
      let nameNewObject = document.getElementById(nameNew);
      if (nameNewObject != null) {
        nameNewObject.style.opacity = '1';
      }
      let child = document.getElementById("child");
      if (child != null) {
        child.style.left = `${this.countSlide * 80}px`;
      }
      let content_child = document.getElementById("content_child");
      if (content_child != null) {
        content_child.innerText = `0${this.countSlide + 1}`;
      }
      // repeate
      if (this.isRunningSlide) {
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

  public requestQMK(): void {
    if (this.email_quen_mat_khau == undefined) {
      document.getElementById("qmk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("qmk-error").style.display = "block";
      document.getElementById("qmk-error").innerText = "Email không thể thiếu"
    } else {
      let email: string = this.email_quen_mat_khau.trim();
      if (email.length == 0) {
        document.getElementById("qmk-email").style.border = "1px solid #ff7b5c";
        document.getElementById("qmk-error").style.display = "block";
        document.getElementById("qmk-error").innerText = "Email không thể thiếu"
      } else {
        // show loading
        this.isLoading = true;
        // check email
        this.register_account_service_ws.checkEmail(email).subscribe(data => {
          // Bên kia trả về 1 bảng object AccountWebservice 
          if (data.length == 0) {
            document.getElementById("qmk-email").style.border = "1px solid #ff7b5c";
            document.getElementById("qmk-error").style.display = "block";
            document.getElementById("qmk-error").innerText = "Email bạn nhập chưa đăng ký tài khoản Bessenger";
            this.isLoading = false;
          } else {
            // Lấy mã tài khoản
            let ma_tai_khoan = data[0]['ma_tai_khoan'];
            // Lưu vô session hiện tại đang có request quên mk
            localStorage.setItem("ma_tai_khoan_qmk_ws", JSON.stringify(ma_tai_khoan));
            // Gửi lại mã
            let code: string = "";
            for (let i = 0; i < 6; i++) {
              let newNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;;
              code += newNumber + "";
            }
            let newData = new RegisterObjectSendMail();
            newData.code = code;
            newData.email = email;
            // Lưu mã mới vô webservice
            this.register_account_service_ws.updateEmail(code).subscribe(data => {
              // Lưu xong gửi email
              this.register_account_service_ws.sendMailQMK(newData).subscribe((data) => {
                // Gửi xong thì chuyển tới trang quên mật khẩu
                this.isLoading = false;
                this.router.navigate(['quen-mat-khau-ws']);
              });
            })
          }
        });
      }
    }
  }

  dangKy(): void {
    let email: string = this.userName.trim();
    let ten: string = this.ten.trim();
    let mat_khau: string = this.passWord;
    let count = 0;
    if (email.length == 0) {
      count++;
      document.getElementById("dk-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dk-error-1").style.display = "block";
      document.getElementById("dk-error-1").innerText = "Email không thể thiếu"
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
    if (count == 0) {
      // showloading
      this.isLoading = true;
      let code: string = "";
      for (let i = 0; i < 6; i++) {
        let newNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;;
        code += newNumber + "";
      }

      let newData = new RegisterObjectSendMail();
      newData.code = code;
      newData.email = email;
      this.login_ws_ws.messages.next({
        "action": "onchat",
        "data": {
          "event": "REGISTER",
          "data": {
            "user": email,
            "pass": mat_khau,
          }
        }
      })
      this.login_ws_ws.messages.subscribe(data => {
        let value = JSON.parse(JSON.stringify(data));
        if (value.status == 'error') {
          document.getElementById("dk-email").style.border = "1px solid #ff7b5c";
          document.getElementById("dk-error-1").style.display = "block";
          document.getElementById("dk-error-1").innerText = "Email đã được đăng ký, bạn có thể chọn quên mật khẩu để lấy lại mật khẩu"
          this.isLoading = false;
        } else {
          // Oke email không tồn tại thì tạo tài khoản
          // set thông tin
          // Fill data
          this.register_account_service_ws.insertNewAccountToFirebase(ten, email, mat_khau, code);
          let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_ws"));
          // Thêm dữ liêu liệu vô webservice
          this.register_account_service_ws.themDuLieuTaiKhoanMoiWebservice(ten, email, mat_khau, code, ma_tai_khoan).subscribe(data => {
            // Thêm vô webservice xong thì cho nó mặt định giới tính là nam và tải hình nam
            this.register_account_service_ws.taiHinhMacDinhChoTaiKhoan("nam").subscribe(data => {
              let file: File = new File([data], ma_tai_khoan + ".png", { type: data.type });
              let filePath: string = "/tai_khoan_ws/" + ma_tai_khoan + ".png";
              const storageRef = this.storage.ref(filePath);
              const uploadTask = this.storage.upload(filePath, file);
              uploadTask.snapshotChanges().pipe(
                finalize(
                  () => {
                    storageRef.getDownloadURL().subscribe(downloadURL => {
                      let gioi_tinh_string: string = "Nam";
                      this.db.object("/tai_khoan_ws/" + ma_tai_khoan).update({ hinh: filePath, link_hinh: downloadURL, gioi_tinh: gioi_tinh_string });
                    });
                  }
                )
              ).subscribe();
              uploadTask.percentageChanges().subscribe(percent => {
                console.log("Tiến độ tải hình giới tính: " + percent);
                if (percent == 100) {
                  // Tải dữ liệu xong xui hết thì gửi email rồi chuyển trang
                  // gửi email rồi tới trang đăng ký
                  this.register_account_service_ws.sendMail(newData).subscribe((data) => {
                    this.isLoading = false;
                    this.router.navigate(['dang-ky-ws']);
                  });
                }
              });
            });
          });
        }
      });
    }
  }

  dangNhap(): void {
    let email: string = this.userName.trim();
    let mat_khau: string = this.passWord;
    let count = 0;

    if (email.length == 0) {
      count++;
      document.getElementById("dn-email").style.border = "1px solid #ff7b5c";
      document.getElementById("dn-error-1").style.display = "block";
      document.getElementById("dn-error-1").innerText = "Email không thể thiếu"
    }
    if (mat_khau.length == 0) {
      count++;
      document.getElementById("dn-mat-khau").style.border = "1px solid #ff7b5c";
      document.getElementById("dn-error-2").style.display = "block";
      document.getElementById("dn-error-2").innerText = "Mật khẩu không thể thiếu"
    }
    if (!this.isCheckRecapcha) {
      count++;
      document.getElementById("dn-error-3").style.display = "block";
      document.getElementById("dn-error-3").innerText = "Bạn là Robot ư?"
    }
    if (count == 0) {
      this.isLoading = true;
      // Check tài khoản
      this.login_service_ws.checkEmail(email).subscribe(data => {
        if (data.length == 0) {
          document.getElementById("dn-email").style.border = "1px solid #ff7b5c";
          document.getElementById("dn-error-1").style.display = "block";
          document.getElementById("dn-error-1").innerText = "Email chưa đăng ký tài khoản Bessenger"
          this.isLoading = false;
        } else {
          if (data[0]['trang_thai_kich_hoat'] == "chua") {
            document.getElementById("dn-email").style.border = "1px solid #ff7b5c";
            document.getElementById("dn-error-1").style.display = "block";
            document.getElementById("dn-error-1").innerText = "Tài khoản chưa được kich hoạt, vui lòng chọn Quên Mật Khẩu để kích hoạt tài khoản"
            this.isLoading = false;
          } else {
            if (mat_khau != data[0]['mat_khau_2']) {
              document.getElementById("dn-email").style.border = "1px solid #e2e2e2";
              document.getElementById("dn-error-1").style.display = "none";
              document.getElementById("dn-mat-khau").style.border = "1px solid #ff7b5c";
              document.getElementById("dn-error-2").style.display = "block";
              document.getElementById("dn-error-2").innerText = "Mật khẩu không chính xác"
              this.isLoading = false;
            } else {
              document.getElementById("dn-email").style.border = "1px solid #e2e2e2";
              document.getElementById("dn-error-1").style.display = "none";
              document.getElementById("dn-mat-khau").style.border = "1px solid #e2e2e2";
              document.getElementById("dn-error-2").style.display = "none";
              this.login_service_ws.login(data[0]['ma_tai_khoan'], email);
              // Kết nối ws api login
              this.login_ws_ws.login(email, data[0]['mat_khau']);
              this.login_ws_ws.messages_login.subscribe(data => {
                let value = JSON.parse(JSON.stringify(data));
                console.log("Đăng nhập từ trang đăng nhập: " + value.data + " " + value.mes + " " + value.status);
                this.isRunningSlide = false;
                this.isLoading = false;
                this.router.navigate(["/bessenger-ws"]);
              })
            }
          }
        }
      })
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassWsService } from 'src/app/service/ws/personal-page/change-pass/change-pass-ws.service';
import { PersonalWsService } from 'src/app/service/ws/personal-page/personal-ws.service';

@Component({
  selector: 'app-change-password-ws',
  templateUrl: './change-password-ws.component.html',
  styleUrls: ['./change-password-ws.component.scss']
})
export class ChangePasswordWsComponent implements OnInit {

  constructor(private router: Router, private personServiceWS: PersonalWsService, private passServiceWS: ChangePassWsService) { 
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      const yesNo = document.getElementById('formYesNo');
      yesNo.classList.add('show-yesno');
    }, 0);
  }
  clickOkChangePass() {
    const oldPass = <HTMLInputElement>document.getElementById('pass-old')
    const newPass = <HTMLInputElement>document.getElementById('pass-new')
    const confirmPass = <HTMLInputElement>document.getElementById('pass-confirm')
    
    const borderOld = document.getElementById('border-old');
    const borderNew = document.getElementById('border-new');
    const borderConfirm = document.getElementById('border-confirm');
    
    const errorOld = document.getElementById('dn-error-1');
    const errorOldNotAcctualy = document.getElementById('dn-error-old-equal');
    const errorNew = document.getElementById('dn-error-2');
    const errorOldEqualNew = document.getElementById('dn-error-new-equal');
    const errorConfirm = document.getElementById('dn-error-3');
    const errorEqual = document.getElementById('dn-error-4');
    const success = document.getElementById('dn-success');

    if(oldPass.value == '' || newPass.value=='' || confirmPass.value == '') {
      if(oldPass.value == '') {
        borderOld.style.border = '1px solid #ff7b5c';
        errorOld.style.display = 'block';
      } 
      if(newPass.value == '') {
        borderNew.style.border = '1px solid #ff7b5c';
        errorNew.style.display = 'block';
      }
      if(confirmPass.value == '') {
        borderConfirm.style.border = '1px solid #ff7b5c';
        errorEqual.style.display = 'none';
        errorConfirm.style.display = 'block';
      }
    // nếu mật khẩu cũ không chính xác
    } else if(oldPass.value != this.personServiceWS.persional.pass) {
      borderOld.style.border = '1px solid #ff7b5c';
      errorOldNotAcctualy.style.display = 'block';
      errorEqual.style.display = 'none';
      borderNew.style.border = '1px solid #e2e2e2';
      borderConfirm.style.border = '1px solid #e2e2e2';

      // nếu mật khẩu cũ trùng mật khẩu mới
    } else if(oldPass.value == newPass.value) {
      borderNew.style.border = '1px solid #ff7b5c';
      errorOldEqualNew.style.display = 'block';
      errorOldNotAcctualy.style.display = 'none';
      errorEqual.style.display = 'none';
      borderConfirm.style.border = '1px solid #e2e2e2';
      borderOld.style.border = '1px solid #e2e2e2';
    }
    // nếu mật khẩu mới và xác nhận mật khẩu không trùng khớp
    else if( newPass.value !=  confirmPass.value) {
      errorEqual.style.display = 'block';
      borderConfirm.style.border = '1px solid #ff7b5c';
      errorOldNotAcctualy.style.display = 'none';
      errorOldEqualNew.style.display = 'none';
      borderNew.style.border = '1px solid #e2e2e2';
      borderOld.style.border = '1px solid #e2e2e2';
    } else {
      setTimeout(() => {
        this.personServiceWS.setLoading(true)
      }, 0);
      let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'))
      this.passServiceWS.accesstai_khoan().child(parseIDUser).update({
        mat_khau_2: newPass.value
      })
      this.passServiceWS.updatePass(newPass.value,parseIDUser).subscribe(data=>{
        setTimeout(() => {
          this.personServiceWS.setLoading(false)
        }, 0);
      })
      errorOldNotAcctualy.style.display = 'none';
      oldPass.value = '';
      newPass.value = '';
      confirmPass.value = '';
      success.style.display = 'block';
    }
  }
  clickClose() {
    const yesNo = document.getElementById('formYesNo');
    yesNo.classList.remove('show-yesno')
    setTimeout(() => {
      this.router.navigate(['/bessenger-ws/thong-tin-ca-nhan']);
    }, 300);
  }

  changeIconPass(e: HTMLInputElement, eye: HTMLElement) {
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
  changeInputPass(e: HTMLInputElement, error: HTMLElement, border: HTMLElement) {
    const success = document.getElementById('dn-success');
    const errorOldNotAcctualy = document.getElementById('dn-error-old-equal');
    const errorOldEqualNew = document.getElementById('dn-error-new-equal');
    const errorOld = document.getElementById('dn-error-1');
    const errorNew = document.getElementById('dn-error-2');
    const errorConfirm = document.getElementById('dn-error-3');
    const errorEqual = document.getElementById('dn-error-4');
    const borderOld = document.getElementById('border-old');
    const borderNew = document.getElementById('border-new');
    const borderConfirm = document.getElementById('border-confirm');
    borderOld.style.border = '1px solid #e2e2e2';
    borderNew.style.border = '1px solid #e2e2e2';
    borderConfirm.style.border = '1px solid #e2e2e2';
    errorOld.style.display = 'none'
    errorNew.style.display = 'none'
    errorConfirm.style.display = 'none'
    errorEqual.style.display = 'none'
    success.style.display = 'none'
    errorOldNotAcctualy.style.display = 'none'
    errorOldEqualNew.style.display = 'none';
    if(e.value == '') {
      border.style.border = '1px solid #ff7b5c';
      error.style.display = 'block';
      
    } else {
      border.style.border = '1px solid #e2e2e2';
      error.style.display = 'none';
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeProfileService } from 'src/app/service/firebase/personal-page/change-profile/change-profile.service';
import { PersionalService } from 'src/app/service/firebase/personal-page/persional.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {

  constructor(private router: Router, public personalService: PersionalService, private changeProfileService: ChangeProfileService) { }

  ngOnInit(): void {
    setTimeout(() => {
      const yesNo = document.getElementById('formYesNo');
      yesNo.classList.add('show-yesno');
    }, 0);
  }
  clickClose() {
      const yesNo = document.getElementById('formYesNo');
      yesNo.classList.remove('show-yesno')
      setTimeout(() => {
        this.router.navigate(['/bessenger/thong-tin-ca-nhan']);
      }, 300);
  }
  changeInput() {
    const name = <HTMLInputElement>document.getElementById('name');
    const errorName = document.getElementById('error-name');
    const success = document.getElementById('success');

    if(name.value.trim() == '') {
      errorName.style.display = 'block';
      name.style.border = '1px solid #ff7b5c';
      success.style.display = 'none';
    } else {
      errorName.style.display = 'none';
      name.style.border = '1px solid #e2e2e2';
      success.style.display = 'none';
    }
  }
  clickOkChangeProfile() {
    const name = <HTMLInputElement>document.getElementById('name');
    const sexMan = <HTMLInputElement>document.getElementById('man');
    const sexWoman = <HTMLInputElement>document.getElementById('woman');
    const errorName = document.getElementById('error-name');
    const success = document.getElementById('success');
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let sexNew = ''
    if(sexMan.checked)
      sexNew = 'Nam'
    else if(sexWoman.checked)
      sexNew = 'Nữ'

    if(name.value.trim() == '') {
      errorName.style.display = 'block';
      name.style.border = '1px solid #ff7b5c';
    } else if(name.value.trim() != this.personalService.persional.name || sexNew != this.personalService.persional.sex) {
      setTimeout(() => {
        this.personalService.setLoading(true)
      }, 0);
      this.changeProfileService.accesstai_khoan().child(parseIDUser).update({
        ten: name.value.trim(),
        gioi_tinh: sexNew
      })
        this.changeProfileService.updateName(name.value.trim(),parseIDUser).subscribe(data => {
          setTimeout(() => {
            this.personalService.setLoading(false)
          }, 0);
        })
    
      success.style.display = 'block';
    }
  }
  
}

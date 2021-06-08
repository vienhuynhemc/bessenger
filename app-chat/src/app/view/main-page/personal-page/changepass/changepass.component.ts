import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {
  // @Input()
  userChangePass: User = {img: '123123',dateCreate:null,email:'123',idUser:1,name:'duty'};
  @Output() outToPersionalChangePass = new EventEmitter<{user: User, oldPass: string, newPass: string}>();
  constructor() { }

  ngOnInit(): void {
  }
  //  kiểm tra lỗi khi điền mật khẩu, độ dài mật khẩu > 6
  getEventInputError(value : string, idIcon: string) {
    const temp = (<HTMLInputElement>document.getElementById(value));
    const idI =  (<HTMLInputElement>document.getElementById(idIcon));
    if(temp.value.length <= 6) {
      temp.style.border = "red solid 1px";
      idI.style.display = "none";
    } else {
      temp.style.border = "#3275f7 solid 1px";
      idI.style.display = "block";
    }
    if(value == 'ip-confirm') {
        const newPass =  (<HTMLInputElement>document.getElementById('ip-new-pass'));
        if(newPass.value != temp.value || temp.value.length <= 6) {
          temp.style.border = "red solid 1px";
          idI.style.display = "none";
        }
        else {
          temp.style.border = "#3275f7 solid 1px";
          idI.style.display = "block";
        }

    }
  }
  // sự kiện khi ấn nút save
  eventSave() {
    const oldPass = (<HTMLInputElement>document.getElementById('ip-old-pass'));
    const newPass =  (<HTMLInputElement>document.getElementById('ip-new-pass'));
    const confirmPass =  (<HTMLInputElement>document.getElementById('ip-confirm'));
    if(oldPass.value.length > 6 && confirmPass.value.length > 6 && newPass.value.length > 6) {
      if ((newPass.value == confirmPass.value) && (newPass.value != oldPass.value)) {
          this.changePass(this.userChangePass, oldPass.value, newPass.value);
      }
    }
  }
  // truyền data ra component person
  changePass(user: User, oldPass: string, newPass: string) {
      this.outToPersionalChangePass.emit({user: user, oldPass: oldPass, newPass : newPass});
  }
}

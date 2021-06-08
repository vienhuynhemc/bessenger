import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userProfile: User;
  @Output()  outToPersionalChangeProfile= new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }
  // event các ô input khi di chuyển sang ô khác
  nonFocusInputEvent(id: string, icon: string) {
    const name = (<HTMLInputElement>document.getElementById(id));
    const check = (<HTMLInputElement>document.getElementById(icon));
    if(name.value.length == 0) {
      check.style.display = "none";
      name.style.border = "red solid 1px";
    } else {
      check.style.display = "block";
      name.style.border = "#3275f7 solid 1px";
    } 
    if(id == "ip-email") {
      if(!name.value.includes("@")) {
        check.style.display = "none";
        name.style.border = "red solid 1px";
      }
    }

   
  }
  // lưu thông tin mới
  saveEvent() {
    const name = (<HTMLInputElement>document.getElementById("ip-name"));
    const email = (<HTMLInputElement>document.getElementById("ip-email"));
    if(name.value.length == 0)
        name.style.border = "red solid 1px";
    else
        name.style.border = "#3275f7 solid 1px";
    if(email.value.length == 0)
        email.style.border = "red solid 1px";
    else
        email.style.border = "#3275f7 solid 1px";
    if(!email.value.includes("@"))
        email.style.border = "red solid 1px";
    else 
        email.style.border = "#3275f7 solid 1px";
    if(email.value.length != 0 && name.value.length != 0 && email.value.includes("@")) {
        if(email.value != this.userProfile.email || name.value != this.userProfile.name) {
          this.userProfile.email = email.value;
          this.userProfile.name = name.value;
          this.changeProfile(this.userProfile);
        }
    }
  }
  // out data đến component personal
  changeProfile(user: User) {
    this.outToPersionalChangeProfile.emit(user);
  }
}

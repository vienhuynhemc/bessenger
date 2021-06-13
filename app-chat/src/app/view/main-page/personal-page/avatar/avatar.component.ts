import { Component,EventEmitter, Input, Output, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userAva!: User;
  @Output() outToPersionalChangeImg = new EventEmitter<User>();
  constructor() { }

  ngOnInit(): void {
  }
  // chọn ảnh đại diện mới
  chooseFileClick() {
    const chooseFile = (<HTMLInputElement>document.getElementById("choose-file"));
    const titleError = (<HTMLInputElement>document.getElementById("title-img"));
    chooseFile.click();
    let checkChange = false;
    // kiểm tra đúng format là ảnh ?
    chooseFile.addEventListener("change", function() {
      var fileName = chooseFile.value;
      var idxDot = fileName.lastIndexOf(".") + 1;
      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile=="jpg" || extFile=="jpeg" || extFile=="png") {
          checkChange = true;
          titleError.style.display = "none";
      }else
          titleError.style.display = "block";
    })
    // xử lý lưu ảnh về serve
    if(checkChange) {
      this.userAva.img = chooseFile.value;
      this.changeImage(this.userAva);
    }
  }
  // trả về component person 1 user đã đổi avatar mới
  changeImage(user: User) :void{
    this.outToPersionalChangeImg.emit(user);
  }
}

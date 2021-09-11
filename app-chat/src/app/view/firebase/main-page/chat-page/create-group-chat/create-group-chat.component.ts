import { Component, OnInit } from '@angular/core';
import { ChatPageCreateGroupService } from 'src/app/service/firebase/chat-page/chat-page-friends-page/chat-page-create-group.service';
import { Router } from '@angular/router';
import { MyNameService } from 'src/app/service/firebase/my-name/my-name.service';
import { ChatPageObjectGroup } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_object_group';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss']
})
export class CreateGroupChatComponent implements OnInit {


  public ten_nhom: string;
  public ten_hien_tai: string;

  constructor(public chat_page_create_ground: ChatPageCreateGroupService,
    private router: Router,
    public my_name_service: MyNameService
  ) { }

  ngOnInit(): void {
    if (this.chat_page_create_ground.layAllUser == null) {
      this.getData();
    } else {
      this.chat_page_create_ground.layAllUser.unsubscribe();
      this.getData();
    }
  }

  public getData() {
    this.chat_page_create_ground.layAllUser = this.chat_page_create_ground.getAllUser().subscribe(data => {
      let object = data.payload.toJSON();
      let all_user: ChatPageObjectGroup[] = [];
      Object.entries(object).forEach(([ma_tai_khoan, data_tai_khoan]) => {
        all_user.push(new ChatPageObjectGroup(data_tai_khoan['ten'], ma_tai_khoan, data_tai_khoan['link_hinh']));
      });
      this.chat_page_create_ground.all_user = all_user;
    });
  }

  public closeTaoNhom(): void {
    setTimeout(() => { this.chat_page_create_ground.off(); }, 0);
  }

  public taoNhom(): void {
    let countOK = 0;
    if (this.ten_nhom == null || this.ten_nhom.length == 0) {
      document.getElementById("tao-nhom-error-1").style.display = "block";
      countOK++;
    } else {
      document.getElementById("tao-nhom-error-1").style.display = "none";
    }
    if (!this.chat_page_create_ground.isOke()) {
      document.getElementById("tao-nhom-error-2").style.display = "block";
      countOK++;
    } else {
      document.getElementById("tao-nhom-error-2").style.display = "none";
    }
    if (countOK == 0) {
      document.getElementById("tao-nhom-error-1").style.display = "none";
      document.getElementById("tao-nhom-error-2").style.display = "none";
      this.chat_page_create_ground.createGroup(this.ten_nhom,this.my_name_service.myName);
      this.ten_nhom = "";
      this.closeTaoNhom();
      this.router.navigate(['bessenger/tin-nhan/danh-sach']);
    }
  }

  public inputTenNhom(value) {
    if (value.trim().length == 0) {
      document.getElementById("tao-nhom-error-1").style.display = "block";
    } else {
      document.getElementById("tao-nhom-error-1").style.display = "none";
    }
  }

  public inputTenHienTai(value) {
    this.chat_page_create_ground.fillter(value);
  }

  public selectUser(ma_tai_khoan: string) {
    this.chat_page_create_ground.selectUser(ma_tai_khoan);
    this.ten_hien_tai = "";
    document.getElementById("tao-nhom-error-2").style.display = "none";
  }

  public clearAdded(value: string) {
    this.chat_page_create_ground.clearAdded(value);
    this.chat_page_create_ground.updateSearch(this.ten_hien_tai, value);
    if (this.chat_page_create_ground.user_added.length == 0) {
      document.getElementById("tao-nhom-error-2").style.display = "block";
    }
  }

}

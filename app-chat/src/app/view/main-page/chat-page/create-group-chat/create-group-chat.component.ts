import { ChatPageObjectGroup } from './../../../../models/chat-page/chat-page-friends-page/chat_page_object_group';
import { Component, OnInit } from '@angular/core';
import { ChatPageCreateGroupService } from 'src/app/service/chat-page/chat-page-friends-page/chat-page-create-group.service';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss']
})
export class CreateGroupChatComponent implements OnInit {


  public ten_nhom: string;
  public ten_hien_tai: string;

  constructor(public chat_page_create_ground: ChatPageCreateGroupService) { }

  ngOnInit(): void {
    this.chat_page_create_ground.getAllUser().subscribe(data => {
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
  }

  public clearAdded(value:string){
    this.chat_page_create_ground.clearAdded(value);
    this.chat_page_create_ground.updateSearch(this.ten_hien_tai,value);
  }

}

import { ChatPageChatPageContentService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { MyNameService } from './../../../my-name/my-name.service';
import { ChatPageSettingService } from './../chat-page-setting.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingBoxChatService {

  // Mặc định là mở
  public isOpen: boolean = true;

  // Có đang mở box đổi tên đoạn chat ko
  public isShowEditName: boolean;

  constructor(
    private db:AngularFireDatabase,
    private setting_chat: ChatPageSettingService,
    private my_name_service: MyNameService,
    private content_service: ChatPageChatPageContentService
  ) { }

  public doiTenNhom(tenNhom: string) {
    // Đổi tên 
    this.db.object("/thong_tin_tro_chuyen_nhom/"+this.setting_chat.ma_cuoc_tro_chuyen).update({['ten-nhom']:tenNhom});
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã đặt tên nhóm là :" + tenNhom, "thong_bao", this.my_name_service.myName);
  }
}

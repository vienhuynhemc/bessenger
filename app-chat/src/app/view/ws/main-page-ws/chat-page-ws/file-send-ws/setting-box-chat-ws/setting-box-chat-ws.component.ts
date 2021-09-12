import { Component, OnInit } from '@angular/core';
import { EmojiObjectWS } from 'src/app/models/ws/emoji/emoji_object_ws';
import { ChatPageChatPageContentWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';
import { MessengerHeaderWsService } from 'src/app/service/ws/chat-page/chat-page-chat-page/chat-page-chat-page-header/messenger-header-ws.service';
import { SettingBoxChatWsService } from 'src/app/service/ws/chat-page/chat-page-file-page/setting-box-chat/setting-box-chat-ws.service';

@Component({
  selector: 'app-setting-box-chat-ws',
  templateUrl: './setting-box-chat-ws.component.html',
  styleUrls: ['./setting-box-chat-ws.component.scss']
})
export class SettingBoxChatWsComponent implements OnInit {

  public ten_moi: string;
  public isEqual: boolean;

  // Select đối tượng chọn màu
  public colorSelected:number;

  constructor(
    public setting_box_chat_service: SettingBoxChatWsService,
    public content_service: ChatPageChatPageContentWsService,
    public header_service: MessengerHeaderWsService
  ) { }

  ngOnInit(): void {
  }

  public open() {
    this.setting_box_chat_service.isOpen = !this.setting_box_chat_service.isOpen;
  }

  public doiTenDoanChat() {
    this.ten_moi = this.header_service.object_chat.name.noi_dung_goc;
    this.isEqual = true;
    this.setting_box_chat_service.isShowEditName = true;
  }

  public doiChuDe(){
    this.setting_box_chat_service.updateColorSelected();
    this.colorSelected = this.setting_box_chat_service.colorSelected;
    this.setting_box_chat_service.isShowEditColor =true;
  }

  public anDoiChuDe(){
    this.setting_box_chat_service.isShowEditColor =false;
  }

  public anDoiTen() {
    this.setting_box_chat_service.isShowEditName = false;
  }

  public inputTen(event) {
    let value = this.ten_moi.trim();
    if (value.length == 0) {
      this.isEqual = true;
    } else {
      this.isEqual = this.ten_moi.trim() == this.header_service.object_chat.name.noi_dung_goc.trim();
    }
  }

  public isEqualName() {
    return this.ten_moi.trim() == this.header_service.object_chat.name.noi_dung_goc.trim();
  }

  public luuDoiTenNhom() {
    this.anDoiTen();
    this.setting_box_chat_service.doiTenNhom(this.ten_moi.trim(),);
  }

  public luuDoiChuDe(){
    this.anDoiChuDe();
    this.setting_box_chat_service.doiChuDe(this.colorSelected);
  }

  public getIcon(item:EmojiObjectWS){
    this.hiddenEditEmoji();
    // Check thử nó có khác icon hiện không
    if(item.src != this.content_service.object_chat.cuoc_tro_truyen.bieu_tuong_cam_xuc){
      this.setting_box_chat_service.doiBieuTuongCamXuc(item.src,item.alt);
    }
  }

  public showEditEmoji(){
    this.setting_box_chat_service.isShowEditEmoji =true;
  }

  public hiddenEditEmoji(){
    this.setting_box_chat_service.isShowEditEmoji = false;
  }

  public goBieuTuongCamXuc(){
    this.hiddenEditEmoji();
    this.setting_box_chat_service.goBieuTuongCamXuc();
  }

}

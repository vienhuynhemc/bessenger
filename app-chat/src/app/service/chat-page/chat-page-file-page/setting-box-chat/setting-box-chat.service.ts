import { Subscription } from 'rxjs';
import { Mau } from './../../../../models/chat-page/chat-page-file-page/setting-box-chat/mau';
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

  // Có đang mở box edit màu đó không
  public isShowEditColor: boolean;
  // Danh sách màu từ server
  public maus: Mau[];
  // Màu đang được chọn
  public colorSelected: number;

  // service
  public layMau: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private setting_chat: ChatPageSettingService,
    private my_name_service: MyNameService,
    private content_service: ChatPageChatPageContentService
  ) {
    if (this.layMau == null) {
      this.getMau();
    } else {
      this.layMau.unsubscribe();
      this.getMau();
    }
  }

  public doiTenNhom(tenNhom: string) {
    // Đổi tên 
    this.db.object("/thong_tin_tro_chuyen_nhom/" + this.setting_chat.ma_cuoc_tro_chuyen).update({ ['ten-nhom']: tenNhom });
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã đặt tên nhóm là :" + tenNhom, "thong_bao", this.my_name_service.myName);
  }

  public doiChuDe(i:number){
     // Đổi tên 
     this.db.object("/cuoc_tro_chuyen/" + this.setting_chat.ma_cuoc_tro_chuyen).update({ mau: this.maus[i].mau_nen,mau_tren:this.maus[i].tren,duoi:this.maus[i].duoi });
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã thay đổi màu sắc chủ đề của đoạn chat thành " + this.maus[i].ten, "thong_bao", this.my_name_service.myName);
    }

  public getMau() {
    this.layMau = this.db.object("mau_nen").snapshotChanges().subscribe(data => {
      let array: Mau[] = [];
      let object = data.payload.toJSON();
      Object.entries(object).forEach(([key, value]) => {
        let mau = new Mau();
        mau.background_color = value['background-color'];
        mau.background_image = value['background-image'];
        mau.mau_nen = value['mau_nen'];
        mau.ten = value['ten'];
        mau.tren = value['tren'];
        mau.duoi = value['duoi'];
        array.push(mau);
      });
      this.maus = array;
      if (this.content_service.object_chat.cuoc_tro_truyen.mau == '#3275f7') {
        this.colorSelected = 31;
      } else {
        for (let i = 0; i < this.maus.length; i++) {
          if (this.content_service.object_chat.cuoc_tro_truyen.mau == this.maus[i].mau_nen) {
            this.colorSelected = i;
            break;
          }
        }
      }
    });
  }


}

import { Subscription } from 'rxjs';
import { ChatPageChatPageContentService } from 'src/app/service/firebase/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { ChatPageSettingService } from './../chat-page-setting.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Mau } from 'src/app/models/firebase/chat-page/chat-page-file-page/setting-box-chat/mau';
import { MyNameService } from '../../../my-name/my-name.service';

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

  // Có đang mở box edit emoji đó không
  public isShowEditEmoji: boolean;

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

  public doiChuDe(i: number) {
    this.colorSelected = i;
    // Đổi tên 
    this.db.object("/cuoc_tro_chuyen/" + this.setting_chat.ma_cuoc_tro_chuyen).update({ mau: this.maus[i].mau_nen, mau_tren: this.maus[i].tren, duoi: this.maus[i].duoi });
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã thay đổi màu sắc chủ đề của đoạn chat thành " + this.maus[i].ten, "thong_bao", this.my_name_service.myName);
  }

  public doiBieuTuongCamXuc(src:string,alt:string){
    // Đổi biểu tượng cảm xúc
    this.db.object("/cuoc_tro_chuyen/"+this.setting_chat.ma_cuoc_tro_chuyen).update({bieu_tuong_cam_xuc:src,bieu_tuong_cam_xuc_alt:alt});
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã đặt biểu tượng cảm xúc thành " + alt, "thong_bao", this.my_name_service.myName);
  }

  public goBieuTuongCamXuc(){
    // Đổi biểu tượng cảm xúc
    this.db.object("/cuoc_tro_chuyen/"+this.setting_chat.ma_cuoc_tro_chuyen).update({bieu_tuong_cam_xuc:'khong',bieu_tuong_cam_xuc_alt:''});
    // Tạo tin nhắn
    this.content_service.sumitTinNhanThongBaoTaoNhom(this.setting_chat.ma_cuoc_tro_chuyen,
      "đã đặt biểu tượng cảm xúc thành 👍", "thong_bao", this.my_name_service.myName); 
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
      this.updateColorSelected();
    });
  }

  public updateColorSelected() {
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
  }


}

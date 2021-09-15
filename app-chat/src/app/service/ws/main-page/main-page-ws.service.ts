import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { MainPageWebsocketService } from './main-page-websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageWsService {

  public img: string;

  // Mục đích để xử tô xanh cái icon bên trái
  private trang_chu_duoc_chon: boolean;
  private tin_nhan_duoc_chon: boolean;
  private tin_nhan_an_duoc_chon: boolean;
  private ban_be_duoc_chon: boolean;
  private thong_tin_ca_nhan_duoc_chon: boolean;
  private cai_dat_duoc_chon: boolean;

  // Service
  // 1. Lấy hình
  public layHinh: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private main_page_websocket: MainPageWebsocketService
  ) {
    this.trang_chu_duoc_chon = false;
    this.tin_nhan_duoc_chon = false;
    this.tin_nhan_an_duoc_chon = false;
    this.ban_be_duoc_chon = false;
    this.thong_tin_ca_nhan_duoc_chon = false;
    this.cai_dat_duoc_chon = false;
    this.updateOnline();
    
  }

  public getImg() {
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    return this.db.object("/tai_khoan_ws/" + ma_tai_khoan).snapshotChanges();
  }

  public setImg(object: Object) {
    this.img = object['link_hinh'];
  }

  public updateOnline(): void {
    setTimeout(() => {
      let currentTime = Number(new Date());
      let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
      if (ma_tai_khoan != null) {
        this.db.object("/lan_cuoi_dang_nhap_ws/" + ma_tai_khoan).update({ lan_cuoi_dang_nhap: currentTime });
      }
      
      this.updateOnline();
    }, 5000);
  }
  public autoJoinGroup() {
    // join group tự động
    let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
    // lấy ra tất cả cuộc trò chuyện
    this.db.database.ref('cuoc_tro_chuyen_ws').on('value', group => {
      group.forEach(gDetail => {
        // lấy ra cuộc trò chuyện nhóm
        if(gDetail.val().loai_cuoc_tro_truyen == 'nhom') {
          // kiểm tra bản thân đã tham gia nhóm chưa
          this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws').child(gDetail.key).child(ma_tai_khoan).on('value', member =>{
              if(member.val() != null ) {
                if(member.val().tham_gia == 'chua') {
                  // chưa tham gia thì gửi request join group
                  this.db.database.ref('thong_tin_tro_chuyen_nhom_ws').child(gDetail.key).once('value', inforG => {
                    this.main_page_websocket.joinGroup(inforG.val().ten_nhom);
                    this.main_page_websocket.messages_join_group.subscribe(data => {
                      setTimeout(() => {
                        let value = JSON.parse(JSON.stringify(data));
                        if (value.status == "success") {
                          // tham gia thành công thì set lại trong fire
                          this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws').child(gDetail.key).child(ma_tai_khoan).update({
                            tham_gia: 'roi'
                          })
                        }
                      }, 2000);
                    })
                  })
                }
              }
          })
        }
      });
    })
  }
  public selectTrangChu(): void {
    this.trang_chu_duoc_chon = true;
  }

  public selectPersonalPage(): void {
    this.thong_tin_ca_nhan_duoc_chon = true;
  }

  public selectSettingPage(): void {
    this.cai_dat_duoc_chon = true;
  }

  public selectFriendsPage(): void {
    this.ban_be_duoc_chon = true;
  }

  public selectChatRequestPage(): void {
    this.tin_nhan_an_duoc_chon = true;
  }

  public selectChatPage(): void {
    this.tin_nhan_duoc_chon = true;
  }

  public reset(): void {
    this.trang_chu_duoc_chon = false;
    this.tin_nhan_duoc_chon = false;
    this.tin_nhan_an_duoc_chon = false;
    this.ban_be_duoc_chon = false;
    this.thong_tin_ca_nhan_duoc_chon = false;
    this.cai_dat_duoc_chon = false;
  }

  public isSelectHomePage(): boolean {
    return this.trang_chu_duoc_chon;
  }

  public isSelectChatPage(): boolean {
    return this.tin_nhan_duoc_chon;
  }

  public isSelectChatRequestPage(): boolean {
    return this.tin_nhan_an_duoc_chon;
  }

  public isSelectFriendsPage(): boolean {
    return this.ban_be_duoc_chon;
  }

  public isSelectPersonalPage(): boolean {
    return this.thong_tin_ca_nhan_duoc_chon;
  }

  public isSelectSettingPage(): boolean {
    return this.cai_dat_duoc_chon;
  }

}

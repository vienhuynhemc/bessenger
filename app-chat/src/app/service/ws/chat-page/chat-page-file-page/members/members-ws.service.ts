import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MemberGroupChatWS } from 'src/app/models/ws/chat-page/chat-page-file-page/member/member-ws';
import { MyNameWsService } from '../../../my-name/my-name-ws.service';
import { ChatPageChatPageContentWsService } from '../../chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content-ws.service';

@Injectable({
  providedIn: 'root'
})
export class MembersWsService {
// Mặc định là đóng
public isOpen:boolean;
public memberList:MemberGroupChatWS[] = []
public isAdmin: boolean = false;
constructor(private db: AngularFireDatabase, private content_service: ChatPageChatPageContentWsService,
  private my_name_service: MyNameWsService) { }

// lấy ra danh sách thành viên
loadMemberGroupChat(ma_cuoc_tro_chuyen: string) {
  let parseID = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'))
  this.accessthanh_vien_cuoc_tro_chuyen().child(ma_cuoc_tro_chuyen).on('value', member => {
      this.memberList = []
      let checkID = false;
      member.forEach(elementMember => {
        if(elementMember.val().roi_chua == 'chua') {
          let memberGroup = new MemberGroupChatWS();
          memberGroup.idUser = elementMember.key;
          memberGroup.role = elementMember.val().chuc_vu;
          memberGroup.dateJoin = elementMember.val().ngay_tham_gia;
          this.accesstai_khoan().child(elementMember.key).on('value', tk => {
            memberGroup.img = tk.val().link_hinh;
            memberGroup.name = tk.val().ten;
            this.memberList.push(memberGroup)
          })
          if(elementMember.key == parseID && elementMember.val().chuc_vu == 'quan_tri_vien' && !checkID)
            checkID = true;
          this.sortRole();
        }
      });
      this.isAdmin = checkID;
  })
}

// sắp xếp đưa quản trị viên lên đầu
sortRole() {
  this.memberList = this.memberList.sort((role1, role2) => {
    var x = role1.role;
    var y = role2.role;
    return x < y ? -1 : x > y ? 1 : 0;
  });
}


accessthanh_vien_cuoc_tro_chuyen() {
  return this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws');
}

accesstai_khoan() {
  return this.db.database.ref('tai_khoan_ws')
}

  // lấy ra thanh viên cuộc trò chuyện
  getMembersConversation() {
    return this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws/');
  }

  // lấy ra nhóm chat
getGroupChat() {
  return this.db.database.ref('thong_tin_tro_chuyen_nhom_ws/');
}

// cập nhật cuộc trò chuyện
updateMembersConversation(idConver: string, idUser: string) {
  return this.db.database.ref('thanh_vien_cuoc_tro_chuyen_ws/').child(idConver).child(idUser)
}

 // loại cuộc trò chuyện
 getKindConversation() {
  return this.db.database.ref('cuoc_tro_chuyen_ws/');
}

removeMember(ma_cuoc_tro_chuyen: string, member: MemberGroupChatWS) {
  this.content_service.sumitTinNhanThongBaoTaoNhom(ma_cuoc_tro_chuyen,
    "đã xóa thành viên " + member.name + " ra khỏi nhóm", "thong_bao", this.my_name_service.myName);
  this.accessthanh_vien_cuoc_tro_chuyen().child(ma_cuoc_tro_chuyen).child(member.idUser).update({
    ngay_roi_di: Number(new Date()),
    roi_chua: 'roi'
  })
}

decisionMember(ma_cuoc_tro_chuyen: string, id: string) {
  this.accessthanh_vien_cuoc_tro_chuyen().child(ma_cuoc_tro_chuyen).child(id).update({
    chuc_vu:'quan_tri_vien'
  })
}

outGroup(ma_cuoc_tro_chuyen: string, member: MemberGroupChatWS) {
  this.content_service.sumitTinNhanThongBaoTaoNhom(ma_cuoc_tro_chuyen,
    "đã rời khởi nhóm", "thong_bao", this.my_name_service.myName);
  // Rời nhóm
  this.accessthanh_vien_cuoc_tro_chuyen().child(ma_cuoc_tro_chuyen).child(member.idUser).update({
    ngay_roi_di: Number(new Date()),
    roi_chua: 'roi'
  })
  
}

addMember(ma_cuoc_tro_chuyen: string, member: MemberGroupChatWS) {
  let currentTime = Number(new Date());
  this.content_service.sumitTinNhanThongBaoTaoNhom(ma_cuoc_tro_chuyen,
    "đã thêm thành viên " + member.name + " vào nhóm", "thong_bao", this.my_name_service.myName);
    this.db.database.ref("thanh_vien_cuoc_tro_chuyen_ws").child(ma_cuoc_tro_chuyen).child(member.idUser).set(
      {
        ngay_roi_di: 0,
        ngay_tham_gia: currentTime,
        roi_chua: "chua",
        trang_thai: "khong_cho",
        chuc_vu: 'thanh_vien',
        tham_gia: "chua"
      }
    );
}

  getNewMembers(nameSearch: string, oldMembers: MemberGroupChatWS[]):MemberGroupChatWS[] {
    let newMembers = []
    let parseID = JSON.parse(localStorage.getItem('ma_tai_khoan_dn_ws'))
      this.accesstai_khoan().on('value', accounts =>  {
          newMembers = [];
          accounts.forEach(ele_acc => {
              let checkAdd = false;
              oldMembers.forEach(ele_old => {
                    if(ele_acc.key == ele_old.idUser || ele_acc.key == parseID)
                        checkAdd = true;
              });
              if(!checkAdd) {
                if(nameSearch.trim() == '') {
                    let newMember = new MemberGroupChatWS();
                    newMember.idUser = ele_acc.key;
                    newMember.img = ele_acc.val().link_hinh;
                    newMember.name = ele_acc.val().ten;
                    newMembers.push(newMember);
                } else {
                  if(ele_acc.val().ten.toLowerCase().trim().includes(nameSearch.toLowerCase().trim())) {
                    let newMember = new MemberGroupChatWS();
                    newMember.idUser = ele_acc.key;
                    newMember.img = ele_acc.val().link_hinh;
                    newMember.name = ele_acc.val().ten;
                    newMembers.push(newMember);
                  }
                }
              }
          });
      })
   
    return newMembers
  }
}

import { MembersService } from './../../../../../service/chat-page/chat-page-file-page/members/members.service';
import { Component, OnInit } from '@angular/core';
import { MessengerMainService } from 'src/app/service/chat-page/chat-page-chat-page/messenger-main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupChat } from 'src/app/models/chat-page/chat-page-file-page/member/member';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  // tắt mở option
  isOpenOption: boolean = false;
  idCurrent: string = '';
  adminNew: MemberGroupChat = null;
  removeMember: MemberGroupChat = null;
  outGroup: MemberGroupChat = null;
  checkAdmin: boolean = false;
  constructor(
    public members_service: MembersService,
    private route: ActivatedRoute,
    private router: Router,
    public messenger_main_service: MessengerMainService,
   
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (this.members_service.isOpen)
        this.members_service.loadMemberGroupChat(
          this.messenger_main_service.ma_cuoc_tro_chuyen
        );
    });
  }

  public open() {
    this.members_service.isOpen = !this.members_service.isOpen;
    if (this.members_service.isOpen)
      this.members_service.loadMemberGroupChat(
        this.messenger_main_service.ma_cuoc_tro_chuyen
      );
  }

  public openOption(id: string) {
    let option = document.getElementById('op-' + id);
    if (this.isOpenOption && this.idCurrent == id) {
      this.idCurrent = id;
      this.isOpenOption = !this.isOpenOption;
      option.classList.add('hidden');
    } else if (!this.isOpenOption) {
      this.idCurrent = id;
      this.isOpenOption = !this.isOpenOption;
      option.classList.remove('hidden');
    }
  }
  getIDMe(){
    return JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
  }
  // nhắn tin
  messageClick(id: string) {
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    this.members_service.getMembersConversation().once('value', (conver) =>{ 
        // duyệt qua tất cả các cuộc trò chuyện
        // lấy ra danh sách nhóm chat để kiểm tra
        let groupChatsList = []
        this.members_service.getGroupChat().once('value', (group) => {
          if(group.val() != null) {
            group.forEach(itemG => {
              if(itemG.val().ton_tai ==0)
                groupChatsList.push(itemG.key)
            });
          }
          if(conver.val() != null) {
            let check = false;
            conver.forEach(itemConver => {
              // tìm ra id và iduser trong các cuộc trò chuyện
              let memberList = []
              if(itemConver.val() != null) {
                // tìm ra tất cả thành viên trong 1 cuộc trò chuyện
                itemConver.forEach(memberConver => {
                  memberList.push({id: memberConver.key, status: memberConver.val().trang_thai})
                });
              }
              // nếu trùng id và iduser và không phải là nhóm chat
              if(((memberList[0].id == id && memberList[1].id == parseIDUser) || (memberList[0].id == parseIDUser && memberList[1].id == id)) && !groupChatsList.includes(itemConver.key)) {
                this.members_service.updateMembersConversation(itemConver.key, parseIDUser).update({
                  trang_thai: "khong_cho"
                })
                check = true;
                // trễ 0.5s để chờ db update trạng thái mới chuyển trang
                setTimeout(() => {
                  this.router.navigate(['/bessenger/tin-nhan/' + itemConver.key]);
                }, 500);
              }
            });
            // nếu không có sẵn cuộc trò truyện thì tự tạo
            if(!check) {
             
               // thêm loại cuộc trò chuyện vào cuộc trò chuyện
              let keyConverNew = this.members_service.getKindConversation().push();
              keyConverNew.update({
                bieu_tuong_cam_xuc: "khong",
                loai_cuoc_tro_truyen: "don",
                mau: "#3275f7"
              })
               // thêm thành viên cuộc trò chuyện
              this.members_service.getMembersConversation().child(keyConverNew.key).child(parseIDUser).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "khong_cho"
              })
              this.members_service.getMembersConversation().child(keyConverNew.key).child(id).update({
                ngay_tham_gia: Number(new Date()),
                trang_thai: "cho"
              })
             
              setTimeout(() => {
                this.router.navigate(['/bessenger/tin-nhan/' + keyConverNew.key]);
              }, 500);
            }
          }
        })
       
    })
  }

  // chỉ định quản trị viên
  decisionAdminClick(member: MemberGroupChat) {
    this.adminNew = member;
  }

  // xóa thành viên
  removeMemberClick(member: MemberGroupChat) {
    this.removeMember = member;
  }

  // rời khỏi nhóm
  outGroupClick(member: MemberGroupChat) {
    this.outGroup = member;
  }

  onClickAcceptDecision() {
   this.members_service.decisionMember(this.messenger_main_service.ma_cuoc_tro_chuyen, this.adminNew.idUser)
    this.adminNew = null;
  }
  onClickNonAcceptDecision() {
    this.adminNew = null
  }

  onClickAcceptRemove() {
    this.members_service.removeMember(this.messenger_main_service.ma_cuoc_tro_chuyen, this.removeMember)
    this.removeMember = null;
  }
  onClickNonAcceptRemove() {
    this.removeMember = null
  }

  checkAdminOutGroup(memberList: MemberGroupChat[]) {
    if(this.outGroup.role == 'quan_tri_vien') {
      for (let index = 0; index < memberList.length; index++) {
        if(memberList[index].role == 'quan_tri_vien' && memberList[index].idUser != this.getIDMe()) {
          this.checkAdmin = true;
          break;
        }
    } 
    } else {
      this.checkAdmin = true;
    }
    return this.checkAdmin;
}
  onClickAcceptOutGroup(memberList: MemberGroupChat[]) {
    this.members_service.outGroup(this.messenger_main_service.ma_cuoc_tro_chuyen, this.outGroup)
    if(!this.checkAdmin) {
      this.members_service.decisionMember(this.messenger_main_service.ma_cuoc_tro_chuyen, memberList[1].idUser)
    } 
    this.outGroup = null;
  }
  onClickNonOutGroup() {
    this.outGroup = null
  }
}

import { ChatPageCuocTroChuyenWS } from "../../chat-page-friends-page/chat_page_cuoc_tro_chuyen_ws";
import { ChatPageObjectTinNhanFriendWS } from "../../chat-page-friends-page/chat_page_object_tin_nhan_friend_ws";


export class ObjectChatContentWS {

    // Cuộc trò chuyện
    cuoc_tro_truyen: ChatPageCuocTroChuyenWS;
    // Thành viên
    thanh_vien: ChatPageObjectTinNhanFriendWS[];
    // Trạng thái đang nhập

    is_online: boolean;

    // Trạng thái rời khỏi cuộc chat chưa
    is_roi_chua: boolean;
    time_roi_di: number;

    // img của thành viên nhóm chat
    public imgAvatars: string[] = [];
    // Thông báo sự kết nối thành viên : Bạn chưa kết nối với 3.14 người :v
    public statusConnect: string = "";

    public getImgAvatars() {
        let result: string[] = [];
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        if (this.thanh_vien != null) {
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                if (this.thanh_vien.length > 1) {
                    let count = 0;
                    for(let i = this.thanh_vien.length-1;i>-1;i--){
                        if(this.thanh_vien[i].roi_chua == 'chua'){
                            result.push(this.thanh_vien[i].link_hinh_dai_dien);
                            count++;
                        }
                        if(count == 2){
                            break;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.thanh_vien.length; i++) {
                    if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                        result.push(this.thanh_vien[i].link_hinh_dai_dien);
                        break;
                    }
                }
            }
        }
        this.imgAvatars = result;
    }

    public getCreateFriends(ban_bes: string[]) {
        let result = "";
        if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == 'don') {
            result = "Bạn và " + this.getName() + " là bạn bè trên Bessenger"
        } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
            let count = 0;
            if (this.thanh_vien != null && ban_bes != null) {
                let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
                for (let i = 0; i < this.thanh_vien.length; i++) {
                    let ma = this.thanh_vien[i].ma_tai_khoan;
                    if (ma != ma_tai_khoan) {
                        let ok = false;
                        for (let j = 0; j < ban_bes.length; j++) {
                            if (ban_bes[j] == ma) {
                                ok = true;
                                break;
                            }
                        }
                        if (!ok) {
                            count++;
                        }
                    }
                }
            }
            if (count == 0) {
                result = "";
            } else {
                result = "Bạn chưa két nối với " + count + " thành viên";
            }
        }
        this.statusConnect = result;
    }

    public getName(): string {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        let result = "";
        if (this.thanh_vien != null) {
            for (let i = 0; i < this.thanh_vien.length; i++) {
                if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                    if (this.thanh_vien[i].ten != null) {
                        let ten: string = this.thanh_vien[i].ten.trim();
                        let array: string[] = ten.split(" ");
                        result = array[array.length - 1];
                    }
                }
            }
        }
        return result;
    }

    public getIsRoiChua() {
        let result = false;
        let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        for (let i = 0; i < this.thanh_vien.length; i++) {
            if (this.thanh_vien[i].ma_tai_khoan == mtk && this.thanh_vien[i].roi_chua == 'roi') {
                result = true;
                this.time_roi_di = this.thanh_vien[i].ngay_roi_di;
                break;
            }
        }
        this.is_roi_chua = result;
    }

    public checkRoiChua(mtk:string):boolean{
        if(this.thanh_vien.length != 0){
            for(let i =0; i  < this.thanh_vien.length;i++){
                if(this.thanh_vien[i].ma_tai_khoan == mtk){
                    if(this.thanh_vien[i].roi_chua == 'roi'){
                        return true;
                    }
                }
            }
        }
        return false;
    }

}
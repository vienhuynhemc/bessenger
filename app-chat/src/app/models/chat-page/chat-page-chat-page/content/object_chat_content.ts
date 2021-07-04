import { ChatPageCuocTroChuyen } from "../../chat-page-friends-page/chat_page_cuoc_tro_chuyen";
import { ChatPageObjectTinNhanFriend } from "../../chat-page-friends-page/chat_page_object_tin_nhan_friend";
import { ObjectChatThanhVien } from "../header/object_chat_thanh_vien";

export class ObjectChatContent {

    // Cuộc trò chuyện
    cuoc_tro_truyen: ChatPageCuocTroChuyen;
    // Thành viên
    thanh_vien: ChatPageObjectTinNhanFriend[];
    // Trạng thái đang nhập

    is_online: boolean;

    // img của thành viên nhóm chat
    public imgAvatars: string[] = [];
    // Thông báo sự kết nối thành viên : Bạn chưa kết nối với 3.14 người :v
    public statusConnect: string = "";

    public getImgAvatars() {
        let result: string[] = [];
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.thanh_vien != null) {
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                if (this.thanh_vien.length > 1) {
                    result.push(this.thanh_vien[this.thanh_vien.length - 1].link_hinh_dai_dien);
                    result.push(this.thanh_vien[this.thanh_vien.length - 2].link_hinh_dai_dien);
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
                let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
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
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
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

}
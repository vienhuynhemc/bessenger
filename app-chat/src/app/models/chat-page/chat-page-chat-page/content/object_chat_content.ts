import { ObjectChatThanhVien } from "../header/object_chat_thanh_vien";

export class ObjectChatContent {

    ma_tai_khoan_so_huu: string;
    loai: string;
    mau: string;
    bieu_tuong_cam_xuc: string;
    ten_nhom: string;
    is_online: boolean;
    thanh_vien: ObjectChatThanhVien[];

    public getImg(): string[] {
        let result: string[] = [];
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.thanh_vien != null) {
            if (this.loai == "nhom") {
                if (this.thanh_vien.length > 1) {
                    result.push(this.thanh_vien[this.thanh_vien.length - 1].hinh);
                    result.push(this.thanh_vien[this.thanh_vien.length - 2].hinh);
                }
            } else if (this.loai == "don") {
                for (let i = 0; i < this.thanh_vien.length; i++) {
                    if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                        result.push(this.thanh_vien[i].hinh);
                        break;
                    }
                }
            }
        }
        return result;
    }

    public getCreateFriends(ban_bes: string[]): string {
        if (this.loai == 'don') {
            return "Bạn và " + this.getName() + " là bạn bè trên Bessenger"
        } else if (this.loai == "nhom") {
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
                return "";
            } else {
                return "Bạn chưa két nối với " + count + " thành viên";
            }
        }
        return "";
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
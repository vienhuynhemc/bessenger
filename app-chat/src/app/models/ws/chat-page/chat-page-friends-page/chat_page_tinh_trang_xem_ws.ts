import { ChatPageObjectTinNhanFriendWS } from "./chat_page_object_tin_nhan_friend_ws";

export class ChatPageTinhTrangXemWS {

    ma_tai_khoan: string;
    ten: string;
    hinh: string;
    ngay_xem: number;
    xem_chua: string;
    ngay_nhan: number;
    is_roi_chua:boolean;

    // Nội dung để đổ ra
    public noi_dung: string = "";
    public link_hinh_dai_dien = null;

    // Có được phép có mặt?
    public isShow:boolean;

    public isOke(ma_tk: string) {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        if (this.ma_tai_khoan == ma_tai_khoan) return false;
        if (this.ma_tai_khoan == ma_tk) return false;
        if(this.is_roi_chua) return false;
        if (this.xem_chua == 'roi') return true;
        return false;
    }

    public getHinh(list: ChatPageObjectTinNhanFriendWS[]): string {
        if (this.link_hinh_dai_dien == null) {
            if (list != null) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].ma_tai_khoan == this.ma_tai_khoan) {
                        this.link_hinh_dai_dien = list[i].link_hinh_dai_dien;
                        return this.link_hinh_dai_dien;
                    }
                }
            }
        }
        return this.link_hinh_dai_dien;
    }

    public getNoiDung() {
        this.noi_dung = this.getName() + " xem lúc " + this.getTime();
    }

    public getName() {
        let array = this.ten.trim().split(" ");
        return array[array.length - 1];
    }

    public getTime() {
        let date = new Date(this.ngay_xem);
        let year = date.getFullYear();
        let thang = date.getMonth() + 1;
        let ngay = date.getDate();
        let gio = date.getHours();
        let phut = date.getMinutes();
        let giay = date.getSeconds();
        return `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}:${giay.toString().length > 1 ? giay : "0" + giay} ${ngay.toString().length > 1 ? ngay : "0" + ngay} Tháng ${thang.toString().length > 1 ? thang : "0" + thang}, ${year}`;
    }

}
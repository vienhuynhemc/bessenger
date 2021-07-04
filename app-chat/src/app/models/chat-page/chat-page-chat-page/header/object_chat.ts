import { ChatPageObjectTen } from '../../chat-page-friends-page/chat_page_object_ten';
import { ObjectChatThanhVien } from './object_chat_thanh_vien';
export class ObjectChat {

    ma_tai_khoan_so_huu: string;
    loai: string;
    mau: string;
    bieu_tuong_cam_xuc: string;
    ten_nhom: string;
    is_online: boolean;
    thanh_vien: ObjectChatThanhVien[];

    // img để đổ dữ liệu khong lag
    public imgs: string[] = [];
    public name: ChatPageObjectTen = new ChatPageObjectTen();

    public getImgs() {
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
        this.imgs = result;
    }

    public getName() {
        let result: ChatPageObjectTen = new ChatPageObjectTen();
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.thanh_vien != null) {
            if (this.loai == "nhom") {
                result.noi_dung = this.ten_nhom;
                result.noi_dung_goc = this.ten_nhom;
            } else if (this.loai == "don") {
                for (let i = 0; i < this.thanh_vien.length; i++) {
                    if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                        result.noi_dung = this.thanh_vien[i].ten || "";
                        result.noi_dung_goc = this.thanh_vien[i].ten || "";
                        break;
                    }
                }
            }
            if (result.noi_dung != null) {
                if (result.noi_dung.length > 37) {
                    result.noi_dung = result.noi_dung.substring(0, 37) + "...";
                    result.is_cut = true;
                } else {
                    result.is_cut = false;
                }
            }
        }
        this.name = result;
    }

    public getTime(): string {
        let result = "";
        if (this.thanh_vien != null) {
            let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
            let max = -999;
            for (let i = 0; i < this.thanh_vien.length; i++) {
                if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                    if (this.thanh_vien[i].lan_cuoi_dang_nhap > max) {
                        max = this.thanh_vien[i].lan_cuoi_dang_nhap;
                    }
                }
            }
            let last_time: number = max;
            //  Lấy thời gian hiện tại
            let currentTime = Number(new Date());
            let over = currentTime - last_time;
            let ONE_MINUTE_IN_MILLIS = 60000;
            if (over < ONE_MINUTE_IN_MILLIS * 60) {
                result = parseInt((over / ONE_MINUTE_IN_MILLIS) + "") + " phút";
            } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24) {
                result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60)) + "") + " giờ";
            } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 7) {
                result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24)) + "") + " ngày";
            } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365) {
                result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 7)) + "") + " tuần";
            } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365 * 100) {
                result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 365)) + "") + " năm";
            }
            if (this.loai == 'nhom') {
                result = "Thành viên hoạt động gần nhất là " + result + " trước";
            } else if (this.loai == "don") {
                result = "Hoạt động " + result + " trước";
            }
        }
        return result;
    }

}
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatPageObjectTen } from '../../chat-page-friends-page/chat_page_object_ten';
import { ObjectChatThanhVien } from './object_chat_thanh_vien';
export class ObjectChat {

    ma_tai_khoan_so_huu: string;
    loai: string;
    mau: string;
    mau_tren: string;
    mau_duoi: string;
    bieu_tuong_cam_xuc: string;
    ten_nhom: string;
    is_online: boolean;
    thanh_vien: ObjectChatThanhVien[];
    is_roi_chua: boolean;
    is_roi_het_chua: boolean;
   
    // img để đổ dữ liệu khong lag
    public imgs: string[] = [];
    public name: ChatPageObjectTen = new ChatPageObjectTen();
  
    public getTK():ObjectChatThanhVien{
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if(this.loai == 'don'){
            for(let i = 0; i < this.thanh_vien.length;i++){
                if(this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan){
                    return this.thanh_vien[i];
                }
            }
        }
        return null;
    }

    public getImgs() {
        let result: string[] = [];
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.thanh_vien != null) {
            if (this.loai == "nhom") {
                if (this.thanh_vien.length > 1) {
                    let count = 0;
                    for (let i = this.thanh_vien.length - 1; i > -1; i--) {
                        if (this.thanh_vien[i].roi_chua == 'chua') {
                            result.push(this.thanh_vien[i].hinh);
                            count++;
                        }
                        if (count == 2) {
                            break;
                        }
                    }
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
            let count = 0;
            for (let i = 0; i < this.thanh_vien.length; i++) {
                if (this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan && this.thanh_vien[i].trang_thai_hoat_dong == 'bat') {
                    if (this.loai == 'don' || (this.loai == 'nhom' && this.thanh_vien[i].roi_chua == 'chua')) {
                        if (this.thanh_vien[i].lan_cuoi_dang_nhap > max) {
                            max = this.thanh_vien[i].lan_cuoi_dang_nhap;
                        }
                    }
                } else if(this.thanh_vien[i].ma_tai_khoan != ma_tai_khoan && this.thanh_vien[i].trang_thai_hoat_dong == 'tat') {
                    count++;
                }
            }
                if(count == this.thanh_vien.length - 1 ) {
                    result = ""
                } else {
                    if (max != -999) {
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
                    } else {
                        if (this.is_roi_chua) {
                            result = "Hiện tại nhóm đã không còn thành viên"
                        } else {
                            result = "Hiện tại nhóm chỉ còn mình bạn thôi";
                        }
                    }
                }
        }
        return result;
    }

    public getIsRoiChua() {
        let result = false;
        let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        for (let i = 0; i < this.thanh_vien.length; i++) {
            if (this.thanh_vien[i].ma_tai_khoan == mtk && this.thanh_vien[i].roi_chua == 'roi') {
                result = true;
                break;
            }
        }
        this.is_roi_chua = result;
    }

    public getIsRoiHetChua() {
        let count = 0;
        let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        for (let i = 0; i < this.thanh_vien.length; i++) {
            if (this.thanh_vien[i].ma_tai_khoan == mtk && this.thanh_vien[i].roi_chua == 'roi') {
                count++;
            }
        }
        if (count == this.thanh_vien.length - 1) {
            this.is_roi_het_chua = true;
        } else {
            this.is_roi_het_chua = false;
        }
    }

}
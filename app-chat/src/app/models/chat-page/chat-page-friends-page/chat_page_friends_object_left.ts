import { ChatPageCuocTroChuyen } from './chat_page_cuoc_tro_chuyen';
import { ChatPageObjectImg } from './chat_page_object_img';
import { ChatPageObjectTen } from './chat_page_object_ten';
import { ChatPageObjectTinNhanFriend } from './chat_page_object_tin_nhan_friend';
export class ChatPageFriendsObjectLeft {

    cuoc_tro_truyen: ChatPageCuocTroChuyen;
    thong_tin_thanh_vien: ChatPageObjectTinNhanFriend[];

    // Trạng thái online
    trang_thai_online: boolean;

    // Selected
    box_chat_dang_duoc_chon: boolean;

    public getLastTime(): number {
        let last_time: number = 0;
        if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            let vi_tri_ban_than = this.getViTriBanThan()
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                        this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            last_time = this.cuoc_tro_truyen.tin_nhan[index].ngay_gui;
        } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
            if (this.cuoc_tro_truyen.tin_nhan != null) {
                let index = 0;
                let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
                last_time = this.cuoc_tro_truyen.tin_nhan[index].ngay_gui;
            }
        }
        return last_time;
    }

    public getImg(): string[] {
        let result: string[] = [];
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
            result.push(this.thong_tin_thanh_vien[this.thong_tin_thanh_vien.length - 1].link_hinh_dai_dien);
            result.push(this.thong_tin_thanh_vien[this.thong_tin_thanh_vien.length - 2].link_hinh_dai_dien);
        } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
            for (let i = 0; i < this.thong_tin_thanh_vien.length; i++) {
                if (this.thong_tin_thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                    result.push(this.thong_tin_thanh_vien[i].link_hinh_dai_dien);
                    break;
                }
            }
        }
        return result;
    }

    public getName(): ChatPageObjectTen {
        let result: ChatPageObjectTen = new ChatPageObjectTen();
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
            result.noi_dung = this.cuoc_tro_truyen.ten_nhom;
            result.noi_dung_goc = this.cuoc_tro_truyen.ten_nhom;
        } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
            for (let i = 0; i < this.thong_tin_thanh_vien.length; i++) {
                if (this.thong_tin_thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                    result.noi_dung = this.thong_tin_thanh_vien[i].ten || "";
                    result.noi_dung_goc = this.thong_tin_thanh_vien[i].ten || "";
                    break;
                }
            }
        }
        if (result.noi_dung.length > 16) {
            result.noi_dung = result.noi_dung.substring(0, 13) + "...";
            result.is_cut = true;
        } else {
            result.is_cut = false;
        }
        return result;
    }

    public isReaded(): boolean {
        if (this.cuoc_tro_truyen.tin_nhan != null) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ma_tai_khoan == ma_tai_khoan) {
                    if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].xem_chua == "roi") {
                        return true;
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    public isNhom(): boolean {
        return this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom";
    }

    public getTime(): string {
        let result = "";
        if (this.cuoc_tro_truyen.tin_nhan != null && this.cuoc_tro_truyen.tin_nhan.length > 0) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let last_time: number = this.cuoc_tro_truyen.tin_nhan[index].ngay_gui;
            //  Lấy thời gian hiện tại
            let currentTime = Number(new Date());
            let over = currentTime - last_time;
            let ONE_MINUTE_IN_MILLIS = 60000;
            if (over < ONE_MINUTE_IN_MILLIS) {
                result = parseInt((over / 1000) + "") + " giây";
            } else if (over < ONE_MINUTE_IN_MILLIS * 60) {
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
        }
        return result;
    }

    public getViTriBanThan(): number {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        for (let i = 0; i < this.thong_tin_thanh_vien.length; i++) {
            if (this.thong_tin_thanh_vien[i].ma_tai_khoan == ma_tai_khoan) {
                return i;
            }
        }
        return -1;
    }

    public getNoiDungCuoiCung(): ChatPageObjectTen {
        let result = new ChatPageObjectTen();
        result.noi_dung = "";
        result.noi_dung_goc = "";
        if (this.cuoc_tro_truyen.tin_nhan != null && this.cuoc_tro_truyen.tin_nhan.length > 0) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let ten = this.getTenNguoiGui(index);
            switch (this.cuoc_tro_truyen.tin_nhan[index].loai_tin_nhan) {
                case "gui_text":
                    if (ten == "Bạn") {
                        result.noi_dung = this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    } else {
                        result.noi_dung = ten + ": " + this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    }
                    break;
                case "thong_bao":
                    result.noi_dung = ten + " " + this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    break;
                case "gui_hinh":
                    result.noi_dung = ten + " gửi một hình ảnh";
                    break;
                case "gui_video":
                    result.noi_dung = ten + " gửi một video";
                    break;
                case "gui_ghi_am":
                    result.noi_dung = ten + " gửi một tin nhắn thoại";
                    break;
                case "gui_file":
                    result.noi_dung = ten + " gửi một tệp";
                    break;
                case "thu_hoi":
                    result.noi_dung = ten + " thu hồi một tin nhắn";
                    break;
                case "phan_hoi":
                    result.noi_dung = ten + " phản hồi một tin nhắn";
                    break;
            }
        }
        result.noi_dung_goc = result.noi_dung;
        if (result.noi_dung.length > 25) {
            result.noi_dung = result.noi_dung.substring(0, 22) + "...";
            result.is_cut = true;
        } else {
            result.is_cut = false;
        }
        return result;
    }

    public getTenNguoiGui(index: number): string {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.cuoc_tro_truyen.tin_nhan[index].ma_tai_khoan == ma_tai_khoan) {
            return "Bạn";
        } else {
            if (this.cuoc_tro_truyen.tin_nhan[index].ten != null) {
                let ten: string = this.cuoc_tro_truyen.tin_nhan[index].ten.trim();
                let array: string[] = ten.split(" ");
                return array[array.length - 1];
            } else {
                return "";
            }
        }
    }

    // Tin nhắn cuối cùng là mình gửi thì mới xem được những người nào đã xem
    public itMe(): boolean {
        if (this.cuoc_tro_truyen.tin_nhan != null) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
            if (this.cuoc_tro_truyen.tin_nhan[index].ma_tai_khoan == ma_tai_khoan) {
                return true;
            }
        }
        return false;
    }

    //  Trả về danh sách những hình ảnh xem cuối cùng
    public getImgUserSeened(): ChatPageObjectImg[] {
        let result: ChatPageObjectImg[] = [];
        if (this.cuoc_tro_truyen.tin_nhan != null) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].xem_chua == "roi") {
                    if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                        if (result.length < 3) {
                            let object = new ChatPageObjectImg();
                            object.url = this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].hinh
                            let ngay_thang: string = "";
                            let ngay_thang_number = this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ngay_xem;
                            let date = new Date(ngay_thang_number);
                            let year = date.getFullYear();
                            let thang = date.getMonth() + 1;
                            let ngay = date.getDate();
                            let gio = date.getHours();
                            let phut = date.getMinutes();
                            let giay = date.getSeconds();
                            ngay_thang = `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}:${giay.toString().length > 1 ? giay : "0" + giay} ${ngay.toString().length > 1 ? ngay : "0" + ngay} Tháng ${thang.toString().length > 1 ? thang : "0" + thang}, ${year}`;
                            let array: string[] = [""];
                            if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ten != null) {
                                array = this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ten.split(" ");
                            }
                            object.noi_dung = array[array.length - 1] + " đã xem lúc " + ngay_thang;
                            result.push(object);
                        } else if (result.length == 3) {
                            let object = new ChatPageObjectImg();
                            object.url = this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].hinh
                            object.noi_dung = this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ten;
                            object.so_thanh_vien = 1;
                            result.push(object);
                        } else {
                            result[3].so_thanh_vien = result[3].so_thanh_vien + 1;
                            result[3].noi_dung = result[3].noi_dung + "\n" + this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ten;
                        }
                    }
                }
            }
        }
        return result;
    }

    // Xem thử có ông nào nhận chưa
    public isDaNhan(): boolean {
        if (this.cuoc_tro_truyen.tin_nhan != null) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                let vi_tri_ban_than = this.getViTriBanThan()
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "roi") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max &&
                            this.cuoc_tro_truyen.tin_nhan[i].ngay_gui <= this.thong_tin_thanh_vien[vi_tri_ban_than].ngay_roi_di) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    } else if (this.thong_tin_thanh_vien[vi_tri_ban_than].roi_chua == "chua") {
                        if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                            ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                            index = i;
                        }
                    }
                }
            } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
                for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                    if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                        ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                        index = i;
                    }
                }
            }
            let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].xem_chua == "dang") {
                    if (this.cuoc_tro_truyen.tin_nhan[index].tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}
import { ChatPageCuocTroChuyen } from './chat_page_cuoc_tro_chuyen';
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
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                    ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                    index = i;
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

    public getName(): string {
        let result: string = "";
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
            result = this.cuoc_tro_truyen.ten_nhom;
        } else if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "don") {
            for (let i = 0; i < this.thong_tin_thanh_vien.length; i++) {
                if (this.thong_tin_thanh_vien[i].ma_tai_khoan != ma_tai_khoan) {
                    result = this.thong_tin_thanh_vien[i].ten || "";
                    break;
                }
            }
        }
        if (result.length > 16) {
            result = result.substring(0, 13) + "...";
        }
        return result;
    }

    public isReaded(): boolean {
        if (this.cuoc_tro_truyen.tin_nhan != null) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                    ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                    index = i;
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

    public getNoiDungCuoiCung(): string {
        let result = "";
        if (this.cuoc_tro_truyen.tin_nhan != null && this.cuoc_tro_truyen.tin_nhan.length > 0) {
            let index = 0;
            let ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[0].ngay_gui;
            for (let i = 0; i < this.cuoc_tro_truyen.tin_nhan.length; i++) {
                if (this.cuoc_tro_truyen.tin_nhan[i].ngay_gui > ngay_gui_max) {
                    ngay_gui_max = this.cuoc_tro_truyen.tin_nhan[i].ngay_gui;
                    index = i;
                }
            }
            let ten = this.getTenNguoiGui(index);
            switch (this.cuoc_tro_truyen.tin_nhan[index].loai_tin_nhan) {
                case "gui_text":
                    if (ten == "Bạn") {
                        result = this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    } else {
                        result = ten + ": " + this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    }
                    break;
                case "thong_bao":
                    result = ten + " " + this.cuoc_tro_truyen.tin_nhan[index].noi_dung;
                    break;
                case "gui_hinh":
                    result = ten + " gửi một hình ảnh";
                    break;
                case "gui_video":
                    result = ten + " gửi một video";
                    break;
                case "gui_ghi_am":
                    result = ten + " gửi một tin nhắn thoại";
                    break;
                case "gui_file":
                    result = ten + " gửi một tệp";
                    break;
                case "thu_hoi":
                    result = ten + " thu hồi một tin nhắn";
                    break;
                case "phan_hoi":
                    result = ten + " phản hồi một tin nhắn";
                    break;
            }
        }
        if (result.length > 25) {
            result = result.substring(0, 22) + "...";
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

}
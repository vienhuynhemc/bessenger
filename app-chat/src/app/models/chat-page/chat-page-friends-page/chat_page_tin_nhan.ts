import { DomSanitizer } from '@angular/platform-browser';
import { flatMap } from 'rxjs/operators';
import { ChatPageObjectTinNhanFriend } from './chat_page_object_tin_nhan_friend';
import { ChatPageTinhTrangXem } from './chat_page_tinh_trang_xem';

export class ChatPageTinNhan {

    ma_tin_nhan: string;
    dia_chi_file: string;
    link_file: string;
    loai_tin_nhan: string;
    ma_tai_khoan: string;
    ten: string;
    ma_tin_nhan_phan_hoi: string;
    ngay_gui: number;
    noi_dung: string;
    tinh_trang_xem: ChatPageTinhTrangXem[];

    public getNoiDungHTML(sanitized: DomSanitizer) {
        if (this.loai_tin_nhan == 'gui_text') {
            return sanitized.bypassSecurityTrustHtml(this.noi_dung);
        } else if (this.loai_tin_nhan == 'gui_text_icon') {
            let div = document.createElement("div");
            div.innerHTML = this.noi_dung;
            for (let i = 0; i < div.children.length; i++) {
                div.children[i].classList.remove("span-image-box-chat");
                div.children[i].classList.add("gui_text_icon_icon");
            }
            return sanitized.bypassSecurityTrustHtml(div.innerHTML);
        }
        return "";
    }

    public getNoiDungThongBao(list: ChatPageObjectTinNhanFriend[]): string {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        if (this.ma_tai_khoan == ma_tai_khoan) {
            return "Bạn " + this.noi_dung;
        } else {
            if (list != null) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].ma_tai_khoan == this.ma_tai_khoan) {
                        return list[i].getName() + " " + this.noi_dung;
                    }
                }
            }
        }
        return "";
    }

    public isBanThan() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        return this.ma_tai_khoan == ma_tai_khoan;
    }

    public getColor(mau: string) {
        if (this.isBanThan()) return mau;
        return "#e4e6eb";
    }

    public getMarginTop(i: number, tin_nhans: ChatPageTinNhan[]) {
        if (i == 0) {
            return "0px";
        } else {
            if (tin_nhans[i - 1].loai_tin_nhan == 'thong_bao') {
                return "9px";
            }
            if (tin_nhans[i - 1].ma_tai_khoan != this.ma_tai_khoan) {
                return "9px";
            }
            if (tin_nhans[i - 1].ma_tai_khoan == this.ma_tai_khoan) {
                return "2px";
            }
            return "100px";
        }
    }


    public getTen(list: ChatPageObjectTinNhanFriend[]): string {
        if (list != null) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].ma_tai_khoan == this.ma_tai_khoan) {
                    return list[i].getName();
                }
            }
        }
        return "";
    }

    public getHinh(list: ChatPageObjectTinNhanFriend[]): string {
        if (list != null) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].ma_tai_khoan == this.ma_tai_khoan) {
                    return list[i].link_hinh_dai_dien;
                }
            }
        }
        return "";
    }

    public isDaGui() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi' || this.tinh_trang_xem[i].xem_chua == 'dang') {
                    return false;
                }
            }
        }
        return true;
    }

    public getTime() {
        let date = new Date(this.ngay_gui);
        let year = date.getFullYear();
        let thang = date.getMonth() + 1;
        let ngay = date.getDate();
        let gio = date.getHours();
        let phut = date.getMinutes();
        let giay = date.getSeconds();
        return `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}:${giay.toString().length > 1 ? giay : "0" + giay} ${ngay.toString().length > 1 ? ngay : "0" + ngay} Tháng ${thang.toString().length > 1 ? thang : "0" + thang}, ${year}`;
    }

    public isDaChuyen() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        let count = 0;
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi') {
                    return false;
                }
                if (this.tinh_trang_xem[i].xem_chua == 'chua') {
                    count++;
                }
            }
        }
        if (count == this.tinh_trang_xem.length - 1) {
            return false;
        }
        return true;
    }

    public isCoNguoiXem() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn"));
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan
                && this.tinh_trang_xem[i].ma_tai_khoan != this.ma_tai_khoan
            ) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi') {
                    return true;
                }
            }
        }
        return false;
    }

    public isShowNguoiXem(index: number, tin_nhan: ChatPageTinNhan[]) {
        let count = 0;
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].isOke(this.ma_tai_khoan)
                && this.isLastDaXem(index, this.tinh_trang_xem[i].ma_tai_khoan, tin_nhan)
            ) {
                count++;
            }
        }
        return count;
    }

    public getNguoiXemDuyNhatDo(index: number, tin_nhan: ChatPageTinNhan[]): ChatPageTinhTrangXem {
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].isOke(this.ma_tai_khoan)
                && this.isLastDaXem(index, this.tinh_trang_xem[i].ma_tai_khoan, tin_nhan)
            ) {
                return this.tinh_trang_xem[i];
            }
        }
        return null;
    }

    public isLastDaXem(index: number, mtk: string, tin_nhan: ChatPageTinNhan[]): boolean {
        for (let i = tin_nhan.length - 1; i > -1; i--) {
            for (let j = 0; j < tin_nhan[i].tinh_trang_xem.length; j++) {
                if (tin_nhan[i].tinh_trang_xem[j].ma_tai_khoan == mtk) {
                    if (tin_nhan[i].tinh_trang_xem[j].xem_chua == "roi") {
                        if (i == index) return true;
                        else return false;
                    }
                    break;
                }
            }
        }
        return false;
    }

    public isHaveBorderTop(index: number, tin_nhan: ChatPageTinNhan[]) {
        if (index == 0) {
            return true;
        } else {
            if (tin_nhan[index - 1].ma_tai_khoan != this.ma_tai_khoan) {
                return true;
            } else if (tin_nhan[index - 1].loai_tin_nhan == 'thong_bao' || tin_nhan[index - 1].loai_tin_nhan == 'gui_text_icon') {
                return true;
            }
        }
        return false;
    }

    public isHaveBorderBottom(index: number, tin_nhan: ChatPageTinNhan[]) {
        if (index == tin_nhan.length - 1) {
            return true;
        } else {
            if (tin_nhan[index + 1].ma_tai_khoan != this.ma_tai_khoan) {
                return true;
            } else if (tin_nhan[index - 1].loai_tin_nhan == 'thong_bao' || tin_nhan[index - 1].loai_tin_nhan == 'gui_text_icon') {
                return true;
            }
        }
        return false;
    }

}
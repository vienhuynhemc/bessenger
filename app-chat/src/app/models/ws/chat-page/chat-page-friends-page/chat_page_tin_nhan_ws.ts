import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CamXucTinNhanWS } from '../chat-page-chat-page/content/select-emoji/cam_xuc_tin_nhan_ws';
import { ChatPageObjectTinNhanFriendWS } from './chat_page_object_tin_nhan_friend_ws';
import { ChatPageTinhTrangXemWS } from './chat_page_tinh_trang_xem_ws';

export class ChatPageTinNhanWS {

    ma_tin_nhan: string;
    dia_chi_file: string;
    link_file: string;
    loai_tin_nhan: string;
    ma_tai_khoan: string;
    ten: string;
    ma_tin_nhan_phan_hoi: string;
    ngay_gui: number;
    ngay_thu_hoi: number;
    noi_dung: string;
    alt: string;
    tinh_trang_xem: ChatPageTinhTrangXemWS[];
    cam_xuc_tin_nhan: CamXucTinNhanWS[];
    danh_sach_url_anh: string[]
    // Các thuộc tính giúp đỡ lag
    // Có phải là bản thân ko
    public isBanThan: boolean;
    // Thời gian gửi của tin nhắn
    public timeSend: string = "";
    // Có phải trạng thái tin nhắn đã gửi ?
    public isDaGui: boolean;
    // Có phải trạng thái tin nhắn đã chuyển ?
    public isDaChuyen: boolean;
    // Có người xem chưa
    public isCoNguoiXem: boolean;
    // Tên của người sở hữu tinh nhắn này
    public ten_da_duoc_xu_ly: string;
    // Link hình địa diện nếu ko phải bản thân
    public link_hinh_dai_dien = null;
    // Có border top ở css hay không
    public isHaveBorderTop: boolean;
    public isHaveBorderBottom: boolean;
    // Margintop
    public marginTop: string = "";
    // Số người xem đang ở vị trí của tin nhắn
    public soNguoiXemDangOViTriCuaTinNhanNay: number;
    // Ta sẽ nắm thóp được 1 thằng nếu chỉ có duy nhất 1 người xem qua lúc tính soNguoiXemDangOViTriNay
    public thangXemDuyNhat: ChatPageTinhTrangXemWS = new ChatPageTinhTrangXemWS();

    // Các thuộc tính riêng cho từng loại
    noi_dung_thong_bao: string = "";

    // noi_dung_html của tin nhắn
    public noi_dung_html: SafeHtml = "";

    // Nội dung thu hồi
    public noi_dung_thu_hoi: string = "";

    // Có show biểu tượng cảm xúc
    is_show_select_emoji: boolean;
    //////////////// Cảm xúc ////////////////////
    is_have_tim: boolean;
    tool_tip_tim: string = "";
    is_have_cuoi: boolean;
    tool_tip_cuoi: string = "";
    is_have_wow: boolean;
    tool_tip_wow: string = "";
    is_have_buon: boolean;
    tool_tip_buon: string = "";
    is_have_gian: boolean;
    tool_tip_gian: string = "";
    is_have_like: boolean;
    tool_tip_like: string = "";
    is_have_dislike: boolean;
    tool_tip_dislike: string = "";
    /////////////////////////////////////////////

    // Có biểu tượng cảm xúc nào hay không
    is_exits_dscx: boolean;
    // tooltip p
    toolTipDSCXALL: string = "";

    public getIsExitsDSCX() {
        if (this.cam_xuc_tin_nhan != null && this.cam_xuc_tin_nhan.length > 0) {
            this.is_exits_dscx = true;
        } else {
            this.is_exits_dscx = false;
        }
    }

    public getIsExitsCX() {
        if (this.is_exits_dscx) {
            let v1 = "";
            let v2 = "";
            let v3 = "";
            let v4 = "";
            let v5 = "";
            let v6 = "";
            let v7 = "";
            for (let i = 0; i < this.cam_xuc_tin_nhan.length; i++) {
                if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'tim') {
                    this.is_have_tim = true;
                    v1 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'cuoi') {
                    this.is_have_cuoi = true;
                    v2 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'wow') {
                    this.is_have_wow = true;
                    v3 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'buon') {
                    this.is_have_buon = true;
                    v4 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'gian') {
                    this.is_have_gian = true;
                    v5 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'like') {
                    this.is_have_like = true;
                    v6 += this.cam_xuc_tin_nhan[i].ten + "\n";
                } else if (this.cam_xuc_tin_nhan[i].loai_cam_xuc == 'dislike') {
                    this.is_have_dislike = true;
                    v7 += this.cam_xuc_tin_nhan[i].ten + "\n";
                }
            }
            this.tool_tip_tim = v1;
            this.tool_tip_cuoi = v2;
            this.tool_tip_wow = v3;
            this.tool_tip_buon = v4;
            this.tool_tip_gian = v5;
            this.tool_tip_like = v6;
            this.tool_tip_dislike =v7;
        }
    }

    public getToolTipP() {
        let value: string = "";
        if (this.is_exits_dscx) {
            for (let i = 0; i < this.cam_xuc_tin_nhan.length; i++) {
                value += this.cam_xuc_tin_nhan[i].ten;
                if (i != this.cam_xuc_tin_nhan.length - 1) {
                    value += "\n";
                }
            }
        }
        this.toolTipDSCXALL = value;
    }

    public getNoiDungHTMLTinNhan(sanitized: DomSanitizer) {
        let result: SafeHtml = "";
        if (this.loai_tin_nhan == 'gui_text') {
            result = sanitized.bypassSecurityTrustHtml(this.noi_dung);
        } else if (this.loai_tin_nhan == 'gui_text_icon') {
            let div = document.createElement("div");
            div.innerHTML = this.noi_dung;
            for (let i = 0; i < div.children.length; i++) {
                div.children[i].classList.remove("span-image-box-chat");
                div.children[i].classList.add("gui_text_icon_icon");
            }
            result = sanitized.bypassSecurityTrustHtml(div.innerHTML);
        }
        this.noi_dung_html = result;
    }

    public getNoiDungThongBao() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        if (this.ma_tai_khoan == ma_tai_khoan) {
            this.noi_dung_thong_bao = "Bạn " + this.noi_dung;
        } else {
            let array = this.ten.trim().split(" ");
            this.noi_dung_thong_bao = array[array.length - 1] + " " + this.noi_dung;
        }
    }

    public getIsBanThan() {
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        this.isBanThan = this.ma_tai_khoan == ma_tai_khoan;
    }


    public getMarginTopTinNhan(tin_nhan: ChatPageTinNhanWS) {
        let result = "";
        if (this.loai_tin_nhan == 'gui_nhan_dan'
            || this.loai_tin_nhan == 'gui_giphy'
            || this.loai_tin_nhan == 'thong_bao'
            || this.loai_tin_nhan == 'thoi_gian'
            || this.loai_tin_nhan == 'gui_tin_nhan_like'
            || this.loai_tin_nhan == 'gui_ghi_am'
            || this.loai_tin_nhan == 'thu_hoi'
            || this.loai_tin_nhan == 'cuoc_goi_nho'
        ) {
            result = "9px";
        }
        else if (tin_nhan.loai_tin_nhan == 'gui_nhan_dan'
            || tin_nhan.loai_tin_nhan == 'gui_giphy'
            || tin_nhan.loai_tin_nhan == 'thong_bao'
            || tin_nhan.loai_tin_nhan == 'thoi_gian'
            || tin_nhan.loai_tin_nhan == 'gui_tin_nhan_like'
            || tin_nhan.loai_tin_nhan == 'gui_ghi_am'
            || tin_nhan.loai_tin_nhan == 'thu_hoi'
            || tin_nhan.loai_tin_nhan == 'cuoc_goi_nho'
        ) {
            result = "9px";
        }
        else if (tin_nhan.ma_tai_khoan != this.ma_tai_khoan) {
            result = "9px";
        }
        else if (tin_nhan.ma_tai_khoan == this.ma_tai_khoan) {
            result = "2px";
        }
        this.marginTop = result;
    }


    public getTen() {
        let array = this.ten.trim().split(" ");
        this.ten_da_duoc_xu_ly = array[array.length - 1];
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

    public getIsDaGui() {
        let result = true;
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi' || this.tinh_trang_xem[i].xem_chua == 'dang') {
                    result = false;
                    break;
                }
            }
        }
        this.isDaGui = result;
    }

    public getTime() {
        if (this.loai_tin_nhan != 'thu_hoi') {
            this.timeSend = this.getStringTime(this.ngay_gui);
        } else {
            this.timeSend = "Gửi vào: " + this.getStringTime(this.ngay_gui) + "\nThời gian thu hồi: " + this.getStringTime(this.ngay_thu_hoi);
            let ten = "";
            let mtk = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
            if (this.ma_tai_khoan == mtk) {
                ten = "Bạn";
            } else {
                let array = this.ten.trim().split(" ");
                ten = array[array.length - 1];
            }
            this.noi_dung_thu_hoi = ten + " đã thu hồi một tin nhắn";
        }
    }

    public getStringTime(time: number) {
        let date = new Date(this.ngay_gui);
        let year = date.getFullYear();
        let thang = date.getMonth() + 1;
        let ngay = date.getDate();
        let gio = date.getHours();
        let phut = date.getMinutes();
        let giay = date.getSeconds();
        return `${gio.toString().length > 1 ? gio : "0" + gio}:${phut.toString().length > 1 ? phut : "0" + phut}:${giay.toString().length > 1 ? giay : "0" + giay} ${ngay.toString().length > 1 ? ngay : "0" + ngay} Tháng ${thang.toString().length > 1 ? thang : "0" + thang}, ${year}`;
    }

    public getIsDaChuyen() {
        let result = true;
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        let count = 0;
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi') {
                    result = false;
                }
                if (this.tinh_trang_xem[i].xem_chua == 'chua') {
                    count++;
                }
            }
        }
        if (result) {
            if (count == this.tinh_trang_xem.length - 1) {
                result = false;
            } else {
                result = true;
            }
        }
        this.isDaChuyen = result;
    }

    public getIsCoNguoiXem() {
        let result = false;
        let ma_tai_khoan = JSON.parse(localStorage.getItem("ma_tai_khoan_dn_ws"));
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].ma_tai_khoan != ma_tai_khoan
                && this.tinh_trang_xem[i].ma_tai_khoan != this.ma_tai_khoan
                && !this.tinh_trang_xem[i].is_roi_chua
            ) {
                if (this.tinh_trang_xem[i].xem_chua == 'roi') {
                    result = true;
                    break;
                }
            }
        }
        this.isCoNguoiXem = result;
    }

    public getSoNguoiXemDangOViTriTinNhanNay(index: number, tin_nhan: ChatPageTinNhanWS[]) {
        let count = 0;
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].isOke(this.ma_tai_khoan)
                && this.isLastDaXem(index, this.tinh_trang_xem[i].ma_tai_khoan, tin_nhan)
            ) {
                count++;
                // cập nhật cho thằng tinh_trang_xem này được phép show
                this.tinh_trang_xem[i].isShow = true;
            }
        }
        this.soNguoiXemDangOViTriCuaTinNhanNay = count;
        // xem thử phải có 1 thằng ko, nếu 1 thì bắt thằng đó
        if (this.soNguoiXemDangOViTriCuaTinNhanNay == 1) {
            this.thangXemDuyNhat = this.getNguoiXemDuyNhat(index, tin_nhan);
        }
    }

    public getNguoiXemDuyNhat(index: number, tin_nhan: ChatPageTinNhanWS[]): ChatPageTinhTrangXemWS {
        for (let i = 0; i < this.tinh_trang_xem.length; i++) {
            if (this.tinh_trang_xem[i].isOke(this.ma_tai_khoan)
                && this.isLastDaXem(index, this.tinh_trang_xem[i].ma_tai_khoan, tin_nhan)
            ) {
                return this.tinh_trang_xem[i];
            }
        }
        return null;
    }

    public isLastDaXem(index: number, mtk: string, tin_nhan: ChatPageTinNhanWS[]): boolean {
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

    public getIsHaveBorderTop(tin_nhan: ChatPageTinNhanWS) {
        let result = false;

        if (tin_nhan.ma_tai_khoan != this.ma_tai_khoan) {
            result = true;
        } else if (
            tin_nhan.loai_tin_nhan == 'thong_bao'
            || tin_nhan.loai_tin_nhan == 'thoi_gian'
            || tin_nhan.loai_tin_nhan == 'gui_text_icon'
            || tin_nhan.loai_tin_nhan == 'gui_nhan_dan'
            || tin_nhan.loai_tin_nhan == 'gui_giphy'
            || tin_nhan.loai_tin_nhan == 'gui_tin_nhan_like'
            || tin_nhan.loai_tin_nhan == 'gui_ghi_am'
            || tin_nhan.loai_tin_nhan == 'thu_hoi'
            || tin_nhan.loai_tin_nhan == 'cuoc_goi_nho'
        ) {
            result = true;
        }

        this.isHaveBorderTop = result;
    }

    public getIsHaveBorderBottom(tin_nhan: ChatPageTinNhanWS) {
        let result = false;
        if (tin_nhan.ma_tai_khoan != this.ma_tai_khoan) {
            result = true;
        } else if (tin_nhan != null && (tin_nhan.loai_tin_nhan == 'thong_bao'
            || tin_nhan.loai_tin_nhan == 'gui_text_icon'
            || tin_nhan.loai_tin_nhan == 'thoi_gian'
            || tin_nhan.loai_tin_nhan == 'gui_nhan_dan'
            || tin_nhan.loai_tin_nhan == 'gui_giphy'
            || tin_nhan.loai_tin_nhan == 'gui_tin_nhan_like'
            || tin_nhan.loai_tin_nhan == 'gui_ghi_am'
            || tin_nhan.loai_tin_nhan == 'thu_hoi'
            || tin_nhan.loai_tin_nhan == 'cuoc_goi_nho'
        )) {
            result = true;
        }
        this.isHaveBorderBottom = result;
    }
    
    public checkLimitNameFile() {
        if (this.link_file.length > 18) return true;
      return false;
    }

    public getLimitNameFile() {
        let result = this.link_file;
        if (result.length > 11) {
          result = this.link_file.substring(0, 17).trim();
          result += '...';
        }
        return result;
    }
}
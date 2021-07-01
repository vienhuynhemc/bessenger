export class ChatPageObjectTinNhanFriend {

    ma_tai_khoan: string;
    link_hinh_dai_dien: string;
    lan_cuoi_dang_nhap: number;
    ten: string;
    ngay_tham_gia: number;
    ngay_roi_di: number;
    roi_chua: string;
    trang_thai: string;

    public getName(): string {
        if (this.ten != null) {
            let array = this.ten.trim().split(" ");
            return array[array.length - 1];
        }
        return "";
    }

}
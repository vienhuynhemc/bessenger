export class ChatPageBanBe {

    ma_tai_khoan: string;
    link_hinh_dai_dien: string;
    lan_cuoi_dang_nhap: number;
    ma_cuoc_tro_chuyen: string;
    trang_thai_online: boolean;
    ten: string;

    public tenGioiHan() {
        let result = this.ten;
        if (result.length > 7) {
            result = this.ten.substring(0, 6).trim();
            result += "...";
        }
        return result;
    }
}
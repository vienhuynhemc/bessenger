import { ChatPageObjectTenWS } from "./chat_page_object_ten_ws";

export class ChatPageBanBeWS {
    email: string;
    ma_tai_khoan: string;
    link_hinh_dai_dien: string;
    lan_cuoi_dang_nhap: number;
    ma_cuoc_tro_chuyen: string;
    trang_thai_online: boolean;
    ten: string;
    tenGioiHan:ChatPageObjectTenWS;
   
    public getTenGioiHan(){
        let result = new ChatPageObjectTenWS();
        result.noi_dung = this.ten;
        result.noi_dung_goc = this.ten;
        if (result.noi_dung != null) {
            if (result.noi_dung.length > 7) {
                result.noi_dung = this.ten.substring(0, 6).trim() + "...";
                result.is_cut = true;
            } else {
                result.is_cut = false;
            }
        }
        this.tenGioiHan = result;
    }
}
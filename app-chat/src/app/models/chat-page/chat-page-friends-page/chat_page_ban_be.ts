import { ChatPageObjectTen } from './chat_page_object_ten';
export class ChatPageBanBe {

    ma_tai_khoan: string;
    link_hinh_dai_dien: string;
    lan_cuoi_dang_nhap: number;
    ma_cuoc_tro_chuyen: string;
    trang_thai_online: boolean;
    ten: string;
    tenGioiHan:ChatPageObjectTen;
    
    public getTenGioiHan(){
        let result = new ChatPageObjectTen();
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
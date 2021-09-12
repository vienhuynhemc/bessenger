import { ChatPageTinNhanWS } from "./chat_page_tin_nhan_ws";

export class ChatPageCuocTroChuyenWS {

    ma_cuoc_tro_chuyen: string;
    loai_cuoc_tro_truyen: string;
    ten_nhom: string;
    ngay_tao: number;
    ma_tai_khoan_chu_so_huu: string;
    ten_nguoi_so_huu: string;
    ton_tai: number;
    mau: string;
    mau_tren:string;
    mau_duoi:string;
    bieu_tuong_cam_xuc: string;
    tin_nhan: ChatPageTinNhanWS[];

    public isHaveMarginTopThongBao(index: number) {
        if (index == 0) return false;
        return true;
    }

}
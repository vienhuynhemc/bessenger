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
}
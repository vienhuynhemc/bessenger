import { ChatPageCuocTroChuyen } from './chat_page_cuoc_tro_chuyen';
import { ChatPageObjectTinNhanFriend } from './chat_page_object_tin_nhan_friend';
export class ChatPageFriendsObjectLeft {

    cuoc_tro_truyen: ChatPageCuocTroChuyen;
    thong_tin_thanh_vien: ChatPageObjectTinNhanFriend[];

    // Trạng thái online
    trang_thai_online: boolean;

    // Tin nhắn cuối cùng
    loai_tin_nhan_cuoi_cung: string;
    noi_dun_tin_nhan_cuoi_cung: string;
    ngay_tao_tin_nhan_cuoi_cung: number;
    ma_tai_khoan_tin_nhan_cuoi_cung: string;

    // Selected
    box_chat_dang_duoc_chon: boolean;

    public getLastTime(): number {
        let last_time: number = 0;
        if (this.ngay_tao_tin_nhan_cuoi_cung != null) {
            last_time = this.ngay_tao_tin_nhan_cuoi_cung;
        } else {
            if (this.cuoc_tro_truyen.loai_cuoc_tro_truyen == "nhom") {
                last_time = this.cuoc_tro_truyen.ngay_tao;
            } else {
                last_time = 0;
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

}
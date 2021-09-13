export class ChatPageObjectTinNhanFriendWS {

    ma_tai_khoan: string;
    link_hinh_dai_dien: string;
    lan_cuoi_dang_nhap: number;
    ten: string;
    ngay_tham_gia: number;
    ngay_roi_di: number;
    roi_chua: string;
    trang_thai: string;
    email: string;
    // Tên đã được xử lý -> chỉ lấy tên thay vì cả họ lẫn tên
    ten_da_duoc_xu_ly:string = "";

    public getName() {
        let result = "";
        if (this.ten != null) {
            let array = this.ten.trim().split(" ");
            result =  array[array.length - 1];
        }
        this.ten_da_duoc_xu_ly = result;
    }

}
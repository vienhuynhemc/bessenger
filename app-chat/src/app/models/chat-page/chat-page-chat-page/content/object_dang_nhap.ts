export class ObjectDangNhap {

    ma_tai_khoan: string;
    hinh: string;
    ten: string;
    lan_cuoi_dang_nhap:number;

    public getNoiDung(){
        return this.ten+" đang nhập gì đó :v";
    }
}
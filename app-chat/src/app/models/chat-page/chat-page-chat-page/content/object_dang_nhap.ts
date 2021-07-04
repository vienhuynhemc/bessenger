export class ObjectDangNhap {

    ma_tai_khoan: string;
    hinh: string;
    ten: string;
    lan_cuoi_dang_nhap:number;

    // Nội dung
    public noi_dung:string= "";

    public getNoiDung(){
        this.noi_dung =  this.ten+" đang nhập gì đó :v";
    }
}
//  đối tượng chứa thông tin người dùng
export class UserChat {
    id_user: number;
    name: string;
    img : string;
    // tin nhắn cuối cùng
    lastMessage: string;
    // id người gửi tin nhắn cuối
    id_send: number;
    // thời gian gửi tin nhắn
    timeLastMessage: Date;
    // trạng thái người dùng có online hay k
    status: string;
    // thu gọn lại tin nhắn cuối
    splitLastMessage() : void {

    }
    // chỉnh sửa lại thời gian cho phù hợp
    formaLastMessageTime() :void{

    }
}
//  chứa thông tin nhóm chat, mặc định là nhóm chat 1vs1 nếu iduser.length > 2 là nhóm chat nhiều thành viên
export class BoxChat {
    idGroupConver: number;
    // id nhóm chat
    idGroup: number;
    // tên nhóm chat
    nameGroup: string;
    // nếu nhóm chat thì có > 2 userid
    idUser: [];
    // biệt danh trong chat nếu k có thì là tên mặc định
    nickName: string;
    // ảnh đại diện
    img : [];
    // tin nhắn cuối cùng
    lastMessage: string;
    // id người gửi
    idSend: number;
    // tên người gửi
    nameSend: string;
    // thời gian gửi tin nhắn
    timeLastMessage: Date;
    // trạng thái người dùng có online hay k 'online' , 'none'
    status: string;
    // số người đã đọc tin nhắn
    memberReadedMessage: []
    // thu gọn lại tin nhắn cuối
    splitLastMessage() : void {

    }
    // chỉnh sửa lại thời gian cho phù hợp
    formaLastMessageTime() :void{

    }
    
    // thu gọn lại tên người gửi
    splitName() {

    }
}
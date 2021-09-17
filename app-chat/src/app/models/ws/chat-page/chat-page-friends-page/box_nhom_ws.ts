import { BoxNhomUserList } from "./box_nhom_user_list";
import { ChatDataWs } from "./chat_data_ws";

export class BoxNhomWs{
    id:string;
    name:string;
    own:string;
    userList:BoxNhomUserList[];
    chatData:ChatDataWs[];
    page:number;
}
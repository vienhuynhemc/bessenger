export class FriendInfor {
    id: any;
    img: string;
    name: string;
    mutualFriends: number = 0;
    date: number;
    status: boolean;
    sex: string;

    // định dạng ngày tháng VD: 27 Tháng Tám 2020 - 10:04:02
    public dateAddFormatMutualFriends() {
        let dateAdd = new Date(this.date);
        console.log(dateAdd.getDate())
    }
    // kiểm tra giới hạn tên
    public checkLimitName() {
        if(this.name.length > 7)
            return true
        return false;
    }
    // lấy ra tên đã được giới hạn
    public getNameLimit() {
        let result = this.name;
        if (result.length > 7) {
            result = this.name.substring(0, 6).trim();
            result += "...";
        }
        return result;
    }
}
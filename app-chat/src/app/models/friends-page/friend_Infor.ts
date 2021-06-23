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
        let dateFrist = new Date(this.date)
        let dateConvert = dateFrist.toString();
        let dateAdd = dateConvert.split(' ');
        let day = dateAdd[2];
        let month = dateAdd[1];
        let year = dateAdd[3];
        let time = dateAdd[4]
        let monthFormat;
        let dayFormat;
        switch(month) {
            case 'Jan':
              monthFormat = 'Một';
              break;
            case 'Feb':
                monthFormat = 'Hai';
                break;
            case 'Mar':
                monthFormat = 'Ba';
                break;
            case 'Apr':
                monthFormat = 'Bốn';
                break;
            case 'May':
                monthFormat = 'Năm';
                break;
            case 'Jun':
                monthFormat = 'Sáu';
                break;
            case 'Jul':
                monthFormat = 'Bảy';
                break;
            case 'Aug':
                monthFormat = 'Tám';
                break;
            case 'Sep':
                monthFormat = 'Chín';
                break;
            case 'Oct':
                monthFormat = 'Mười';
                break;
            case 'Nov':
                monthFormat = 'Mười Một';
                break;
            case 'Dec':
                monthFormat = 'Mười Hai';
                break;
        }
       
        return day + ' Tháng ' + monthFormat+ ' ' + year + ' - '+ time;
    }
    // kiểm tra giới hạn tên danh sách bạn bè
    public checkLimitNameFriendsList() {
        if(this.name != undefined) {
            if(this.name.length > 20)
                return true
        }
        return false;
    }
    // lấy ra tên đã được giới hạn danh sách bạn bè
    public getNameLimitFriendsList() {
        let result = this.name;
        if (result.length > 20) {
            result = this.name.substring(0, 19).trim();
            result += "...";
        }
        return result;
    }

    // kiểm tra giới hạn tên profile bạn bè
    public checkLimitNameFriendsProfile() {
        if(this.name.length > 23)
            return true
        return false;
    }

      // lấy ra tên đã được giới hạn profile bạn bè
      public getNameLimitFriendsProfile() {
        let result = this.name;
        if (result.length > 23) {
            result = this.name.substring(0, 22).trim();
            result += "...";
        }
        return result;
    }

    // kiểm tra giới hạn tên bạn chung bạn bè
    public checkLimitNameMutualFriends() {
        if(this.name.length > 30)
            return true
        return false;
    }

      // lấy ra tên đã được giới hạn profile bạn bè
      public getNameLimitMutualFriends() {
        let result = this.name;
        if (result.length > 30) {
            result = this.name.substring(0, 29).trim();
            result += "...";
        }
        return result;
    }
}
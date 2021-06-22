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
        let day = dateAdd.getDate();
        let month = dateAdd.getMonth();
        let year = dateAdd.getUTCFullYear();
        let hour = dateAdd.getUTCHours();
        let minutes = dateAdd.getUTCMinutes();
        let seconds = dateAdd.getUTCSeconds();
        let monthFormat;
        let dayFormat;
        let hourFormat;
        let minutesFormat;
        let secondsFormat;
        switch(month) {
            case 1:
              monthFormat = 'Một';
              break;
            case 2:
                monthFormat = 'Hai';
                break;
            case 3:
                monthFormat = 'Ba';
                break;
            case 4:
                monthFormat = 'Bốn';
                break;
            case 5:
                monthFormat = 'Năm';
                break;
            case 6:
                monthFormat = 'Sáu';
                break;
            case 7:
                monthFormat = 'Bảy';
                break;
            case 8:
                monthFormat = 'Tám';
                break;
            case 9:
                monthFormat = 'Chín';
                break;
            case 10:
                monthFormat = 'Mười';
                break;
            case 11:
                monthFormat = 'Mười Một';
                break;
            case 12:
                monthFormat = 'Mười Hai';
                break;
        }
        if(day < 10) {
            dayFormat = '0' + day;
        }
        else 
            dayFormat =  day;
        if(hour < 10) {
            hourFormat = '0' + hour;
        }
        else 
            hourFormat = hour;
        if(minutes < 10) {
            minutesFormat = '0' + minutes;
        }
        else
            minutesFormat =  minutes;
        if(seconds < 10) {
            secondsFormat = '0' + seconds;
        }
        else
            secondsFormat = seconds;
        return dayFormat + ' Tháng ' + monthFormat+ ' ' + year + ' - ' + hourFormat + ':' + minutesFormat + ':' + secondsFormat;
    }
    // kiểm tra giới hạn tên danh sách bạn bè
    public checkLimitNameFriendsList() {
        if(this.name.length > 20)
            return true
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
        if(this.name.length > 26)
            return true
        return false;
    }

      // lấy ra tên đã được giới hạn profile bạn bè
      public getNameLimitFriendsProfile() {
        let result = this.name;
        if (result.length > 20) {
            result = this.name.substring(0, 25).trim();
            result += "...";
        }
        return result;
    }
}
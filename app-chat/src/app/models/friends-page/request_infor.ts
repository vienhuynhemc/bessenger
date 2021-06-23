export class RequestInfor {
    id: any;
    img: string;
    name: string;
    mutualFriends: number = 0;
    date: number;
    status: boolean;
    sex: string;
    dateRequest: number;

    // định dang thời gian lời mời kết bạn
    public getFormatTimeRequest() {
        let result = "";
        let last_time: number = this.dateRequest;
        //  Lấy thời gian hiện tại
        let currentTime = Number(new Date());
        let over = currentTime - last_time;
        let ONE_MINUTE_IN_MILLIS = 60000;
        if (over < ONE_MINUTE_IN_MILLIS) {
            result = parseInt((over / 1000) + "") + " giây";
        } else if (over < ONE_MINUTE_IN_MILLIS * 60) {
            result = parseInt((over / ONE_MINUTE_IN_MILLIS) + "") + " phút";
        } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24) {
            result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60)) + "") + " giờ";
        } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 7) {
            result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24)) + "") + " ngày";
        } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365) {
            result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 7)) + "") + " tuần";
        } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365 * 100) {
            result = parseInt((over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 365)) + "") + " năm";
        }
        return result;
    }

      // kiểm tra giới hạn tên lời mời kết bạn
      public checkLimitNameRequestList() {
        if(this.name != undefined) {
            if(this.name.length > 16)
                return true
        }
        return false;
    }

    // lấy ra tên đã được giới hạn lời mời kết bạn
    public getNameLimitRequestList() {
        let result = this.name;
        if (result.length > 16) {
            result = this.name.substring(0, 16).trim();
            result += "...";
        }
        return result;
    }
    // kiểm tra giới hạn tên profile bạn bè
    public checkLimitNameRequestProfile() {
        if(this.name.length > 23)
            return true
        return false;
    }

    // lấy ra tên đã được giới hạn profile bạn bè
    public getNameLimitRequestProfile() {
        let result = this.name;
        if (result.length > 23) {
            result = this.name.substring(0, 22).trim();
            result += "...";
        }
        return result;
    }
}
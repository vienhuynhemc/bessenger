export class SendInforWS {
    id: any;
    img: string;
    name: string;
    mutualFriends: number = 0;
    date: number;
    status: boolean;
    sex: string;
    dateSend: number;
    lastOnline: number;
    // định dang thời gian gửi yêu cầu
  public getFormatTimeSend() {
    let result = '';
    let last_time: number = this.dateSend;
    //  Lấy thời gian hiện tại
    let currentTime = Number(new Date());
    let over = currentTime - last_time;
    let ONE_MINUTE_IN_MILLIS = 60000;
    if (over < ONE_MINUTE_IN_MILLIS) {
      result = parseInt(over / 1000 + '') + ' giây';
    } else if (over < ONE_MINUTE_IN_MILLIS * 60) {
      result = parseInt(over / ONE_MINUTE_IN_MILLIS + '') + ' phút';
    } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24) {
      result = parseInt(over / (ONE_MINUTE_IN_MILLIS * 60) + '') + ' giờ';
    } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 7) {
      result = parseInt(over / (ONE_MINUTE_IN_MILLIS * 60 * 24) + '') + ' ngày';
    } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365) {
      result =
        parseInt(over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 7) + '') + ' tuần';
    } else if (over < ONE_MINUTE_IN_MILLIS * 60 * 24 * 365 * 100) {
      result =
        parseInt(over / (ONE_MINUTE_IN_MILLIS * 60 * 24 * 365) + '') + ' năm';
    }
    return result;
  }

//   định dạng bạn chung gửi lời mời
  public dateSendFormatMutualFriends() {
    if (this.date != undefined) {
      let dateFrist = new Date(this.date);
      let dateConvert = dateFrist.toString();
      let dateAdd = dateConvert.split(' ');
      let day = dateAdd[2];
      let month = dateAdd[1];
      let year = dateAdd[3];
      let time = dateAdd[4];
      let monthFormat;
     
      switch (month) {
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

      return day + ' Tháng ' + monthFormat + ' ' + year + ' - ' + time;
    } else return '';
  }

  // chỉ lấy ra tên
  public getNameLast() {
    if (this.name != undefined) {
      let nameSplit = this.name.trim().split(' ');
      if (nameSplit.length == 0) return nameSplit[0].toLowerCase();
      else return nameSplit[nameSplit.length - 1].toLowerCase();
    }
    return '';
  }

  // kiểm tra giới hạn tên lời mời kết bạn
  public checkLimitNameSendList() {
    if (this.name != undefined) {
      if (this.name.length > 16) return true;
    }
    return false;
  }

  // lấy ra tên đã được giới hạn lời mời kết bạn
  public getNameLimitSendList() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 16) {
        result = this.name.substring(0, 16).trim();
        result += '...';
      }
      return result;
    } else return '';
  }
  // kiểm tra giới hạn tên profile bạn bè
  public checkLimitNameSendProfile() {
    if (this.name != undefined) {
      if (this.name.length > 16) return true;
    }
    return false;
  }

  // lấy ra tên đã được giới hạn profile bạn bè
  public getNameLimitSendProfile() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 16) {
        result = this.name.substring(0, 15).trim();
        result += '...';
      }
      return result;
    } else return '';
  }

  // kiểm tra giới hạn tên bạn chung bạn bè
  public checkLimitNameMutualSend() {
    if (this.name != undefined) {
      if (this.name.length > 30) return true;
    }
    return false;
  }

  // lấy ra tên đã được giới hạn profile bạn bè
  public getNameLimitMutualSend() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 30) {
        result = this.name.substring(0, 29).trim();
        result += '...';
      }
      return result;
    } else return '';
  }
}
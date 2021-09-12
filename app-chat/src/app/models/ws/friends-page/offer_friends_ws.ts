export class OfferFriendsInforWS {
    id: any;
    img: string;
    name: string;
    mutualFriends: number = 0;
    date: number;
    status: boolean;
    sex: string;
    lastOnline: number;
    checkAddOrUndo: string;

     // kiểm tra giới hạn tên danh sách bạn bè
  public checkLimitNameOfferList() {
    if (this.name != undefined) {
      if (this.name.length > 10) return true;
    }
    return false;
  }
  // lấy ra tên đã được giới hạn danh sách bạn bè
  public getNameLimitOfferList() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 10) {
        result = this.name.substring(0, 9).trim();
        result += '...';
      }
      return result;
    }
    return '';
  }

  // kiểm tra giới hạn tên bạn chung bạn bè
  public checkLimitNameMutualOffer() {
    if (this.name != undefined) {
      if (this.name.length > 30) return true;
    }
    return false;
  }

  // lấy ra tên đã được giới hạn profile bạn bè
  public getNameLimitMutualOffer() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 30) {
        result = this.name.substring(0, 29).trim();
        result += '...';
      }
      return result;
    } else return '';
  }


  // định dạng ngày tháng VD: 27 Tháng Tám 2020 - 10:04:02
  public dateAddFormatMutualOffer() {
    if (this.date != undefined) {
      let dateFrist = new Date(this.date);
      let dateConvert = dateFrist.toString();
      let dateAdd = dateConvert.split(' ');
      let day = dateAdd[2];
      let month = dateAdd[1];
      let year = dateAdd[3];
      let time = dateAdd[4];
      let monthFormat;
      let dayFormat;
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
      if (nameSplit.length == 0) return nameSplit[0];
      else return nameSplit[nameSplit.length - 1].toUpperCase();
    }
    return '';
  }
  // chỉ lấy ra họ
  public getFirstName() {
    if (this.name != undefined) {
      let nameSplit = this.name.trim().split(' ');
      return nameSplit[0].toUpperCase();
    }
    return '';
  }
  // lấy ra tất cả trừ tên
  public getAllNotName() {
    if (this.name != undefined) {
      let nameSplit = this.name.trim().split(' ');
      let result = '';
      for(let index = 0; index < nameSplit.length - 1; index++) {
        result += nameSplit[index]
      }
      return result.toUpperCase();
    }
    return '';
  }

  // kiểm tra giới hạn tên profile bạn bè
  public checkLimitNameOfferProfile() {
    if (this.name != undefined) {
      if (this.name.length > 13) return true;
    }
    return false;
  }

  // lấy ra tên đã được giới hạn profile bạn bè
  public getNameLimitOfferProfile() {
    if (this.name != undefined) {
      let result = this.name;
      if (result.length > 13) {
        result = this.name.substring(0, 12).trim();
        result += '...';
      }
      return result;
    } else return '';
  }
}
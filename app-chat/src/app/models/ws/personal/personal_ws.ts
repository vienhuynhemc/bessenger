export class PersonalWS {
    email: string;
    sex: string;
    picture: string;
    linkPicture: string;
    pass: string;
    dateCreate: number;
    name: string;
  
    public checkLimitName() {
      if (this.name != undefined) if (this.name.length > 15) return true;
      return false;
    }
    // lấy ra tên đã được giới hạn danh sách bạn bè
    public getLimitName() {
      if (this.name != undefined) {
        let result = this.name;
        if (result.length > 15) {
          result = this.name.substring(0, 14).trim();
          result += '...';
        }
        return result;
      }
      return '';
    }
  
     // định dạng ngày tháng VD: 27 Tháng Tám 2020 - 10:04:02
     public dateCreateFormat() {
      if (this.dateCreate != undefined) {
        let dateFrist = new Date(this.dateCreate);
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
  }
  
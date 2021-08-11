export class MemberGroupChat {
    idUser: string;
    img: string;
    role: string;
    name: string;
    dateJoin: string;

    getLimitName() {
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
    isLimitName() {
        if (this.name != undefined) {
            if (this.name.length > 15) return true;
          }
          return false;
    }
}
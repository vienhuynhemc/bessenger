export class FileShareWS {
    idMessage:string;
    typeMessage: string;
    idAccount: string;
    dateSend: number;
    nameFile: string;
    url: string;

    public checkLimitName() {
        if (this.nameFile.length > 20) return true;
      return false;
    }
    public getLimitName() {
        let result = this.nameFile;
        if (result.length > 18) {
          result = this.nameFile.substring(0, 19).trim();
          result += '...';
        }
        return result;
    }
}
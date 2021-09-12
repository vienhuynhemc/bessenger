import { SafeUrl } from "@angular/platform-browser";

export class FileUploadWS {
    id:string;
    name:string;
    file: File;
    typeFile: string;
    url: SafeUrl;

    public checkLimitName() {
          if (this.name.length > 11) return true;
        return false;
      }
    public getLimitName() {
          let result = this.name;
          if (result.length > 11) {
            result = this.name.substring(0, 10).trim();
            result += '...';
          }
          return result;
      }
}
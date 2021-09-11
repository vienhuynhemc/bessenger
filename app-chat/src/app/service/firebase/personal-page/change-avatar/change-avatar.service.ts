import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PersionalService } from '../persional.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeAvatarService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private persionalService: PersionalService) { }

  accessDBtai_khoan() {
    return this.db.database.ref('tai_khoan')
  }
  accessStoragetai_khoan(file: File) {
    setTimeout(() => {
      this.persionalService.setLoading(true);
    }, 0);
    let parseIDUser = JSON.parse(localStorage.getItem('ma_tai_khoan_dn'));
    let filePath: string = '/tai_khoan/' + parseIDUser +'.png';
    let metadata = { contentType: 'image/jpeg' };
    let ref = this.storage.ref(filePath).put(file,metadata);
    let check100Percent = false;
    ref.percentageChanges().subscribe((percent) => {
      if (percent == 100) {
        ref.snapshotChanges().pipe(finalize(() => {
          this.storage.ref(filePath).getDownloadURL().subscribe((downloadURL) => {
            if(!check100Percent) {
              this.accessDBtai_khoan().child(parseIDUser).update({
                link_hinh: downloadURL
              })
              setTimeout(() => {
                this.persionalService.setLoading(false);
              }, 0);
              check100Percent = true;
            }
          })
        })).subscribe();
      }
    })
  }
}

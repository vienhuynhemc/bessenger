import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MediasShareService {

    // Mặc định là đóng
    public isOpen:boolean;

  constructor( private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  // truy cập vào file da gui
  accessfile_da_gui() {
    return this.db.database.ref('file_da_gui');
  }
  // truy cap firestorage luu_file
  accessluu_fileFireStorage() {
    return this.storage.storage.ref('/luu_file/')
  }



}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FilesShareWsService {
 // Mặc định là đóng
 public isOpen: boolean;

 constructor(private db: AngularFireDatabase) { }

 accessfile_da_gui() {
   return this.db.database.ref('file_da_gui_ws');
 }
 
}

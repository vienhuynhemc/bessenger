import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingBoxChatService {

  // Mặc định là mở
  public isOpen:boolean =true;

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

    // Mặc định là đóng
    public isOpen:boolean;

  constructor() { }
}

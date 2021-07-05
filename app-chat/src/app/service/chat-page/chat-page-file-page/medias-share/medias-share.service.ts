import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediasShareService {

    // Mặc định là đóng
    public isOpen:boolean;

  constructor() { }
}

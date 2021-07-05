import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesShareService {

  // Mặc định là đóng
  public isOpen: boolean;

  constructor() { }
}

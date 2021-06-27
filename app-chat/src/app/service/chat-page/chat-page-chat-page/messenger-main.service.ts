import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessengerMainService {

  // Mã cuộc trò chuyện
  public ma_cuoc_tro_chuyen: string;

  constructor() { }
}

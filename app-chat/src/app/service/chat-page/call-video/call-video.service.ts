import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallVideoService {

  // Request mediaDevices
  public mediaConstraints = {
    audio: true,
    video:true
  }

  // localStream
  public localStream: MediaStream;

  // is show component call video
  public is_show: boolean;

  constructor() { }

}

import { Injectable } from '@angular/core';
import { MediaRecorder } from 'extendable-media-recorder';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  isShowRecording: boolean = false;
  items: any[] = [];
  state: string;
  interval: any;
  timeout:any;
  mediaRecorder: any;
  mediaDevice: any;
  constructor() {}
  // hiển thị ghi âm
  public showRecording() {
    this.isShowRecording = !this.isShowRecording;
  }
  // các trạng thái ghi âm
  public setStatePause() {
    this.state = 'pause'
  }
  public setStateListen(){
    this.state = 'listen'
  }
  public setStateRecording() {
    this.state = 'recording'
  }
  public isStateRecording() {
    return this.state == 'recording'
  }
  public isStatePause() {
    return this.state == 'pauser'
  }
  public isStateListen() {
    return this.state == 'listen'
  }

  // thực hiện ghi âm
  playRecording() {
    let constraintObj = {
      audio: true
    };
    let pause = document.getElementById('pause')
    this.mediaDevice = navigator.mediaDevices.getUserMedia(constraintObj).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      console.log(stream)
      this.mediaRecorder.ondataavailable = e => {
        this.items.push(e.data)
        if(this.mediaRecorder.state == 'inactive') {
          let blob = new Blob(this.items, {type: 'audio/webm'});
          let audio = document.getElementById('content');
          let mainaudio = document.createElement('audio');
          mainaudio.setAttribute('controls', 'controls');
          audio?.appendChild(mainaudio);
          mainaudio.innerHTML = '<source src="' + URL.createObjectURL(blob)+'" type="video/webm"/>';
        }
      }
  
    this.mediaRecorder.start(100)
    this.interval = setInterval(this.raiseRecording, 1000);
    this.timeout = setTimeout(() => {
      // nếu đang ghi thì dừng 
      if(this.mediaRecorder.state == 'recording') {
        this.mediaRecorder.stop()
        clearInterval(this.interval);
      }
    }, 6000);
    })
  }
  
  
  // dừng ghi âm
  stopRecording() {
    // nếu đang ghi thì dừng
    if(this.mediaRecorder.state == 'recording') {
      this.mediaRecorder.stop();
      clearInterval(this.interval)
      clearTimeout(this.timeout)
    }
  }

  // tăng dần thời gian
  raiseRecording() {
    const audioPlayRaise = document.getElementById('time-number');
    let time = audioPlayRaise.dataset.time;
    let timeNext = Number.parseInt(time) + 1;
    if(timeNext < 10) {
      audioPlayRaise.innerHTML = '0:0'+ timeNext;
    } else if(timeNext == 60) {
      audioPlayRaise.innerHTML = '1:00';
    } else {
      audioPlayRaise.innerHTML = '0:'+ timeNext;
    }
    audioPlayRaise.dataset.time = timeNext+'';
  }
}

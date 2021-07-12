import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { MediaRecorder } from 'extendable-media-recorder';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  isShowRecording: boolean = false;
  state: string;
  interval: any;
  timeout: any;
  mediaRecorder: any;
  mediaDevice: any;
  urlAudio: string;
  blob: any;
  storageRef: any;
  timeNext: number;
  intervalListen: any;
  timeoutListen: any;
  trackStream:any;
  constructor(
    private storage: AngularFireStorage
  ) {}
  // hiển thị ghi âm
  public showRecording() {
    this.isShowRecording = !this.isShowRecording;
  }
  // các trạng thái ghi âm
  public setStatePause() {
    this.state = 'pause';
  }
  public setStateListen() {
    this.state = 'listen';
  }
  public setStateRecording() {
    this.state = 'recording';
  }
  public isStateRecording() {
    return this.state == 'recording';
  }
  public isStatePause() {
    return this.state == 'pause';
  }
  public isStateListen() {
    return this.state == 'listen';
  }

  // thực hiện ghi âm
  playRecording() {
    let constraintObj = {
      audio: true,
    };
    this.mediaDevice = navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.trackStream = stream.getTracks();
        let items = [];
        this.mediaRecorder.ondataavailable = (e) => {
          items.push(e.data);
          if (this.mediaRecorder.state == 'inactive') {
            this.blob = new Blob(items, { type: 'audio/mp3' });
            let audioPlayRaise = document.getElementById('time-number');
            let seekbar = <HTMLInputElement>document.getElementById('seekbar');
            let audio_play = document.getElementById('audio-temp');
            if(audio_play != null) {
            audio_play.innerHTML =
              '<source id="source-audio" src="' +
              URL.createObjectURL(this.blob) +
              '" type="audio/mp3"/>';
            let durationAu = audioPlayRaise.dataset.time;
            seekbar.max = durationAu;
            seekbar.step = 0.00000000000000001 + '';
            }
          }
        };
        setTimeout(() => {
          if (this.mediaRecorder.state != 'recording')
            this.mediaRecorder.start(100);
        }, 500);
        this.interval = setInterval(this.raiseRecording, 1000);
        this.timeout = setTimeout(() => {
          // nếu đang ghi thì dừng
          if (this.mediaRecorder.state == 'recording') {
            this.trackStream.forEach(element => {
              element.stop();
            });
            this.setStatePause();
            clearInterval(this.interval);
            let content = document
              .getElementById('content')
              .getElementsByTagName('span');
            for (var i = 0; i < content.length; i++)
              content[i].style.display = 'none';
          }
        }, 60000);
      });
  }

  // dừng ghi âm
  stopRecording() {
    // nếu đang ghi thì dừng
    if (this.mediaRecorder.state == 'recording') {
      this.trackStream.forEach(element => {
        element.stop();
      });
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      if (this.isStateListen) {
        clearInterval(this.intervalListen);
        clearTimeout(this.timeoutListen);
      }
    } else {
      clearInterval(this.interval);
      if (this.isStateListen) {
        clearInterval(this.intervalListen);
        clearTimeout(this.timeoutListen);
      }
    }
  }

  // tạm dừng ghi âm
  pauseRecording() {
    // nếu đang ghi thì dừng
    let content = document
      .getElementById('content')
      .getElementsByTagName('span');
    let audioTemp = <HTMLVideoElement>document.getElementById('audio-temp');
    setTimeout(() => {
      //  dừng ghi âm
      if (this.mediaRecorder.state == 'recording') {
        this.trackStream.forEach(element => {
          element.stop();
        });
        this.setStatePause();
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        for (var i = 0; i < content.length; i++)
          content[i].style.display = 'none';
        // nghe lại
      } else if (
        this.mediaRecorder.state != 'recording' &&
        this.isStatePause()
      ) {
        this.setStateListen();
        if (audioTemp != null) {
          for (var i = 0; i < content.length; i++) {
            content[i].style.display = 'block';
            content[i].style.animationPlayState = 'running';
          }
          audioTemp.play();
        }
        // dừng nghe lại
      } else {
        this.setStatePause();
        for (var i = 0; i < content.length; i++)
          content[i].style.animationPlayState = 'paused';
        clearInterval(this.intervalListen);
        clearTimeout(this.timeoutListen);
        if (audioTemp != null) audioTemp.pause();
      }
    }, 100);
  }

  // tăng dần thời gian
  raiseRecording() {
    const audioPlayRaise = document.getElementById('time-number');
    let time = audioPlayRaise.dataset.time;
    this.timeNext = Number.parseInt(time) + 1;
    if (this.timeNext < 10) {
      audioPlayRaise.innerHTML = '0:0' + this.timeNext;
    } else if (this.timeNext >= 60) {
      audioPlayRaise.innerHTML = '1:00';
    } else {
      audioPlayRaise.innerHTML = '0:' + this.timeNext;
    }
    audioPlayRaise.dataset.time = this.timeNext + '';
    audioPlayRaise.dataset.timehold = this.timeNext + '';
  }

  // thêm file ghi âm
  accessRecordingStorage(file) {
    let newKey =
      JSON.parse(localStorage.getItem('ma_tai_khoan_dn')) + Number(new Date());
    let filePath: string = '/ghi_am/' + newKey + '.mp3';
    let metadata = { contentType: 'audio/mpeg' };
    let ref = this.storage.ref(filePath).put(file, metadata);
    this.storageRef = this.storage.ref(filePath);
    return ref;
  }
  resetRecording() {
    this.isShowRecording = false;
    this.trackStream.forEach(element => {
      element.stop();
    });
  }
}

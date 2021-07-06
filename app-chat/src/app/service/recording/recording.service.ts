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
  constructor(
    private db: AngularFireDatabase,
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
        let items = [];
        this.mediaRecorder.ondataavailable = (e) => {
          items.push(e.data);
          if (this.mediaRecorder.state == 'inactive') {
            this.blob = new Blob(items, { type: 'audio/mp3' });
            let audio = document.getElementById('content');
            let audio_play = document.createElement('audio');
            audio_play?.setAttribute('id', 'audio-temp');
            audio_play.style.visibility = 'hidden';
            audio_play.style.position = 'absolute';
            audio_play?.setAttribute('controls', 'controls');
            audio?.appendChild(audio_play);
            audio_play.innerHTML =
              '<source id="source-audio" src="' +
              URL.createObjectURL(this.blob) +
              '" type="audio/mp3"/>';
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
            this.mediaRecorder.stop();
            this.setStatePause();
            clearInterval(this.interval);
          }
        }, 60000);
      });
  }

  // dừng ghi âm
  stopRecording() {
    // nếu đang ghi thì dừng
    if (this.mediaRecorder.state == 'recording') {
      this.mediaRecorder.stop();
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
    let audioPlayRaise = document.getElementById('time-number');
    let time = Number.parseInt(audioPlayRaise.dataset.timehold);
    setTimeout(() => {
      //  dừng ghi âm
      if (this.mediaRecorder.state == 'recording') {
        this.mediaRecorder.stop();
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
          for (var i = 0; i < content.length; i++)
            content[i].style.display = 'block';
          audioTemp.play();
          this.intervalListen = setInterval(this.raiseListen, 1000);
          this.timeoutListen = setTimeout(() => {
            audioTemp.pause();
            audioTemp.currentTime = 0;
            this.setStatePause();
            for (var i = 0; i < content.length; i++)
              content[i].style.display = 'none';
            if (time < 10) {
              audioPlayRaise.innerHTML = '0:0' + time;
            } else if (this.timeNext == 60) {
              audioPlayRaise.innerHTML = '1:00';
            } else {
              audioPlayRaise.innerHTML = '0:' + time;
            }
            audioPlayRaise.dataset.time = time + '';
            clearInterval(this.intervalListen);
          }, Number.parseInt(audioPlayRaise.dataset.time) * 1000);
        }
        // dừng nghe lại
      } else {
        this.setStatePause();
        for (var i = 0; i < content.length; i++)
          content[i].style.display = 'none';
        clearInterval(this.intervalListen);
        clearTimeout(this.timeoutListen);
        if (audioTemp != null) audioTemp.pause();
      }
    }, 100);
  }
  // thời gian khi nghe lại
  raiseListen() {
    let audioPlayRaise = document.getElementById('time-number');

    let time = audioPlayRaise.dataset.time;
    this.timeNext = Number.parseInt(time) - 1;
    if (this.timeNext < 10) {
      audioPlayRaise.innerHTML = '0:0' + this.timeNext;
    } else if (this.timeNext == 60) {
      audioPlayRaise.innerHTML = '1:00';
    } else {
      audioPlayRaise.innerHTML = '0:' + this.timeNext;
    }
    audioPlayRaise.dataset.time = this.timeNext + '';
  }

  // tăng dần thời gian
  raiseRecording() {
    const audioPlayRaise = document.getElementById('time-number');
    let time = audioPlayRaise.dataset.time;
    this.timeNext = Number.parseInt(time) + 1;
    if (this.timeNext < 10) {
      audioPlayRaise.innerHTML = '0:0' + this.timeNext;
    } else if (this.timeNext == 60) {
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
    this.mediaRecorder.stop();
  }
}

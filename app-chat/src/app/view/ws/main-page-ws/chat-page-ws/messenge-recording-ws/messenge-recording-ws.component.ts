import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenge-recording-ws',
  templateUrl: './messenge-recording-ws.component.html',
  styleUrls: ['./messenge-recording-ws.component.scss']
})
export class MessengeRecordingWsComponent implements OnInit {
  state:string = 'pause';
  intervalPlay: any;
  timeOutPlay: any;
  numberSoundList: number[]
  constructor() { }
  @Input() inputRecording: string;
  @Input() idRecording: string;
  @Input() colorBackground:string;
  ngOnInit(): void {
    // set thời gian của từng audio
    this.numberSoundList = Array(31).fill(1);
    this.setDurationAudio(this.idRecording)
  }
 
  changeState() {
    const audio = <HTMLAudioElement>document.getElementById(this.idRecording);
    const stroke =document.getElementById('stroke-' + this.idRecording);
    const strokeAnimation = stroke.getElementsByTagName('span');
    if(this.state == 'pause') {
      this.state = 'play'
      audio.play()
      stroke.style.display = 'flex'
      for (let index = 0; index < strokeAnimation.length; index++) 
        strokeAnimation[index].style.animationPlayState = 'running'
    } else {
      audio.pause()
      this.state = 'pause'
      for (let index = 0; index < strokeAnimation.length; index++) {
        strokeAnimation[index].style.animationPlayState = 'paused'
    }
    }
   
  }
 
  // thay đổi thời gian realtime khi record chạy
  changeTime() {
    const audio = <HTMLAudioElement>document.getElementById(this.idRecording);
    const stroke =document.getElementById('stroke-' + this.idRecording);
    let seekbar = <HTMLInputElement>document.getElementById('seekbar-'+this.idRecording);
    let content = document.getElementById('content-'+this.idRecording);
    let time = document.getElementById('time-'+this.idRecording);
    seekbar.value = Number(audio.currentTime)+'';
    let width = audio.currentTime/Number(seekbar.max)*265
    content.style.width = width + 'px';
    let timeCurrent = Number(Number(seekbar.max) - audio.currentTime);
    if(timeCurrent > 0.5) {
      if(timeCurrent < 10) {
        time.innerHTML = '0:0' + timeCurrent.toFixed(0);
      } else if(timeCurrent > 59 ) {
        time.innerHTML = '1:00';
      } else {
        time.innerHTML = '0:' + timeCurrent.toFixed(0);
      }
    } else {
      let timeEnd = Number(seekbar.max);
      if(timeEnd < 10) {
        time.innerHTML = '0:0' + timeEnd;
      } else if(timeEnd>= 60) {
        time.innerHTML = '1:00';
      } else {
        time.innerHTML = '0:' + timeEnd;
      }
      this.state = 'pause'
      stroke.style.display = 'none';
      content.style.width = 0 + 'px';
    }
   
  }

  // thay đổi khi click xả
  changeSeekbar() {
    const audio = <HTMLAudioElement>document.getElementById(this.idRecording);
    let seekbar = <HTMLInputElement>document.getElementById('seekbar-'+this.idRecording);
    audio.currentTime = Number(seekbar.value);
    

  }
  
  // lấy ra duration audio
  setDurationAudio(id) {
    var _player = new Audio(this.inputRecording);
    _player.addEventListener("durationchange", function (e) {
        if (this.duration!=Infinity) {
            let time = document.getElementById('time-'+id);
            let seekbar = <HTMLInputElement>document.getElementById('seekbar-'+id);
            let durationAu = this.duration;
            if(seekbar != null) {
              time.dataset.time = durationAu.toFixed(2);
              seekbar.max = durationAu.toFixed(0);
              seekbar.step = 0.00000000000000001 + ''
            }
            if(time != null) {
              if(durationAu < 10) {
                time.innerHTML = '0:0' + durationAu.toFixed(0);
              } else if(durationAu > 59) {
                time.innerHTML = '1:00';
              } else {
                time.innerHTML = '0:' + durationAu.toFixed(0);
              }
            }
           _player.remove();
        };
    }, false);  
    _player.load();
    _player.currentTime = 24*60*60; //fake big time
    _player.volume = 0;
    try {
      _player.play();
    } catch (error) {
    }
    }

}

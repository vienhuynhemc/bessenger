import { Component, Input, OnInit } from '@angular/core';
import { RecordingWsService } from 'src/app/service/ws/recording/recording-ws.service';

@Component({
  selector: 'app-recording-ws',
  templateUrl: './recording-ws.component.html',
  styleUrls: ['./recording-ws.component.scss']
})
export class RecordingWsComponent implements OnInit {

  numberSoundList: number[]
  @Input() colorBackground: string;
  constructor(public recordingService: RecordingWsService) { }

  ngOnInit(): void {
    this.recordingService.playRecording();
    this.recordingService.setStateRecording();
    this.numberSoundList = Array(31).fill(1);
    
  }
  // thoát ghi âm
  public hideRecording() {
    this.recordingService.showRecording();
    this.recordingService.stopRecording();
  }
 
  changeSeekbar() {
    const audio = <HTMLAudioElement>document.getElementById('audio-temp');
    let seekbar = <HTMLInputElement>document.getElementById('seekbar');
    audio.currentTime = Number(seekbar.value);
  }
  changeTime() {
    const audio = <HTMLAudioElement>document.getElementById('audio-temp');
    let seekbar = <HTMLInputElement>document.getElementById('seekbar');
    let contentRaise = document.getElementById('content-raise');
    let content = document.getElementById('content').getElementsByTagName('span');
           
    let time = document.getElementById('time-number');
    seekbar.value = Number(audio.currentTime)+'';
    let width = audio.currentTime/Number(seekbar.max)*238
    contentRaise.style.width = width + 'px';
    let timeCurrent = Number(Number(seekbar.max) - audio.currentTime);
    if(timeCurrent > 0.5) {
      if(timeCurrent < 10) {
        time.innerHTML = '0:0' + timeCurrent.toFixed(0);
      } else if(timeCurrent>= 60) {
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
      this.recordingService.setStatePause();
      for (var i = 0; i < content.length; i++)
        content[i].style.display = 'none';
      contentRaise.style.width = 0 + 'px';
    }
  }

}

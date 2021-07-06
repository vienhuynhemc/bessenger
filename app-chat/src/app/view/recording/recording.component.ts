import { Component, OnInit } from '@angular/core';
import { RecordingService } from 'src/app/service/recording/recording.service';
@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent implements OnInit {
  numberSoundList: number[]
  constructor(public recordingService: RecordingService) { }

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

 
}

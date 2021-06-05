import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  // id box chat lấy từ friends-list, khi click box-chat bất kì data được truyền từ friends-list => messenger
  @Input() idGroupInp!: number;
  constructor() { }

  ngOnInit(): void {
  }

}

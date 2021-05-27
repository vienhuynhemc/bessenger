import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChat } from 'src/models/user_chat';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {
  change_slide: number = 0;
  prev: number = -1;
  next: number = 1;
  // truyền vào list friends chat gần đây bản DB
  @Input() friends_list_main : any;
  @Input() online_list_1 : any;
  @Input() online_list_2 : any;
  // bản mẫu demo code cứng
  @Input() online_list!: any[];

  @Input() friends_list!: any[];

  @Input() selectedUser!: number;

  @Output() outToParentSelectedUser = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    
  }
  // tạo chuyển động slide danh sách bạn đang onl
  changeSlide(change: number): void {
    this.change_slide = change;
 
  }
  // chọn vào bạn bè thì tô màu background
  onSelected(index: number): void {
    if (index != this.selectedUser) {
      if ((index - 1) >= 0 && (index + 1) < this.friends_list.length) {
        this.prev = index - 1;
        this.next = index + 1;
      } else if ((index - 1) >= 0) {
        this.prev = index - 1;
        this.next = -1;
      } else if ((index + 1) < this.friends_list.length) {
        this.prev = -1;
        this.next = index + 1;
      }
      // Cập nhập dữ liêu tại cha
      this.setSelectedUser(index);
    }
  }

  // Set index selected user
  setSelectedUser(index: any) {
    this.outToParentSelectedUser.emit(index);
  }

  //  Shadow top
  getStyleShadowTop(): any {
    return {
      'height': this.selectedUser * 76 + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': '0px',
      'left': '0px',
      'border-bottom-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }

  //  Shadow bottom
  getStyleShadowBottom(): any {
    return {
      'height': (this.friends_list.length - this.selectedUser - 1) * 76 + 'px',
      'position': 'absolute',
      'width': '281px',
      'top': (this.selectedUser + 1) * 76 + 'px',
      'left': '0px',
      'border-top-right-radius': '27px',
      'box-shadow': '4px 8px 28px 0px #d3dceb'
    };
  }
}

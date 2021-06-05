import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})

export class FriendsListComponent implements OnInit {
  change_slide: number = 0;
  prev: number = -1;
  next: number = -1;
  countPrev:number = 0;
  countNext:number = 0;
  slideStep = 4;
  // truyền vào list friends chat gần đây bản DB
  @Input() friends_list_main : any;
  @Input() online_list_1 : any;
  @Input() online_list_2 : any;
  // @input idUser sau này truyền từ component vào để xử lý
  idUser : number;
  // bản mẫu demo code cứng
  @Input() online_list!: any[];

  @Input() friends_list!: any[];

  @Input() selectedUser!: number;

  @Output() outToParentSelectedUser = new EventEmitter<number>();
  @Output() outToParentChangeSlide = new EventEmitter<number>();
  @Output() outToParentSendIdGroup = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
        // selected khi load lần đầu
        this.onSelectedFilter(this.selectedUser, false, 0)
  }
  

  // tạo chuyển động slide danh sách bạn đang onl
  changeSlide(change: number): void {
    this.change_slide = change;

  }
  // bảng lấy dữ liệu từ DB có DB xóa bảng phía trên, 0 = prev | 1 = next
  changeSlide1(direction: number) {
    if (direction == 0) {
        this.countPrev++;
        this.outToParentChangeSlide.emit(-this.slideStep)
    } else {
        this.countPrev--;
        this.countNext++;
        this.outToParentChangeSlide.emit(this.slideStep)
      }
  }
  // set trường hợp load lần đầu 
  onSelectedFilter(index:number, check:boolean, idGorup: number) {
    // check == false là xử lý load lần đầu, check == true kiểm tra click
    if (check) {
      if (index != this.selectedUser) {
        this.onSelected(index); 
        this.sendIdGroundToMessage(idGorup);
      }
    } else {
      this.onSelected(index)
      this.sendIdGroundToMessage(idGorup);
    }
  }
  // truyền idGroup qua message
    sendIdGroundToMessage(idGroup: number) {
    this.outToParentSendIdGroup.emit(idGroup);
  }

 // chọn vào bạn bè thì tô màu background
 onSelected(index: number): void {
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

   // kiểm tra đã đọc tin nhắn hay chưa, true = chưa đọc | false = đã đọc
   checkReaded(listIDReaded : []) {
    for (let index = 0; index < listIDReaded.length; index++) 
      if (listIDReaded[index] === this.idUser) 
        return false;
    return true;
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
   // set style tên cho tin nhắn chưa đọc
   getStyleNameReadMessage() {
    return {
      'font-weight': 'bold',
      'color': 'black',
      'font-size': '15px'
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStyleMessageReadMessage() {
    return {
      'font-weight': 'bold',
      'color': '#3275f7',
    };
  }
  // set style tin nhắn tóm tắt chưa đọc
  getStylePointReadMessage() {
    return {
      'position': 'absolute',
      'width': '10px',
      'height': '10px',
      'border-radius': '50%',
      'background-color': '#3275f7',
      'right': '9px',
      'top': '46.5px',
    }
  }
}

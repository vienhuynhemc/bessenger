import { EmojiObject } from './../../../../../models/emoji/emoji_object';
import { ActivatedRoute } from '@angular/router';
import { MessengerFooterService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';
import { Component, OnInit } from '@angular/core';
import { MessengerMainService } from 'src/app/service/chat-page/chat-page-chat-page/messenger-main.service';

@Component({
  selector: 'app-messenger-footer',
  templateUrl: './messenger-footer.component.html',
  styleUrls: ['./messenger-footer.component.scss']
})
export class MessengerFooterComponent implements OnInit {

  // Nội dung tin nhắn
  public tin_nhan: string;
  // Kích thước trc thay đổi
  public last_height: number;
  // Có hiện hộp btcx
  public isShowBtcxBox: boolean;

  constructor(
    public messenger_footer_service: MessengerFooterService,
    public messenger_main_service: MessengerMainService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      // Lấy thông tin cơ bản
      this.messenger_footer_service.getThongTinCoBan(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
        this.messenger_footer_service.dienThongTinCoBan(data.payload.toJSON());
      })
    });
  }

  public reset(): void {
    this.last_height = 22;
    document.getElementById("input").innerHTML = '';
    this.messenger_footer_service.chenh_lech_height = 0;
    document.getElementById("parent_input").style.marginBottom = "5px";
    this.tin_nhan = "";
  }

  public getIcon(item: EmojiObject) {
    let span = document.createElement("span");
    span.classList.add("span-image-box-chat");
    span.style.backgroundImage = `url("${item.src}")`;
    let spanContent = document.createElement("span");
    spanContent.innerText = "😄";
    span.appendChild(spanContent);
    span.setAttribute("contenteditable", "false");
    let input = document.getElementById("input");
    // xóa br nếu trc nó là br
    let beforeElement = null;
    let posNow = null;
    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.rangeCount) {
        let range = sel.getRangeAt(0);
        let pos = range.endOffset;
        posNow = pos;
        let nodes = input.childNodes;
        beforeElement = nodes[pos];
        if (nodes.length > 0) {
          // Lúc bắt đầu
          if (pos == 0) {
            if (nodes[0].isEqualNode(document.createElement("br"))) {
              input.removeChild(nodes[0]);
              posNow = 0;
              beforeElement = null;
            }
          } else {
            if (nodes[pos - 1].isEqualNode(document.createElement("br"))) {
              input.removeChild(nodes[pos - 1]);
              posNow--;
              beforeElement = input.childNodes[posNow];
            }
          }
        }
      }
    }
    // add icon
    if (beforeElement != null) {
      input.insertBefore(span, beforeElement);
    } else {
      input.appendChild(span);
    }
    // add xong icon move qua ben phai cua no
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(input, posNow + 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    // Cập nhật dữ liệu tin nhắn
    this.tin_nhan = input.innerHTML.trim();
    this.xuLyCss();
  }

  public inputMessenger(value: string) {
    this.tin_nhan = value.trim();
    // Xử lý css và scroll
    this.xuLyCss();
  }

  public xuLyCss() {
    let parent_input = document.getElementById("parent_input");
    if (parent_input.offsetHeight) {
      if (parent_input.offsetHeight > 22) {
        if (parent_input.offsetHeight != this.last_height) {
          parent_input.style.marginBottom = "10px";
          this.messenger_footer_service.chenh_lech_height = parent_input.offsetHeight - 17;
          if (this.last_height == 22) {
            window.scrollTo(0, window.pageYOffset + (parent_input.offsetHeight - this.last_height) + 5);
          } else {
            window.scrollTo(0, window.pageYOffset + (parent_input.offsetHeight - this.last_height));
          }
          this.last_height = parent_input.offsetHeight
        }
      } else {
        if (this.last_height != 22) {
          this.last_height = 22;
          parent_input.style.marginBottom = "5px";
          this.messenger_footer_service.chenh_lech_height = 0;
        }
      }
    }
  }

  public onKeyInput(event) {
    let input = document.getElementById("input");
    // Nút enter
    if (event.keyCode == 13) {
      if (event.shiftKey) {
        // Ko tự động xuống dòng
        event.preventDefault();
        // Thêm dòng mới bỏ qua div
        document.execCommand('insertHTML', false, '<br><br>');
      } else {
        // Ko tự động xuống dòng
        event.preventDefault();
        // submit
        // to do submit
        // làm rỗng ô nhập
        input.innerHTML = '';
      }
    }
  }

  public openBoxBtcx() {
    this.isShowBtcxBox = !this.isShowBtcxBox;
  }

  public getTopBoxBTCX() {
    let parent_input = document.getElementById("parent_input");
    if (parent_input.offsetHeight == 32) {
      return "-301px";
    } else if (parent_input.offsetHeight == 48) {
      return "-293px";
    }
    else if (parent_input.offsetHeight == 64) {
      return "-285px";
    }
    else if (parent_input.offsetHeight == 80) {
      return "-277px";
    }
    else if (parent_input.offsetHeight == 83) {
      return "-276px";
    } else {
      return "-309px";
    }
  }

  public getLeftBoxBTCX() {
    if (this.messenger_footer_service.object_chat_footer != null) {
      if (this.messenger_footer_service.object_chat_footer.loai == 'nhom') {
        return "141px";
      } else if (this.messenger_footer_service.object_chat_footer.loai == "don") {
        return "129px";
      }
    }
    return "141px";
  }
}

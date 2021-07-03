import { EmojiObject } from './../../../../../models/emoji/emoji_object';
import { ActivatedRoute } from '@angular/router';
import { MessengerFooterService } from './../../../../../service/chat-page/chat-page-chat-page/chat-page-chat-page-footer/messenger-footer.service';
import { Component, OnInit } from '@angular/core';
import { MessengerMainService } from 'src/app/service/chat-page/chat-page-chat-page/messenger-main.service';
import { ChatPageChatPageContentService } from 'src/app/service/chat-page/chat-page-chat-page/chat-page-chat-page-content/chat-page-chat-page-content.service';
import { StickersService } from 'src/app/service/stickers/stickers.service';

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

  // hiện giphy
  public isShowBoxGiphy: boolean;

  // hiện sticker
  public isShowBoxStickers: boolean;
  constructor(
    public messenger_footer_service: MessengerFooterService,
    public messenger_main_service: MessengerMainService,
    public content_service: ChatPageChatPageContentService,
    private route: ActivatedRoute,
<<<<<<< HEAD
    public stickersService: StickersService
=======
>>>>>>> master
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      // Lấy thông tin cơ bản
      if (this.messenger_footer_service.layData == null) {
        this.getData();
      } else {
        this.messenger_footer_service.layData.unsubscribe();
        this.getData();
      }
    });
  }

  public getData() {
    this.messenger_footer_service.layData = this.messenger_footer_service.getThongTinCoBan(this.messenger_main_service.ma_cuoc_tro_chuyen).subscribe(data => {
      this.messenger_footer_service.dienThongTinCoBan(data.payload.toJSON());
    })
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
    spanContent.innerText = item.alt;
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
        var container = range.commonAncestorContainer;
        var nodeParent = container.parentNode;
        let pos = range.endOffset;
        posNow = pos;
        let nodes = input.childNodes;
        beforeElement = nodes[pos];
        if (container.nodeType == Node.TEXT_NODE) {
          // lấy vị trí ông text đang caret
          let index = 0;
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] == container) {
              index = i;
              break;
            }
          }
          //  Tách
          let text1 = nodes[index].textContent.substring(0, pos);
          let text2 = nodes[index].textContent.substring(pos, nodes[index].textContent.length);
          let node1 = document.createTextNode(text1);
          let node2 = document.createTextNode(text2);
          input.removeChild(nodes[index]);
          let newpos = index;
          let nodeAfter = nodes[index];
          if (text1.length == 0) {
            if (nodeAfter == null) {
              input.appendChild(span);
              input.appendChild(node2);
            } else {
              input.insertBefore(node2, nodeAfter);
              input.insertBefore(span, node2);
            }
            newpos += 1;
          } else if (text2.length == 0) {
            if (nodeAfter == null) {
              input.appendChild(node1);
              input.appendChild(span);
            } else {
              input.insertBefore(span, nodeAfter);
              input.insertBefore(node1, span);
            }
            newpos += 2;
          } else {
            if (nodeAfter == null) {
              input.appendChild(node1);
              input.appendChild(span);
              input.appendChild(node2);
            } else {
              input.insertBefore(node2, nodeAfter);
              input.insertBefore(span, node2);
              input.insertBefore(node1, span);
            }
            newpos += 2;
          }
          let range = document.createRange();
          let sel = window.getSelection();
          range.setStart(input, newpos);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          // Cập nhật dữ liệu tin nhắn
          this.tin_nhan = input.innerHTML.trim();
          this.xuLyCss();
        } else {
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
                beforeElement = input.childNodes[posNow];
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
      }
    }
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
        if (this.tin_nhan.trim().length != 0) {
          let count = 0;
          for (let i = 0; i < input.childNodes.length; i++) {
            if (input.childNodes[i].isEqualNode(document.createElement("br"))) {
              count++;
            }
          }
          if (count != input.childNodes.length) {
            let type = input.children.length == input.childNodes.length ? "gui_text_icon" : "gui_text";
            this.content_service.sumitTinNhan(this.messenger_main_service.ma_cuoc_tro_chuyen, this.tin_nhan, type);
          }
        }
        // to do submit
        // làm rỗng ô nhập
        input.innerHTML = "";
        this.tin_nhan = "";
        this.xuLyCss();
      }
    }
  }

  public openBoxBtcx() {
    this.isShowBtcxBox = !this.isShowBtcxBox;
    // mở box này thì đóng các box còn lại
    if(this.isShowBtcxBox) {
      this.isShowBoxGiphy = false;
      this.isShowBoxStickers = false;
    }
  }

  // hiển thị box giphy
  public openBoxGiphy() {
    this.isShowBoxGiphy = !this.isShowBoxGiphy;
    // mở box này thì đóng các box còn lại
    if(this.isShowBoxGiphy) {
      this.isShowBtcxBox = false;
      this.isShowBoxStickers = false;
    }
  }

  // hiển thị box sticker
  public openBoxStickers() {
    this.isShowBoxStickers = !this.isShowBoxStickers;
    if(this.isShowBoxStickers) {
      this.isShowBtcxBox = false;
      this.isShowBoxGiphy = false;
    }
  }
  public getTopBoxBTCX() {
    let parent_input = document.getElementById("parent_input");
    if (parent_input.offsetHeight == 32) {
      return "-315px";
    } else if (parent_input.offsetHeight == 48) {
      return "-307px";
    }
    else if (parent_input.offsetHeight == 64) {
      return "-299px";
    }
    else if (parent_input.offsetHeight == 80) {
      return "-291px";
    }
    else if (parent_input.offsetHeight == 83) {
      return "-290px";
    } else {
      return "-323px";
    }
  }

  public getTopGiphy() {
    let parent_input = document.getElementById("parent_input");
    if (parent_input.offsetHeight == 32) {
      return "-306px";
    } else if (parent_input.offsetHeight == 48) {
      return "-296px";
    }
    else if (parent_input.offsetHeight == 64) {
      return "-286px";
    }
    else if (parent_input.offsetHeight == 80) {
      return "-276px";
    }
    else if (parent_input.offsetHeight == 83) {
      return "-276px";
    } else {
      return "-311px";
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

  public khongNhapNua(event) {
    setTimeout(() => { this.content_service.onInput = false }, 0);
  }

  public dangNhap(event) {
    setTimeout(() => {
      this.content_service.onInput = true;
      this.content_service.updateOnInput(this.messenger_main_service.ma_cuoc_tro_chuyen);
    }, 0);
  }
}

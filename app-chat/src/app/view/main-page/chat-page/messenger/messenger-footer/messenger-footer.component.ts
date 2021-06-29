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
    document.getElementById("input").innerHTML = '<div class="data-block-messenger"></div>';
    this.messenger_footer_service.chenh_lech_height = 0;
    document.getElementById("parent_input").style.marginBottom = "5px";
    this.tin_nhan = "";
  }

  public getIcon(item: EmojiObject) {
    let span = document.createElement("span");
    span.style.backgroundImage = `url("${item.src}")`;
    span.style.backgroundSize = "16px 16px";
    span.style.imageRendering = "-webkit-optimize-contrast";
    let spanContent = document.createElement("span");
    spanContent.innerText = "😄";
    spanContent.style.display = "inline-block";
    spanContent.style.width = "16px";
    spanContent.style.height = "16px";
    spanContent.style.color = "transparent";
    spanContent.style.caretColor = "#050505";
    span.appendChild(spanContent);
    let input = document.getElementById("input");
    input.appendChild(span);
  }

  public inputMessenger(value: string) {
    this.tin_nhan = value.trim();
    // Xử lý css và scroll
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
        // Thêm dòng mới
        let div = document.createElement("div");
        div.classList.add("data-block-messenger");
        input.appendChild(div);
      } else {
        // Ko tự động xuống dòng
        event.preventDefault();
        // submit
        // to do submit
        // làm rỗng ô nhập
        document.getElementById("input").innerHTML = '<div class="data-block-messenger"></div>';
      }
    }
    // Backspace + delete
    else if (event.keyCode == 8 || event.keyCode == 46) {
      let childrens = input.children;
      // Xạch bách thì ko làm gì nữa

      // Lấy vị trí carot hiện tại
      if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.rangeCount) {
          let range = sel.getRangeAt(0);
          for (let i = 0; i < childrens.length; i++) {
            if (range.commonAncestorContainer.parentNode == childrens[i]) {
              let caretPos = range.endOffset;
              // Biết được thằng thằng nào đang làm nè
              // Nếu ở ngày vị trí đầu đoạn chat thì ko làm gì cả
              if (caretPos == 0 && i == 0) {
                event.preventDefault();
              } else {
                let con_cua_phan_tu = childrens[i].children;
                // Nếu ở vị trí đầu của phần tử đang chọn và còn con của nó
                // Ta di chuyển con của đó dắp vào đuôi thằng trước xong xóa nó
                if (caretPos == 0) {
                  if (con_cua_phan_tu.length != 0) {

                  }
                  // Ko còn con thì xóa nó thôi
                  else if (con_cua_phan_tu.length == 0) {
                    input.removeChild(childrens[i]);
                  }
                  // di chuyển chuột lên thằng trước nó
                  let before = childrens[i - 1];
                  let childrenBefore = before.children;
                  // Nếu thằng trc nó có con thì di chuyển tới vị cuối của con nó
                  if (childrenBefore.length > 0) {
                    range.setStart(childrenBefore[childrenBefore.length - 1],
                      childrenBefore[childrenBefore.length - 1].childNodes.length)
                  } else {
                    range.setStart(before, 0);
                  }
                  range.collapse(true)
                  sel.removeAllRanges()
                  sel.addRange(range);
                  event.preventDefault();
                }
              }
              break;
            }
          }
        }
      }

      // Di chuyển tới vị trí mong muốn
      // let range = document.createRange();
      // let sel = window.getSelection();
      // range.setStart(input.children[0], 0);
      // range.collapse(true)
      // sel.removeAllRanges()
      // sel.addRange(range)
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

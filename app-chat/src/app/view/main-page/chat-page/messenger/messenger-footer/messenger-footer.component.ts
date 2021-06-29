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
    document.getElementById("input").innerHTML = "";
    this.messenger_footer_service.chenh_lech_height = 0;
    document.getElementById("parent_input").style.marginBottom = "5px";
    this.tin_nhan = "";
  }

  public getIcon(item: EmojiObject) {
  }

  public inputMessenger(value: string) {
    this.tin_nhan = value.trim();
    console.log(this.tin_nhan);
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
}

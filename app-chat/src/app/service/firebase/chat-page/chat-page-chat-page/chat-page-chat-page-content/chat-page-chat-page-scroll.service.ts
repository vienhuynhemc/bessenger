import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatPageChatPageScrollService {

  // Scroll height
  public scrollHeight: number;
  public clientHeight: number;
  public scrollTop: number;

  constructor() { }

  public register(element) {
    if (element != null) {
      this.resizeObserver.unobserve(element);
      this.resizeObserver.observe(element);
    }
  }

  public resizeObserver = new ResizeObserver(entries => {
    // Xử lý nền
    let heightChild = entries[0].contentRect.height;
    let nen = document.getElementById("nen");
    if (heightChild < 612) {
      if (nen != null) {
        nen.style.height = (heightChild - 10) + "px";
      }
    } else if (nen.style.height != '602px') {
      if (nen != null) {
        nen.style.height = '602px'
      }
    }
    // Xử lý scroll nội dung
    let div = document.getElementById("tin-nhan-div");
    if (div != null) {
      // Nó đang  ở bottom mới dịch chuyển
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
      // cập nhât
      this.clientHeight = div.clientHeight;
      this.scrollHeight = div.scrollHeight;
      this.scrollTop = div.scrollTop;
    }
  });
}

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
    let div = document.getElementById("tin-nhan-div");
    if (div != null) {
      // Nó đang  ở bottom mới dịch chuyển
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
      // cập nhâtk
      this.clientHeight = div.clientHeight;
      this.scrollHeight = div.scrollHeight;
      this.scrollTop = div.scrollTop;
    }
  });
}

import { Injectable } from '@angular/core';
import { ChatPageFriendsLeftServiceService } from './chat-page-friends-left-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeftScrollService {

  // Scroll height
  public indexNotSearch: number;

  constructor(
  ) { }

  public register(element) {
    if (element != null) {
      this.resizeObserver.unobserve(element);
      this.resizeObserver.observe(element);
    }
  }

  public resizeObserver = new ResizeObserver(entries => {
    let div = document.getElementById("danh_sach_ban_be_ben_duoi");
    if (div != null) {
      if (this.indexNotSearch != -1) {
        if (this.indexNotSearch < 3) {
          div.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          div.scrollTo({ top: (this.indexNotSearch - 2) * 76, behavior: "smooth" });
        }
      }
    }
  });
}

import { MessengerFooterService } from './messenger-footer.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterScrollService {

  public chenh_lech_lan_trc: number;

  constructor(
    private fs: MessengerFooterService
  ) { }
  public register(element) {
    if (element != null) {
      this.resizeObserver.unobserve(element);
      this.resizeObserver.observe(element);
    }
  }

  public resizeObserver = new ResizeObserver(entries => {
    let checnhLech = this.chenh_lech_lan_trc == null ? this.fs.chenh_lech_height : this.fs.chenh_lech_height - this.chenh_lech_lan_trc;
    if (checnhLech != 0) {
      let nen = document.getElementById("nen");
      let tin_nhan_div = document.getElementById("tin-nhan-div");
      if (nen != null && tin_nhan_div != null) {
          nen.style.height = (nen.offsetHeight - checnhLech) + "px";
          tin_nhan_div.style.height = (tin_nhan_div.offsetHeight - checnhLech) + "px";
          if(checnhLech>0){
            tin_nhan_div.scrollTop = tin_nhan_div.scrollTop + checnhLech;
          }else{
            tin_nhan_div.scrollTop = tin_nhan_div.scrollTop - checnhLech;
          }
      }
    }
    this.chenh_lech_lan_trc = this.fs.chenh_lech_height;
  });
}

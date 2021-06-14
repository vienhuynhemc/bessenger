import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainPageService } from './../../../service/main-page/main-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private main_page_service: MainPageService,
    private change_detector_ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectTrangChu();
    }, 0);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageWsService } from 'src/app/service/ws/main-page/main-page-ws.service';

@Component({
  selector: 'app-home-page-ws',
  templateUrl: './home-page-ws.component.html',
  styleUrls: ['./home-page-ws.component.scss']
})
export class HomePageWsComponent implements OnInit {

  constructor(
    private main_page_service_ws: MainPageWsService,
    private router: Router
  ) { }

  selectedSlide: number = 1;
  timeOut: any = 0;
  first: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service_ws.reset();
      this.main_page_service_ws.selectTrangChu();
    }, 0);
   
    this.reset();
    this.setChangeSlide();
  }
  reset() {
    clearTimeout(this.timeOut);
    this.selectedSlide = 1;
    let slide1 = document.getElementById('slide-1');
    let slide2 = document.getElementById('slide-2');
    let slide3 = document.getElementById('slide-3');
    slide3.classList.remove('slide-selected');
    slide2.classList.remove('slide-selected');
    slide1.classList.add('slide-selected');
  }
  setChangeSlide() {
    let slide1 = document.getElementById('slide-1');
    let slide2 = document.getElementById('slide-2');
    let slide3 = document.getElementById('slide-3');

    this.timeOut = setTimeout(() => {
      if(slide1 != null || slide2 != null || slide3 != null) {
      if (this.selectedSlide == 0) {
        slide3.classList.remove('slide-selected');
        slide2.classList.remove('slide-selected');
        slide1.classList.add('slide-selected');
        this.selectedSlide = 1;
      } else if (this.selectedSlide == 1) {
        slide1.classList.remove('slide-selected');
        slide2.classList.add('slide-selected');
        slide3.classList.remove('slide-selected');
        let video = <HTMLVideoElement>document.getElementById('slide-2-video');
        if(video != null)
          video.load();
        this.selectedSlide = 2;
      } else {
        slide1.classList.remove('slide-selected');
        slide2.classList.remove('slide-selected');
        slide3.classList.add('slide-selected');
        this.selectedSlide = 0;
      }
        this.setChangeSlide();
      }
    }, 7000);
    
  }
  slideClick(slide: number) {
      let slide1 = document.getElementById('slide-1');
      let slide2 = document.getElementById('slide-2');
      let slide3 = document.getElementById('slide-3');
      slide3.classList.remove('slide-selected');
      slide2.classList.remove('slide-selected');
      slide1.classList.remove('slide-selected');
      clearTimeout(this.timeOut);
      if (slide == 0) {
        slide3.classList.remove('slide-selected');
        slide2.classList.remove('slide-selected');
        slide1.classList.add('slide-selected');
        this.selectedSlide = 1;
      } else if (slide == 1) {
        slide1.classList.remove('slide-selected');
        slide3.classList.remove('slide-selected');
        slide2.classList.add('slide-selected');
        let video = <HTMLVideoElement>document.getElementById('slide-2-video');
        if(video != null)
          video.load();
        this.selectedSlide = 2;
      } else {
        slide2.classList.remove('slide-selected');
        slide1.classList.remove('slide-selected');
        slide3.classList.add('slide-selected');
        this.selectedSlide = 0;
      }
      this.setChangeSlide();
  }
  moveToMessage() {
    this.router.navigate(['/bessenger-ws/tin-nhan/danh-sach']);
  }

  moveToRecomend() {
    this.router.navigate(['/bessenger-ws/ban-be/de-xuat']);
  }

}

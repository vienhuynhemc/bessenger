import { Injectable } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class NotificationFpPageService {

  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/notification.json',
  };
  // title
  public title: string;
  // child
  public child: string;
  public show: boolean;


  constructor() {
    this.show = false;
    this.title = "Yêu cầu thành công";
    this.child = "Hình ảnh của bạn đã được cập nhật";
  }

  public hidden(): void {
    this.show = false;
  }

  public isShow(): boolean {
    return this.show;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setChild(child: string): void {
    this.child = child;
  }

  public showPop(): void {
    this.show = true;
  }

  public animationCreated(animationItem: AnimationItem): void {
  }


}

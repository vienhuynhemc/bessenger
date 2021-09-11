import { Injectable } from '@angular/core';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class ChatPageProcessServiceService {


  private isLoading: boolean;
  // lottie
  public options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  constructor() { }

  public isLoadingProcess(): boolean {
    return this.isLoading;
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  };

  public animationCreated(animationItem: AnimationItem): void {
  }

}

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendsPageService } from 'src/app/service/friends-page/friends-page.service';

import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit, OnDestroy {
  friendsPageDefautl: number;
  private valueFromChildSubscription: Subscription;
  constructor(
    private main_page_service: MainPageService,
    private route: ActivatedRoute,
    private router: Router,
    public friendsPageService: FriendsPageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectFriendsPage();
      
    }, 0);
  
    this. getSelectedFriendsPage();
  }

  ngAfterViewChecked(){
   this.cdr.detectChanges();
  }

  // get về trạng thái page
  getSelectedFriendsPage() {
    this.valueFromChildSubscription = this.friendsPageService.friendsDefault.subscribe(friendsDefault => 
      {this.friendsPageDefautl = friendsDefault,
      this.onClickMenu(this.friendsPageDefautl);
      });
    
  }
 

  // click menu ban be, loi moi, da gui
  onClickMenu(index: number) {
    const friends = document.getElementById('btn-friends');
    const request = document.getElementById('btn-request');
    const send = document.getElementById('btn-send');
    const iconFriends = document.getElementById('icon_f');
    const iconRequest = document.getElementById('icon_r');
    const iconSend = document.getElementById('icon_s');
    if (index === 0) {
      friends.style.cssText = 'background-color: #3275f7;color: white;';
      iconFriends.style.color = 'white';

      request.style.cssText = 'background-color: white;color: black;';
      iconRequest.style.color = 'rgb(136, 133, 133)';

      send.style.cssText = 'background-color: white;color: black;';
      iconSend.style.color = 'rgb(136, 133, 133)';
    } else if (index === 1) {
      friends.style.cssText = 'background-color: white;color: black;';
      iconFriends.style.color = 'rgb(136, 133, 133)';

      request.style.cssText = 'background-color: #3275f7;color: white;';
      iconRequest.style.color = 'white';

      send.style.cssText = 'background-color: white; color: black;';
      iconSend.style.color = 'rgb(136, 133, 133)';
    } else {
      friends.style.cssText = 'background-color: white; color: black;';
      iconFriends.style.color = 'rgb(136, 133, 133)';

      request.style.cssText = 'background-color: white; color: black;';
      iconRequest.style.color = 'rgb(136, 133, 133)';

      send.style.cssText = 'background-color: #3275f7; color: white;';
      iconSend.style.color = 'white';
    }
  }
// chuyển trang
  moveToFriends(): void {
    this.router.navigate(['lien-lac/0'], { relativeTo: this.route});
    this.friendsPageService.selectedFriendsPageDefaultSerivce();
  }
  moveToRequest(): void {
    this.router.navigate(['loi-moi/0'], { relativeTo: this.route});
    this.friendsPageService.selectedRequestService()
  }
  moveToSend(): void {
    this.router.navigate(['da-gui/0'], { relativeTo: this.route});
    this.friendsPageService.selectedSendService()
  }
}
